import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Reveal, Micro } from "../components/bits.jsx";
import EChart from "../components/EChart.jsx";
import { AssetIcon, Icon } from "../components/Icons.jsx";
import { CERT_CATEGORIES, CERT_TOTAL, LINKS } from "../data/content.js";
import { chartColors } from "../theme-colors.js";
import { L, STRINGS } from "../i18n.js";

const CHART_H = 680;
const SERIES_ID = "credential-atlas";
const ATLAS_GEOMETRY = Object.freeze({
  regular: {
    centerY: 0.47,
    category: { r0: "16%", r: "60%" },
    credential: { r0: "62%", r: "76%" },
    categoryLabelRadius: 0.32,
    categoryIconRadius: 0.58,
    credentialIconRadius: 0.69,
    credentialLabelDistance: 12,
    faceRatio: 0.76,
    ringFrameRatio: 0.82,
    labelFrameRatio: 0.90,
  },
  compact: {
    centerY: 0.48,
    category: { r0: "18%", r: "50%" },
    credential: { r0: "52%", r: "70%" },
    categoryLabelRadius: 0.29,
    categoryIconRadius: 0.52,
    credentialIconRadius: 0.61,
    credentialLabelDistance: 6,
    faceRatio: 0.70,
    ringFrameRatio: 0.76,
    labelFrameRatio: 0.84,
  },
});
const BADGE_EXTS = ["png", "webp", "jpg", "jpeg", "svg"];
const BADGE_PROBE_CACHE = new Map();

const FEATURED_CERTS = CERT_CATEGORIES.flatMap((category) =>
  category.certs
    .filter((cert) => cert.featured || ["EXPERT", "LEADERSHIP"].includes(cert.level))
    .map((cert) => ({ category, cert })),
);
const FEATURED_DEFAULT_INDEX = Math.max(
  0,
  FEATURED_CERTS.findIndex(({ cert }) => cert.featured),
);

function certNodeId(categoryId, index) {
  return `cert:${categoryId}:${String(index).padStart(2, "0")}`;
}

function wrapRadialLabel(name, limit) {
  const words = name.split(" ");
  const lines = [];
  let line = "";
  words.forEach((word) => {
    const next = line ? `${line} ${word}` : word;
    if (line && next.length > limit) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  });
  if (line) lines.push(line);
  return lines.join("\n");
}

function wrapCategoryLabel(name, compact) {
  return wrapRadialLabel(name.replace(/-/g, "- "), compact ? 7 : 10);
}

function rgba(hex, alpha) {
  const value = hex.replace("#", "");
  const normalized = value.length === 3
    ? value.split("").map((digit) => `${digit}${digit}`).join("")
    : value;
  if (!/^[0-9a-f]{6}$/i.test(normalized)) return hex;
  const number = Number.parseInt(normalized, 16);
  return `rgba(${(number >> 16) & 255}, ${(number >> 8) & 255}, ${number & 255}, ${alpha})`;
}

// A diagonal three-stop face gives the SVG sectors a shallow machined depth.
// The 62-cell corona deliberately receives no individual shadow filter: the
// shared deck supplies the neon lift without multiplying expensive SVG filters.
function sectorFill(color, theme, strength = 1) {
  const dark = theme === "dark";
  return {
    type: "linear",
    x: 0,
    y: 0,
    x2: 1,
    y2: 1,
    colorStops: [
      { offset: 0, color: rgba(color, (dark ? 0.98 : 0.94) * strength) },
      { offset: 0.56, color: rgba(color, (dark ? 0.82 : 0.78) * strength) },
      { offset: 1, color: rgba(color, (dark ? 0.56 : 0.52) * strength) },
    ],
  };
}

// Keep the credential plate in a predictable lateral lane. ECharts still
// confines it to the chart field, while the body portal lets it clear the
// React-owned centre hub and issuer controls that sit above the SVG plane.
function placeCertificationTooltip(point, _params, _dom, _rect, size) {
  const [contentWidth, contentHeight] = size.contentSize;
  const [viewWidth, viewHeight] = size.viewSize;
  const gutter = 14;
  const safeWidth = Math.max(0, viewWidth - gutter * 2);
  const plateWidth = Math.min(contentWidth, safeWidth);
  const left = point[0] <= viewWidth / 2
    ? gutter
    : Math.max(gutter, viewWidth - plateWidth - gutter);
  const maxTop = Math.max(gutter, viewHeight - contentHeight - gutter);
  const top = Math.min(Math.max(gutter, point[1] - contentHeight / 2), maxTop);
  return [left, top];
}

// Probe `/assets/certs/badges/<badge>.<ext>` off-DOM. A missing file never
// enters the document, so the issuer mark can remain as the designed fallback.
function probeBadge(badge, onResolve) {
  let cancelled = false;
  if (!BADGE_PROBE_CACHE.has(badge)) {
    const urls = BADGE_EXTS.map((ext) => `/assets/certs/badges/${badge}.${ext}`);
    BADGE_PROBE_CACHE.set(badge, new Promise((resolve) => {
      const tryAt = (index) => {
        if (index >= urls.length) {
          resolve(null);
          return;
        }
        const image = new Image();
        image.onload = () => resolve(urls[index]);
        image.onerror = () => tryAt(index + 1);
        image.src = urls[index];
      };
      tryAt(0);
    }));
  }
  BADGE_PROBE_CACHE.get(badge).then((url) => {
    if (!cancelled && url) onResolve(url);
  });
  return () => { cancelled = true; };
}

function findCertification(categoryId, certIndex) {
  const category = CERT_CATEGORIES.find((entry) => entry.id === categoryId);
  const cert = category?.certs[certIndex];
  return category && cert ? { category, cert } : null;
}

export default function Certs({ theme, lang }) {
  const S = STRINGS[lang].certifications;
  const reduceMotion = Boolean(useReducedMotion());
  const compact = typeof window !== "undefined" && window.innerWidth <= 720;
  const atlasGeometry = compact ? ATLAS_GEOMETRY.compact : ATLAS_GEOMETRY.regular;
  const chartRef = useRef(null);
  const wrapRef = useRef(null);
  const ledgerRef = useRef(null);
  const rowRefs = useRef({});
  const featuredRef = useRef(null);
  const featuredNodeRefs = useRef([]);
  const featuredTimer = useRef(null);
  const selectionTimer = useRef(null);
  const [drill, setDrill] = useState(null);
  const [selectedCert, setSelectedCert] = useState(null);
  const [featuredFlash, setFeaturedFlash] = useState(false);
  const [featuredIndex, setFeaturedIndex] = useState(FEATURED_DEFAULT_INDEX);
  const [badgeSrc, setBadgeSrc] = useState({});
  const [box, setBox] = useState({ w: 0, h: CHART_H });

  const resetAtlasState = useCallback(() => {
    clearTimeout(selectionTimer.current);
    setDrill(null);
    setSelectedCert(null);
    setBadgeSrc({});
  }, []);

  const cat = drill ? CERT_CATEGORIES.find((category) => category.id === drill) : null;
  const visibleCategories = cat ? [cat] : CERT_CATEGORIES;
  const selectedEntry = useMemo(() => {
    if (!selectedCert) return null;
    for (const category of CERT_CATEGORIES) {
      const cert = category.certs.find((entry) => entry.name === selectedCert);
      if (cert) return { category, cert };
    }
    return null;
  }, [selectedCert]);
  const featuredActive = FEATURED_CERTS[featuredIndex] || FEATURED_CERTS[FEATURED_DEFAULT_INDEX];

  useEffect(() => {
    if (!wrapRef.current) return undefined;
    const observer = new ResizeObserver((entries) => {
      const rect = entries[0].contentRect;
      setBox({ w: rect.width, h: rect.height });
    });
    observer.observe(wrapRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => () => {
    clearTimeout(featuredTimer.current);
    clearTimeout(selectionTimer.current);
  }, []);

  // These configuration changes rebuild the option and therefore return ECharts
  // to its root. Keep the DOM controls and registry synchronized with that reset.
  useEffect(() => {
    resetAtlasState();
  }, [theme, lang, compact, reduceMotion, resetAtlasState]);

  // Only the active category probes its optional certification badges. Badge
  // resolution changes DOM overlays, never the stable ECharts option/tree.
  useEffect(() => {
    setBadgeSrc({});
    if (!cat) return undefined;
    const cancels = cat.certs
      .filter((cert) => cert.badge)
      .map((cert) => probeBadge(cert.badge, (url) => {
        setBadgeSrc((current) => ({ ...current, [cert.name]: url }));
      }));
    return () => cancels.forEach((cancel) => cancel());
  }, [cat]);

  useEffect(() => {
    if (ledgerRef.current) ledgerRef.current.scrollTop = 0;
  }, [drill]);

  const back = useCallback(() => {
    // Remove the focused DOM layer atomically before asking ECharts to roll up.
    // The corresponding action event is idempotent and covers its native blue
    // ancestor sector as well as these explicit BACK controls.
    resetAtlasState();
    chartRef.current?.rootToTop(SERIES_ID);
    chartRef.current?.dispatchAction({ type: "downplay", seriesId: SERIES_ID });
  }, [resetAtlasState]);

  useEffect(() => {
    if (!drill) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") back();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [back, drill]);

  const openCategory = useCallback((categoryId, nativeEvent = false) => {
    if (!CERT_CATEGORIES.some((category) => category.id === categoryId)) return;
    if (!nativeEvent) chartRef.current?.rootToNode(SERIES_ID, categoryId);
    chartRef.current?.dispatchAction({ type: "downplay", seriesId: SERIES_ID });
    setDrill(categoryId);
    setSelectedCert(null);
  }, []);

  const selectCertification = useCallback((category, cert, nativeEvent = false) => {
    if (!category || !cert) return;
    if (drill !== category.id) openCategory(category.id, nativeEvent);
    setSelectedCert(cert.name);
    clearTimeout(selectionTimer.current);
    selectionTimer.current = setTimeout(() => {
      chartRef.current?.dispatchAction({ type: "downplay", seriesId: SERIES_ID });
      chartRef.current?.dispatchAction({ type: "highlight", seriesId: SERIES_ID, name: cert.name });
      const row = rowRefs.current[`${category.id}:${cert.name}`];
      const ledger = ledgerRef.current;
      if (row && ledger) {
        ledger.scrollTo({
          top: Math.max(0, row.offsetTop - 58),
          behavior: reduceMotion ? "auto" : "smooth",
        });
      }
    }, reduceMotion ? 0 : 360);
  }, [drill, openCategory, reduceMotion]);

  const showFeatured = () => {
    setFeaturedIndex(FEATURED_DEFAULT_INDEX);
    featuredRef.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    setFeaturedFlash(true);
    clearTimeout(featuredTimer.current);
    featuredTimer.current = setTimeout(() => setFeaturedFlash(false), 1500);
  };

  const onFeaturedKeyDown = (event, index) => {
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % FEATURED_CERTS.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index - 1 + FEATURED_CERTS.length) % FEATURED_CERTS.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = FEATURED_CERTS.length - 1;
    else return;
    event.preventDefault();
    event.stopPropagation();
    setFeaturedIndex(next);
    featuredNodeRefs.current[next]?.focus();
  };

  const locateFeatured = () => {
    if (!featuredActive) return;
    selectCertification(featuredActive.category, featuredActive.cert);
    wrapRef.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
  };

  const option = useMemo(() => {
    const colors = chartColors(theme);
    const { category: CATEGORY_RING, credential: CERT_RING } = atlasGeometry;
    const data = CERT_CATEGORIES.map((category) => {
      const categoryName = L(category.name, lang);
      return {
        id: category.id,
        name: categoryName,
        catId: category.id,
        value: category.certs.length,
        nodeClick: "rootToNode",
        cursor: "pointer",
        itemStyle: {
          color: sectorFill(category.color, theme),
          opacity: 1,
          borderRadius: 2,
          shadowBlur: theme === "dark" ? 11 : 7,
          shadowOffsetY: theme === "dark" ? 5 : 4,
          shadowColor: rgba(category.color, theme === "dark" ? 0.34 : 0.18),
        },
        label: { show: false },
        children: category.certs.map((cert, index) => ({
        id: certNodeId(category.id, index),
        name: cert.name,
        catId: category.id,
        certIndex: index,
        issuer: cert.issuer,
        year: cert.year,
        value: 1,
        nodeClick: false,
        cursor: "pointer",
        itemStyle: { color: sectorFill(category.color, theme, 0.88), opacity: 1, borderRadius: 1 },
        label: {
          show: true,
          position: "outside",
          rotate: "radial",
          distance: atlasGeometry.credentialLabelDistance,
          minAngle: 7,
          formatter: wrapRadialLabel(cert.name, compact ? 9 : 14),
          color: theme === "dark" ? category.color : colors.ink,
          fontFamily: colors.mono,
          fontSize: compact ? 7.2 : 9.5,
          lineHeight: compact ? 8.4 : 11.5,
          fontWeight: 600,
          textBorderColor: colors.bg,
          textBorderWidth: compact ? 2.5 : 3,
        },
        emphasis: {
          itemStyle: { opacity: 1, shadowBlur: 18, shadowColor: rgba(category.color, theme === "dark" ? 0.5 : 0.28) },
          label: { show: true, color: colors.ink, fontWeight: 700 },
        },
        })),
      };
    });

    return {
      aria: { enabled: true, description: S.chartAria },
      tooltip: {
        trigger: "item",
        renderMode: "html",
        appendTo: "body",
        className: "cert-atlas-tooltip",
        confine: true,
        enterable: false,
        position: placeCertificationTooltip,
        backgroundColor: colors.panel,
        borderColor: colors.line,
        borderWidth: 1,
        padding: [9, 12],
        textStyle: { color: colors.ink, fontFamily: colors.mono, fontSize: 10 },
        extraCssText: "z-index: 80; pointer-events: none; box-shadow: 0 14px 34px rgba(0,0,0,.24);",
        formatter: (params) => params.data?.issuer
          ? `<b>${params.name}</b><br/><span style="opacity:.72">${params.data.issuer} · ${params.data.year}</span>`
          : `<b>${params.name}</b><br/><span style="opacity:.72">${params.value} ${S.centerUnit} · ${S.clickHint}</span>`,
      },
      series: [{
        id: SERIES_ID,
        name: "CERTIFICATION_REGISTRY",
        type: "sunburst",
        data,
        radius: [CATEGORY_RING.r0, CERT_RING.r],
        center: ["50%", `${atlasGeometry.centerY * 100}%`],
        startAngle: 90,
        clockwise: true,
        // `undefined` inherits ECharts' default descending sort. `null` is the
        // documented no-sort value and keeps the DOM logo/icon overlays aligned
        // with the source order throughout native drill and roll-up transitions.
        sort: null,
        nodeClick: "rootToNode",
        itemStyle: { borderColor: colors.bg, borderWidth: 1.5, borderRadius: 3 },
        emphasis: { focus: "ancestor" },
        blur: {
          itemStyle: { opacity: theme === "dark" ? 0.24 : 0.2 },
          label: { opacity: 0.22 },
        },
        levels: [
          {
            label: { show: false },
            itemStyle: {
              color: sectorFill(colors.accent, theme, 0.76),
              borderColor: rgba(colors.accent, theme === "dark" ? 0.72 : 0.48),
              borderWidth: 1.5,
              shadowBlur: theme === "dark" ? 18 : 10,
              shadowColor: colors.accentSoft,
            },
          },
          {
            r0: CATEGORY_RING.r0,
            r: CATEGORY_RING.r,
            itemStyle: { borderWidth: 2, borderRadius: 3 },
            label: { show: false },
          },
          {
            r0: CERT_RING.r0,
            r: CERT_RING.r,
            itemStyle: { borderWidth: 1.25, borderRadius: 2 },
          },
        ],
        animation: !reduceMotion,
        animationType: "expansion",
        animationDuration: reduceMotion ? 0 : 680,
        animationDurationUpdate: reduceMotion ? 0 : 760,
        animationEasing: "cubicOut",
        animationEasingUpdate: "cubicInOut",
      }],
    };
  }, [atlasGeometry, compact, lang, reduceMotion, S.centerUnit, S.chartAria, S.clickHint, theme]);

  const onEvents = useMemo(() => ({
    click: (params) => {
      const data = params?.data;
      if (!data?.catId) return;
      if (data.issuer) {
        const entry = findCertification(data.catId, data.certIndex);
        if (entry) selectCertification(entry.category, entry.cert, drill === data.catId);
      } else {
        openCategory(data.catId, true);
      }
    },
    // ECharts' focused sunburst includes a native ancestor annulus. Its click
    // rolls the SVG up without producing a data click with `catId`, so consume
    // the action event itself and restore every React-owned overlay as well.
    sunburstroottonode: (params) => {
      if (params?.direction === "rollUp") resetAtlasState();
    },
  }), [drill, openCategory, resetAtlasState, selectCertification]);

  // Category marks sit at the outer edge of the broad inner band; focused
  // credential marks sit at the exact midpoint of the thin credential corona.
  // Both derive from the same geometry that drives ECharts.
  const logos = useMemo(() => {
    const { w, h } = box;
    if (!w || !h || cat) return [];
    const cx = w / 2;
    const cy = h * atlasGeometry.centerY;
    const labelRadius = (atlasGeometry.categoryLabelRadius * Math.min(w, h)) / 2;
    const radius = (atlasGeometry.categoryIconRadius * Math.min(w, h)) / 2;
    let acc = 0;
    return CERT_CATEGORIES.map((category) => {
      const fraction = category.certs.length / CERT_TOTAL;
      const middle = acc + fraction / 2;
      acc += fraction;
      const degrees = 90 - middle * 360;
      const angle = (degrees * Math.PI) / 180;
      let rotation = -degrees;
      if (rotation > 90) rotation -= 180;
      if (rotation < -90) rotation += 180;
      return {
        g: category,
        x: cx + radius * Math.cos(angle),
        y: cy - radius * Math.sin(angle),
        labelX: cx + labelRadius * Math.cos(angle),
        labelY: cy - labelRadius * Math.sin(angle),
        rotation,
      };
    });
  }, [atlasGeometry, box, cat]);

  const sliceIcons = useMemo(() => {
    const { w, h } = box;
    if (!w || !h || !cat) return [];
    const cx = w / 2;
    const cy = h * atlasGeometry.centerY;
    const radius = (atlasGeometry.credentialIconRadius * Math.min(w, h)) / 2;
    const count = cat.certs.length;
    return cat.certs.map((cert, index) => {
      const middle = (index + 0.5) / count;
      const angle = ((90 - middle * 360) * Math.PI) / 180;
      return {
        cert,
        x: cx + radius * Math.cos(angle),
        y: cy - radius * Math.sin(angle),
      };
    });
  }, [atlasGeometry, box, cat]);

  const atlasSize = box.w && box.h ? Math.min(box.w, box.h) : CHART_H;

  return (
    <div className="screen-inner certs">
      <div className="cert-atlas">
        <Reveal>
          <p className="kicker">{S.kicker}</p>
          <p className="cert-note">
            {cat ? S.noteDrill : S.note}{" "}
            <a className="credly-link" href={LINKS.credly} target="_blank" rel="noopener noreferrer">
              <AssetIcon base="/assets/brands/credly" fallbackId="credly" size={18} className="brand-mark-credly" />
              Credly ↗
            </a> ·{" "}
            <a className="brand-link" href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">
              <AssetIcon base="/assets/brands/linkedin" fallbackId="linkedin" size={18} className="brand-mark-linkedin" />
              LinkedIn ↗
            </a>
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <Micro text={`ACR / ${CERT_TOTAL}`} style={{ top: 96, right: "4%" }} />
          <div
            className={`sun-wrap ${cat ? "is-focused" : "is-overview"}`}
            ref={wrapRef}
            style={{
              "--atlas-size": `${atlasSize}px`,
              "--atlas-face-size": `${atlasSize * atlasGeometry.faceRatio}px`,
              "--atlas-ring-frame": `${atlasSize * atlasGeometry.ringFrameRatio}px`,
              "--atlas-label-frame": `${atlasSize * atlasGeometry.labelFrameRatio}px`,
              "--atlas-center-y": `${atlasGeometry.centerY * 100}%`,
              "--atlas-signal": cat?.color || "var(--accent)",
            }}
          >
            <span className="sun-iso-deck" aria-hidden="true" />
            <span className="sun-energy-ring" aria-hidden="true" />

            <div className="sun-plane">
              <EChart ref={chartRef} option={option} onEvents={onEvents} style={{ height: "100%" }} className="sun-chart" />

              <div key={`atlas-overlays:${drill || "overview"}`} className="sun-overlay-layer">
                {logos.map(({ g, labelX, labelY, rotation }) => (
                  <span
                    key={`${g.id}:label`}
                    className="sun-category-name"
                    style={{ left: labelX, top: labelY, "--label-angle": `${rotation}deg` }}
                    aria-hidden="true"
                  >
                    {wrapCategoryLabel(L(g.name, lang), compact)}
                  </span>
                ))}

                {logos.map(({ g, x, y }) => (
                  <button
                    key={g.id}
                    className="sun-logo"
                    style={{ left: x, top: y, "--cat": g.color }}
                    onClick={() => openCategory(g.id)}
                    title={`${L(g.name, lang)} · ${g.certs.length}`}
                    aria-label={`${L(g.name, lang)} · ${g.certs.length} ${S.centerUnit}`}
                    aria-pressed={drill === g.id}
                  >
                    <AssetIcon base={`/assets/certs/${g.catIcon}`} size={22} />
                  </button>
                ))}

                {!cat && (
                  <button
                    className="sun-feature-star"
                    onClick={showFeatured}
                    aria-controls="featured-certifications"
                    aria-label={S.featuredHint}
                    title={S.featuredHint}
                  >
                    <span className="sun-star-core" aria-hidden="true">★</span>
                    <small>{S.featured}</small>
                  </button>
                )}

                {sliceIcons.map(({ cert, x, y }) => (
                  <div
                    key={cert.name}
                    className={`sun-badge sun-slice-icon ${badgeSrc[cert.name] ? "has-badge" : "issuer-mark"}`}
                    style={{ left: x, top: y, "--cat": cat.color }}
                    aria-hidden="true"
                  >
                    {badgeSrc[cert.name] ? (
                      <img className="sun-badge-img" src={badgeSrc[cert.name]} alt="" />
                    ) : (
                      <AssetIcon base={`/assets/certs/${cert.icon}`} fallbackId={cert.icon} size={22} />
                    )}
                  </div>
                ))}

                {cat && <span className="sun-focus-hub" aria-hidden="true" />}

                {cat && (
                  <button className="sun-center" style={{ "--cat": cat.color }} onClick={back} aria-label={`${S.back}: ${L(cat.name, lang)}`}>
                    <span className="sun-back"><Icon id="chevron" size={12} className="sun-back-ico" /> {S.back}</span>
                    <span className="sun-clogo"><AssetIcon base={`/assets/certs/${cat.catIcon}`} size={22} /></span>
                    <span className="sun-cname">{L(cat.name, lang)}</span>
                    <span className="sun-ccount mono">{cat.certs.length} {S.centerUnit}</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          <p className="sr-only" aria-live="polite">
            {selectedEntry
              ? `${selectedEntry.cert.name}. ${selectedEntry.cert.issuer}. ${selectedEntry.cert.year}.`
              : cat ? `${L(cat.name, lang)}. ${cat.certs.length} ${S.centerUnit}.` : S.overview}
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.1} className="cert-registry-wrap">
        <div className="cert-registry-head">
          <div className="cert-registry-title">
            <span className="mono">{S.registry}</span>
            <strong>{cat ? L(cat.name, lang) : S.overview}</strong>
          </div>
          <span className="cert-registry-count mono">{cat ? cat.certs.length : CERT_TOTAL} / {CERT_TOTAL}</span>
          <div className="cert-registry-action-slot">
            {cat ? (
              <button className="cert-registry-back" onClick={back}>
                <Icon id="chevron" size={11} /> {S.allCategories}
              </button>
            ) : (
              <span className="cert-registry-guide mono">
                <i aria-hidden="true" /> {S.registryHint}
              </span>
            )}
          </div>
        </div>
        <div className={`ledger ${cat ? "focused" : ""}`} ref={ledgerRef} aria-label={S.registry}>
          {visibleCategories.map((g) => (
            <section key={g.id} className={`lg-group ${drill === g.id ? "drilled" : ""}`}>
              <button className="lg-head" style={{ "--cat": g.color }} onClick={() => openCategory(g.id)} aria-pressed={drill === g.id}>
                <span className="lg-catico"><AssetIcon base={`/assets/certs/${g.catIcon}`} size={17} /></span>
                <span className="lg-title">{L(g.name, lang)}</span>
                <span className="count">×{g.certs.length}</span>
              </button>
              <ul className="lg-rows">
                {g.certs.map((cert) => (
                  <li
                    key={cert.name}
                    ref={(element) => { rowRefs.current[`${g.id}:${cert.name}`] = element; }}
                  >
                    <button
                      className={`lg-row ${selectedCert === cert.name ? "selected" : ""}`}
                      onClick={() => selectCertification(g, cert)}
                      aria-pressed={selectedCert === cert.name}
                    >
                      <span className="lg-ico"><AssetIcon base={`/assets/certs/${cert.icon}`} fallbackId={cert.icon} size={15} /></span>
                      <span className="nm">{cert.name}</span>
                      <span className="code">{cert.issuer} · {cert.year}</span>
                      {cert.level && (
                        <b className={`lv ${cert.featured || ["EXPERT", "LEADERSHIP"].includes(cert.level) ? "lv-x" : "lv-a"}`}>{cert.level}</b>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.08} className="featured-certs-wrap">
        <section
          id="featured-certifications"
          ref={featuredRef}
          className={`featured-certs ${featuredFlash ? "flash" : ""}`}
          style={{ "--signal": featuredActive.category.color }}
        >
          <header className="featured-head">
            <span className="featured-emblem" aria-hidden="true"><i>★</i></span>
            <div className="featured-heading-copy">
              <p className="kicker">06-A // {S.featured}</p>
              <h2>{S.featuredHint}</h2>
              <p>{S.featuredIntro}</p>
            </div>
            <span className="featured-head-status mono">
              <b>{S.featuredSignal}</b>
              <small>{String(featuredIndex + 1).padStart(2, "0")} / {String(FEATURED_CERTS.length).padStart(2, "0")}</small>
            </span>
          </header>

          <div className="featured-showcase">
            <div className="featured-signal-rail" style={{ "--active-index": featuredIndex }}>
              <span className="featured-track" aria-hidden="true" />
              <span className="featured-track-indicator" aria-hidden="true" />
              <div className="featured-tabs" role="tablist" aria-label={S.featuredHint}>
                {FEATURED_CERTS.map(({ category, cert }, index) => {
                  const active = index === featuredIndex;
                  return (
                    <button
                      key={cert.name}
                      id={`featured-tab-${index}`}
                      ref={(element) => { featuredNodeRefs.current[index] = element; }}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      aria-controls="featured-plate"
                      tabIndex={active ? 0 : -1}
                      className={`featured-tab ${active ? "active" : ""}`}
                      style={{ "--cat": category.color }}
                      title={cert.name}
                      onClick={() => setFeaturedIndex(index)}
                      onFocus={() => setFeaturedIndex(index)}
                      onKeyDown={(event) => onFeaturedKeyDown(event, index)}
                    >
                      <span className="featured-tab-index mono">{String(index + 1).padStart(2, "0")}</span>
                      <span className="featured-tab-mark">
                        <span className="featured-tab-art">
                          <AssetIcon base={`/assets/certs/${cert.icon}`} fallbackId={cert.icon} size={21} />
                        </span>
                      </span>
                      <span className="featured-tab-meta">
                        <b>{L(category.name, lang)}</b>
                        <small className="mono">{cert.year}</small>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <article
              id="featured-plate"
              className="featured-plate"
              role="tabpanel"
              aria-labelledby={`featured-tab-${featuredIndex}`}
            >
              <span className="featured-plate-icon">
                <span>
                  <AssetIcon
                    base={`/assets/certs/${featuredActive.cert.icon}`}
                    fallbackId={featuredActive.cert.icon}
                    size={28}
                  />
                </span>
              </span>
              <div key={featuredActive.cert.name} className="featured-plate-copy" aria-live="polite">
                <p className="mono">{L(featuredActive.category.name, lang)} · {featuredActive.cert.level}</p>
                <h3>{featuredActive.cert.name}</h3>
                <span>{featuredActive.cert.issuer} · {featuredActive.cert.year}</span>
              </div>
              <footer className="featured-plate-action">
                <span className="mono">{S.featuredVerified}</span>
                <button type="button" className="featured-locate" onClick={locateFeatured}>
                  {S.featuredLocate} <span aria-hidden="true">↗</span>
                </button>
              </footer>
            </article>
          </div>
        </section>
      </Reveal>
    </div>
  );
}
