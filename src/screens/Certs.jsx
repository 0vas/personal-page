import { useEffect, useMemo, useRef, useState } from "react";
import { Reveal, Micro } from "../components/bits.jsx";
import EChart from "../components/EChart.jsx";
import { AssetIcon, Icon } from "../components/Icons.jsx";
import { CERT_CATEGORIES, CERT_TOTAL, LINKS } from "../data/content.js";
import { chartColors } from "../theme-colors.js";
import { L, STRINGS } from "../i18n.js";

const CHART_H = 500;
const R_MID = 0.35; // mid radius of the category ring, for the logo overlay
const R_DRILL = 0.62; // mid radius (as an ECharts fraction) of the drilled cert ring
const BADGE_EXTS = ["png", "webp", "jpg", "jpeg", "svg"];

// The sunburst renders instantly (ECharts' own animation is off — its internal
// entrance is fragile here: a resize mid-flight can freeze it translucent). The
// level-change "deploy" is instead a robust zoom+fade played on the wheel
// container (see the `drill` effect below), which can't stall or leave sectors
// unreadable. The Framer <Reveal> still fades the whole wheel in on first paint.
const ANIM = { animation: false };

const FEATURED_CERTS = CERT_CATEGORIES.flatMap((category) =>
  category.certs
    .filter((cert) => cert.featured || ["EXPERT", "LEADERSHIP"].includes(cert.level))
    .map((cert) => ({ category, cert })),
);

// Silently probe `/assets/certs/badges/<badge>.<ext>` (trying each extension)
// off-DOM, so a missing file never flashes a broken-image icon. Resolves to the
// working URL, or null when no file exists (→ keep the native text label).
function probeBadge(badge, onResolve) {
  const urls = BADGE_EXTS.map((e) => `/assets/certs/badges/${badge}.${e}`);
  let done = false;
  const tryAt = (i) => {
    if (done || i >= urls.length) return;
    const img = new Image();
    img.onload = () => { if (!done) { done = true; onResolve(urls[i]); } };
    img.onerror = () => tryAt(i + 1);
    img.src = urls[i];
  };
  tryAt(0);
  return () => { done = true; };
}

export default function Certs({ theme, lang }) {
  const S = STRINGS[lang].certifications;
  const groupRefs = useRef({});
  const wrapRef = useRef(null);
  const featuredRef = useRef(null);
  const [flash, setFlash] = useState(null);
  const [drill, setDrill] = useState(null); // null = overview · else a category id
  const [featuredFlash, setFeaturedFlash] = useState(false);
  const [badgeSrc, setBadgeSrc] = useState({}); // cert.name → resolved badge URL (only successes)
  const [box, setBox] = useState({ w: 0, h: CHART_H });
  const flashTimer = useRef(null);
  const featuredTimer = useRef(null);
  const deployedRef = useRef(false);

  const cat = drill ? CERT_CATEGORIES.find((c) => c.id === drill) : null;

  useEffect(() => {
    if (!wrapRef.current) return;
    const ro = new ResizeObserver((entries) => {
      const r = entries[0].contentRect;
      setBox({ w: r.width, h: r.height });
    });
    ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => () => {
    clearTimeout(flashTimer.current);
    clearTimeout(featuredTimer.current);
  }, []);

  // Level-change "deploy": a robust zoom + fade on the whole wheel container each
  // time the drill level changes (skips the first mount, where the Framer
  // <Reveal> already handles the entrance). Uses the Web Animations API so a chart
  // resize can never freeze it, and reduced-motion opts out.
  useEffect(() => {
    if (!deployedRef.current) { deployedRef.current = true; return; }
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (!wrapRef.current || reduce) return;
    wrapRef.current.animate(
      [{ transform: "scale(.94)", opacity: 0.35 }, { transform: "scale(1)", opacity: 1 }],
      { duration: 430, easing: "cubic-bezier(.22,.68,.3,1)" },
    );
  }, [drill]);

  // Preload the drilled category's badges; a slice only swaps text → image once
  // its file is confirmed to exist, so there is never a broken-image flash.
  // The reset keeps the SAME empty-object reference when already empty, so the
  // overview never re-runs the sunburst option (which would flash the wheel).
  useEffect(() => {
    setBadgeSrc((prev) => (Object.keys(prev).length ? {} : prev));
    if (!cat) return undefined;
    const cancels = cat.certs
      .filter((cert) => cert.badge)
      .map((cert) => probeBadge(cert.badge, (url) => setBadgeSrc((m) => ({ ...m, [cert.name]: url }))));
    return () => cancels.forEach((cancel) => cancel());
  }, [cat]);

  const scrollLedger = (catId) => {
    const el = groupRefs.current[catId];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setFlash(catId);
    clearTimeout(flashTimer.current);
    flashTimer.current = setTimeout(() => setFlash(null), 1400);
  };

  const open = (catId) => { setDrill(catId); scrollLedger(catId); };
  const back = () => setDrill(null);
  const showFeatured = () => {
    featuredRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setFeaturedFlash(true);
    clearTimeout(featuredTimer.current);
    featuredTimer.current = setTimeout(() => setFeaturedFlash(false), 1500);
  };

  const option = useMemo(() => {
    const c = chartColors(theme);

    if (cat) {
      // ---- drilled view: one category → its certifications ----
      return {
        tooltip: {
          backgroundColor: c.panel, borderColor: c.lineSoft,
          textStyle: { color: c.ink, fontFamily: c.mono, fontSize: 11 },
          formatter: (p) => p.data.issuer
            ? `${p.name}<br/><span style="opacity:.6">${p.data.issuer} · ${p.data.year}</span>` : p.name,
        },
        series: [{
          type: "sunburst",
          radius: ["30%", "94%"],
          center: ["50%", "50%"],
          sort: undefined,
          nodeClick: false,
          itemStyle: { borderColor: c.bg, borderWidth: 3, borderRadius: 6 },
          // slices aren't interactive here (use BACK) — disabling hover emphasis
          // keeps labels white/consistent and avoids extra redraws
          emphasis: { disabled: true },
          data: cat.certs.map((cert) => ({
            name: cert.name, issuer: cert.issuer, year: cert.year,
            value: 1,
            // full-opacity category fill so the white label keeps its contrast
            itemStyle: { color: cat.color, opacity: 1, borderRadius: 6 },
            label: {
              // once a badge image has loaded, its overlay replaces this text
              show: !badgeSrc[cert.name], rotate: "radial", color: "#fff",
              // dark halo keeps white text legible on lighter category colors
              textShadowColor: "rgba(0,0,0,.55)", textShadowBlur: 4, textShadowOffsetY: 1,
              fontFamily: c.mono, fontSize: 8.5, fontWeight: 600, minAngle: 6,
              width: 120, overflow: "truncate",
            },
          })),
          ...ANIM,
        }],
      };
    }

    // ---- overview: 9 categories → their certs ----
    const data = CERT_CATEGORIES.map((g) => ({
      name: L(g.name, lang), catId: g.id, value: g.certs.length,
      itemStyle: { color: g.color, borderRadius: 7 },
      label: { show: false }, // categories shown as SVG logos overlaid
      children: g.certs.map((cert) => ({
        name: cert.name, catId: g.id, issuer: cert.issuer, year: cert.year, value: 1,
        itemStyle: { color: g.color, opacity: 0.4, borderRadius: 5 },
        label: { show: true, rotate: "radial", color: c.dim, fontFamily: c.mono, fontSize: 7.5, minAngle: 12, width: 92, overflow: "truncate" },
      })),
    }));
    return {
      tooltip: {
        backgroundColor: c.panel, borderColor: c.lineSoft,
        textStyle: { color: c.ink, fontFamily: c.mono, fontSize: 11 },
        formatter: (p) => p.data.issuer
          ? `${p.name}<br/><span style="opacity:.6">${p.data.issuer} · ${p.data.year}</span>`
          : `<b>${p.name}</b> — ${p.value} · ${L(S.clickHint, lang) || ""}`,
      },
      series: [{
        type: "sunburst",
        data,
        radius: ["22%", "92%"],
        center: ["50%", "50%"],
        sort: undefined,
        nodeClick: false,
        itemStyle: { borderColor: c.bg, borderWidth: 3, borderRadius: 7 },
        emphasis: { focus: "ancestor" },
        levels: [
          {},
          { r0: "22%", r: "48%", itemStyle: { borderRadius: 7 } },
          { r0: "48%", r: "92%", itemStyle: { borderRadius: 5 } },
        ],
        ...ANIM,
      }],
    };
  }, [theme, lang, cat, badgeSrc, S.center, S.clickHint]);

  const onEvents = useMemo(() => ({
    click: (params) => {
      const d = params?.data;
      if (!d) return;
      if (cat) return; // drilled view: use the BACK control
      if (d.issuer) scrollLedger(d.catId);   // clicked a certification
      else if (d.catId) open(d.catId);        // clicked a category → drill in
    },
  }), [cat]);

  // overview logo overlay, positioned by angle on the category ring
  const logos = useMemo(() => {
    const { w, h } = box;
    if (!w || !h || cat) return [];
    const cx = w / 2, cy = h / 2, R = R_MID * Math.min(w, h);
    let acc = 0;
    return CERT_CATEGORIES.map((g) => {
      const frac = g.certs.length / CERT_TOTAL;
      const mid = acc + frac / 2; acc += frac;
      const deg = 90 - mid * 360;
      const rad = (deg * Math.PI) / 180;
      return { g, x: cx + R * Math.cos(rad), y: cy - R * Math.sin(rad), big: frac >= 0.09 };
    });
  }, [box, cat]);

  // drilled-view badge overlay, one entry per certification slice (equal angles)
  const badges = useMemo(() => {
    const { w, h } = box;
    if (!w || !h || !cat) return [];
    const cx = w / 2, cy = h / 2, R = (R_DRILL * Math.min(w, h)) / 2;
    const n = cat.certs.length;
    return cat.certs.map((cert, i) => {
      const mid = (i + 0.5) / n;
      const deg = 90 - mid * 360;
      const rad = (deg * Math.PI) / 180;
      return { cert, x: cx + R * Math.cos(rad), y: cy - R * Math.sin(rad) };
    });
  }, [box, cat]);

  return (
    <div className="screen-inner certs">
      <div style={{ position: "relative" }}>
        <Reveal>
          <p className="kicker">{S.kicker}</p>
          <p className="cert-note">
            {cat ? S.noteDrill : S.note}{" "}
            <a href={LINKS.credly} target="_blank" rel="noopener noreferrer">Credly ↗</a> ·{" "}
            <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <Micro text={`ACR / ${CERT_TOTAL}`} style={{ top: 96, right: "6%" }} />
          <div className="sun-wrap" ref={wrapRef} style={{ height: CHART_H }}>
            <EChart option={option} onEvents={onEvents} style={{ height: CHART_H }} />

            {/* overview: category logos around the ring */}
            {logos.map(({ g, x, y, big }) => (
              <button
                key={g.id} className="sun-logo"
                style={{ left: x, top: y, "--cat": g.color, width: big ? 34 : 26, height: big ? 34 : 26 }}
                onClick={() => open(g.id)} title={L(g.name, lang)} aria-label={L(g.name, lang)}
              >
                {/* category logo is asset-only (no built-in glyph) — supply
                    /assets/certs/<catIcon>.svg or it stays blank until uploaded */}
                <AssetIcon base={`/assets/certs/${g.catIcon}`} size={big ? 19 : 15} />
              </button>
            ))}

            {/* overview: featured-certifications star at the wheel center */}
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

            {/* drilled: badge image per slice — only for certs whose file loaded,
                 so missing images never flash and the native text label stays. */}
            {badges.map(({ cert, x, y }) => badgeSrc[cert.name] ? (
              <div
                key={cert.name} className="sun-badge"
                style={{ left: x, top: y, "--cat": cat.color }}
              >
                <img className="sun-badge-img" src={badgeSrc[cert.name]} alt="" aria-hidden="true" />
              </div>
            ) : null)}

            {/* drilled: center panel with logo, name, count and BACK */}
            {cat && (
              <div className="sun-center" style={{ "--cat": cat.color }}>
                <button className="sun-back" onClick={back} aria-label="Back">
                  <Icon id="chevron" size={13} className="sun-back-ico" /> {S.back}
                </button>
                <span className="sun-clogo"><AssetIcon base={`/assets/certs/${cat.catIcon}`} size={26} /></span>
                <span className="sun-cname">{L(cat.name, lang)}</span>
                <span className="sun-ccount mono">{cat.certs.length} {S.centerUnit}</span>
              </div>
            )}
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.2}>
        <div className="ledger">
          {CERT_CATEGORIES.map((g) => (
            <section
              key={g.id}
              ref={(el) => { groupRefs.current[g.id] = el; }}
              className={`lg-group ${flash === g.id ? "flash" : ""} ${drill === g.id ? "drilled" : ""}`}
            >
              <header className="lg-head" style={{ "--cat": g.color }} onClick={() => open(g.id)} role="button" tabIndex={0}>
                <span className="lg-catico"><AssetIcon base={`/assets/certs/${g.catIcon}`} size={16} /></span>
                <h3>{L(g.name, lang)}</h3>
                <span className="count">×{g.certs.length}</span>
              </header>
              <ul className="lg-rows">
                {g.certs.map((cert) => (
                  <li key={cert.name}>
                    <AssetIcon base={`/assets/certs/${cert.icon}`} fallbackId={cert.icon} size={14} className="lg-ico" />
                    <span className="nm">{cert.name}</span>
                    <span className="code">{cert.issuer} · {cert.year}</span>
                    {cert.level && (
                      <b className={`lv ${cert.featured || ["EXPERT", "LEADERSHIP"].includes(cert.level) ? "lv-x" : "lv-a"}`}>{cert.level}</b>
                    )}
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
        >
          <header className="featured-head">
            <span className="featured-emblem" aria-hidden="true"><i>★</i></span>
            <div>
              <p className="kicker">06-A // {S.featured}</p>
              <h2>{S.featuredHint}</h2>
              <p>{S.featuredIntro}</p>
            </div>
          </header>
          <div className="featured-grid">
            {FEATURED_CERTS.map(({ category, cert }, index) => (
              <button
                key={cert.name}
                className="featured-card"
                style={{ "--cat": category.color }}
                onClick={() => open(category.id)}
              >
                <span className="featured-index mono">0{index + 1}</span>
                <span className="featured-icon"><AssetIcon base={`/assets/certs/${cert.icon}`} fallbackId={cert.icon} size={22} /></span>
                <span className="featured-copy">
                  <small>{L(category.name, lang)} · {cert.level}</small>
                  <strong>{cert.name}</strong>
                  <span>{cert.issuer} · {cert.year}</span>
                </span>
                <span className="featured-arrow" aria-hidden="true">↗</span>
              </button>
            ))}
          </div>
        </section>
      </Reveal>
    </div>
  );
}
