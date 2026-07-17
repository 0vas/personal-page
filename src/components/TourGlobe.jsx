import { useEffect, useMemo, useRef, useState } from "react";
import { geoDistance, geoGraticule10, geoOrthographic, geoPath } from "d3-geo";
import WORLD_LAND from "../data/world-land.json";

const CX = 260;
const CY = 260;
const R = 205;
const SPHERE = { type: "Sphere" };

function shortestAngle(from, to) {
  return ((to - from + 540) % 360) - 180;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function venueAt(talks, selected, focusedGeo) {
  return talks[selected]?.geo[focusedGeo] || talks[selected]?.geo[0];
}

export default function TourGlobe({ talks, selected, focusedGeo = 0, activationKey = 0, onSelect, selectLabel, statusLabel, ariaPrefix }) {
  const initial = venueAt(talks, selected, focusedGeo);
  const [view, setView] = useState({ lon: initial.lon, lat: initial.lat });
  const [dragging, setDragging] = useState(false);
  const viewRef = useRef(view);
  const dragRef = useRef(null);

  const commitView = (next) => {
    viewRef.current = next;
    setView(next);
  };

  useEffect(() => { viewRef.current = view; }, [view]);

  useEffect(() => {
    const destination = venueAt(talks, selected, focusedGeo);
    const start = viewRef.current;
    const target = { lon: destination.lon, lat: clamp(destination.lat, -70, 70) };
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      commitView(target);
      return undefined;
    }

    const lonDelta = shortestAngle(start.lon, target.lon);
    const started = performance.now();
    let frame;
    const rotate = (now) => {
      const progress = Math.min((now - started) / 720, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      commitView({
        lon: start.lon + lonDelta * eased,
        lat: start.lat + (target.lat - start.lat) * eased,
      });
      if (progress < 1) frame = requestAnimationFrame(rotate);
    };
    frame = requestAnimationFrame(rotate);
    return () => cancelAnimationFrame(frame);
  }, [focusedGeo, selected, talks]);

  const geometry = useMemo(() => {
    // Natural Earth 1:110m land is bundled locally (public domain). D3 performs
    // the orthographic projection and true horizon clipping on every rotation.
    const projection = geoOrthographic()
      .translate([CX, CY])
      .scale(R)
      .rotate([-view.lon, -view.lat, 0])
      .clipAngle(90)
      .precision(0.45);
    const path = geoPath(projection);
    const locationMap = new Map();

    talks.forEach((talk, talkIndex) => talk.geo.forEach((point, geoIndex) => {
      const key = `${point.lat}:${point.lon}`;
      const location = locationMap.get(key) || { ...point, appearances: [] };
      location.appearances.push({ talkIndex, geoIndex });
      locationMap.set(key, location);
    }));

    const center = [view.lon, view.lat];
    const locations = [...locationMap.values()].flatMap((location) => {
      if (geoDistance(center, [location.lon, location.lat]) >= Math.PI / 2 - 0.008) return [];
      const projected = projection([location.lon, location.lat]);
      if (!projected) return [];
      const active = location.appearances.some(({ talkIndex, geoIndex }) => talkIndex === selected && geoIndex === focusedGeo);
      const related = location.appearances.some(({ talkIndex }) => talkIndex === selected);
      return [{ ...location, x: projected[0], y: projected[1], active, related }];
    }).sort((a, b) => Number(a.active) - Number(b.active));

    return {
      sphere: path(SPHERE),
      graticule: path(geoGraticule10()),
      land: path(WORLD_LAND),
      locations,
    };
  }, [focusedGeo, selected, talks, view]);

  const activeVenue = venueAt(talks, selected, focusedGeo);

  const selectLocation = (location) => {
    const exactIndex = location.appearances.findIndex(({ talkIndex, geoIndex }) => talkIndex === selected && geoIndex === focusedGeo);
    const sameTalk = location.appearances.find(({ talkIndex }) => talkIndex === selected);
    const target = sameTalk && exactIndex < 0
      ? sameTalk
      : exactIndex >= 0 && location.appearances.length > 1
        ? location.appearances[(exactIndex + 1) % location.appearances.length]
        : location.appearances[0];
    onSelect?.(target.talkIndex, target.geoIndex);
  };

  const onPointerDown = (event) => {
    if (event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = { x: event.clientX, y: event.clientY, view: viewRef.current };
    setDragging(true);
  };
  const onPointerMove = (event) => {
    if (!dragRef.current) return;
    const dx = event.clientX - dragRef.current.x;
    const dy = event.clientY - dragRef.current.y;
    commitView({
      lon: dragRef.current.view.lon - dx * 0.34,
      lat: clamp(dragRef.current.view.lat + dy * 0.24, -70, 70),
    });
  };
  const endDrag = (event) => {
    if (dragRef.current && event.currentTarget.hasPointerCapture?.(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    dragRef.current = null;
    setDragging(false);
  };

  return (
    <div className={`tour-globe ${dragging ? "dragging" : ""}`} aria-label={`${ariaPrefix} ${activeVenue.label}`}>
      <svg
        viewBox="0 0 520 520"
        role="img"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <defs>
          <radialGradient id="globe-shell" cx="34%" cy="26%" r="76%">
            <stop offset="0" stopColor="currentColor" stopOpacity=".2" />
            <stop offset=".62" stopColor="currentColor" stopOpacity=".045" />
            <stop offset="1" stopColor="currentColor" stopOpacity=".15" />
          </radialGradient>
          <linearGradient id="globe-land-fill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="currentColor" stopOpacity=".3" />
            <stop offset="1" stopColor="currentColor" stopOpacity=".08" />
          </linearGradient>
          <radialGradient id="active-location-fill">
            <stop offset="0" stopColor="var(--geo-active)" stopOpacity=".46" />
            <stop offset=".48" stopColor="var(--geo-active)" stopOpacity=".18" />
            <stop offset="1" stopColor="var(--geo-active)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="active-label-fill" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="var(--geo-active)" stopOpacity=".22" />
            <stop offset="1" stopColor="var(--panel-solid)" stopOpacity=".92" />
          </linearGradient>
          <clipPath id="globe-clip"><circle cx={CX} cy={CY} r={R} /></clipPath>
        </defs>

        <circle className="globe-halo outer" cx={CX} cy={CY} r={R + 31} />
        <circle className="globe-halo inner" cx={CX} cy={CY} r={R + 18} />
        <path className="globe-shell" d={geometry.sphere} fill="url(#globe-shell)" />
        <g clipPath="url(#globe-clip)">
          <path className="globe-grid" d={geometry.graticule} />
          <path className="globe-land" d={geometry.land} fill="url(#globe-land-fill)" />
          <path className="globe-scan" d={`M${CX - R},${CY} Q${CX},${CY - 42} ${CX + R},${CY}`} />
          <g className="globe-reticle">
            <path d={`M${CX - 22} ${CY}h44M${CX} ${CY - 22}v44`} />
            <circle cx={CX} cy={CY} r="8" />
          </g>
        </g>
        <path className="globe-edge" d={geometry.sphere} />

        {geometry.locations.map((point) => {
          const labelWidth = point.active ? Math.max(96, point.label.length * 6.2 + 16) : Math.max(54, point.label.length * 6.2 + 14);
          const placeLeft = point.x > CX;
          const labelX = placeLeft ? -labelWidth - 12 : 12;
          const labelY = point.active ? -34 : -23;
          const labelHeight = point.active ? 27 : 17;
          return (
            <g
              key={`${point.lat}:${point.lon}`}
              className={`globe-marker ${point.related ? "related" : ""} ${point.active ? "active" : ""}`}
              transform={`translate(${point.x} ${point.y})`}
              role="button"
              tabIndex="0"
              aria-label={`${selectLabel}: ${point.label}`}
              aria-pressed={point.active}
              onPointerDown={(event) => event.stopPropagation()}
              onClick={() => selectLocation(point)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  selectLocation(point);
                }
              }}
            >
              <circle className="marker-hit" r="20" />
              {point.active && (
                <g className="marker-acquisition" key={`acquire-${activationKey}`}>
                  <circle className="acquire-field" r="25" fill="url(#active-location-fill)" />
                  <circle className="acquire-ring" r="14" />
                  <path className="acquire-cross" d="M-22 0h8M14 0h8M0-22v8M0 14v8" />
                </g>
              )}
              <circle className="pulse" r={point.active ? 10 : 7} />
              <circle className="node" r={point.active ? 5.5 : 4} />
              <rect className="marker-label-bg" x={labelX} y={labelY} width={labelWidth} height={labelHeight} />
              <text x={placeLeft ? labelX + labelWidth - 7 : labelX + 7} y={point.active ? -22 : -11} textAnchor={placeLeft ? "end" : "start"}>{point.label}</text>
              {point.active && <text className="marker-status" x={placeLeft ? labelX + labelWidth - 7 : labelX + 7} y="-11" textAnchor={placeLeft ? "end" : "start"}>{statusLabel}</text>}
              {point.appearances.length > 1 && <text className="marker-count" x="9" y="14">×{point.appearances.length}</text>}
            </g>
          );
        })}
      </svg>
      <div className="globe-readout mono">
        <span>LAT {activeVenue.lat.toFixed(2)}°</span>
        <span>LON {activeVenue.lon.toFixed(2)}°</span>
        <b>{statusLabel} / {activeVenue.label} · {talks[selected].code}</b>
      </div>
    </div>
  );
}
