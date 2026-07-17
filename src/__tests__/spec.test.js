/* Executable acceptance spec — see SPEC.md. Run: npm test */
import { describe, it, expect } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import {
  TALKS, CERT_CATEGORIES, CERT_TOTAL, CAREER_ORDER, CAREER_GROUPS, CAREER_DETAILS,
  EDUCATION, HOME, PROJECTS, LINKS,
} from "../data/content.js";
import { STRINGS } from "../i18n.js";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const SCREENS = ["home", "career", "speaking", "projects", "education", "certifications", "contact"];

const hexRgb = (hex) => {
  const value = hex.replace("#", "");
  const full = value.length === 3 ? value.split("").map((c) => c + c).join("") : value;
  return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16) / 255);
};
const luminance = (hex) => hexRgb(hex)
  .map((value) => (value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4))
  .reduce((sum, value, index) => sum + value * [0.2126, 0.7152, 0.0722][index], 0);
const contrast = (a, b) => {
  const [high, low] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (high + 0.05) / (low + 0.05);
};
const hexToken = (css, name) => css.match(new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{3,6})`))?.[1];

describe("Global", () => {
  it("G1 — 7 screens in order", () => {
    expect(SCREENS).toHaveLength(7);
  });
  it("G2 — every screen has label + title in en and es", () => {
    for (const s of SCREENS) {
      for (const lang of ["en", "es"]) {
        expect(STRINGS[lang][s], `${lang}.${s}`).toBeTruthy();
        expect(typeof STRINGS[lang][s].label).toBe("string");
        expect(typeof STRINGS[lang][s].title).toBe("string");
      }
    }
  });
  it("G3 — es has every top-level key that en has", () => {
    const enKeys = Object.keys(STRINGS.en);
    const esKeys = new Set(Object.keys(STRINGS.es));
    for (const k of enKeys) expect(esKeys.has(k), `es missing ${k}`).toBe(true);
  });
  it("G6/G7 — non-blocking first-session intro without a Home background request", () => {
    const app = readFileSync(resolve(ROOT, "src/App.jsx"), "utf8");
    const bits = readFileSync(resolve(ROOT, "src/components/bits.jsx"), "utf8");
    const html = readFileSync(resolve(ROOT, "index.html"), "utf8");
    const css = readFileSync(resolve(ROOT, "src/styles/app.css"), "utf8");
    expect(app).toContain("<OpeningSequence");
    expect(app).toContain('sessionStorage.getItem("ovas-intro-v4")');
    expect(app).toContain('(prefers-reduced-motion: reduce)');
    expect(app).not.toContain("<Boot onDone=");
    expect(css).toMatch(/\.opening-sequence\s*\{[^}]*pointer-events:\s*none/s);
    expect(css).toMatch(/\.opening-sequence\.leaving\s*\{[^}]*opacity:\s*0/s);
    expect(css).toContain(".boot-terminal");
    expect(bits).toContain('["reveal", className]');
    expect(css).toMatch(/prefers-reduced-motion:[\s\S]*\.reveal\s*\{[^}]*opacity:\s*1\s*!important[^}]*transform:\s*none\s*!important/);
    expect(css).toContain("screenFadeIn .16s");
    expect(bits).toContain("duration: 0.3");
    expect(html).not.toContain('/assets/bg/home.');
  });
  it("G11 — dark theme uses dark ink on the (light) accent fills for contrast", () => {
    const theme = readFileSync(resolve(ROOT, "src/styles/theme.css"), "utf8");
    const dark = theme.slice(theme.indexOf('[data-theme="dark"]'));
    const inkMatch = dark.match(/--accent-ink:\s*(#[0-9a-fA-F]{3,8})/);
    expect(inkMatch, "dark --accent-ink defined").toBeTruthy();
    expect(inkMatch[1].toLowerCase()).not.toBe("#ffffff"); // white fails contrast on light violet
  });
  it("G12 — dark secondary and micro text remain legible across base surfaces", () => {
    const theme = readFileSync(resolve(ROOT, "src/styles/theme.css"), "utf8");
    const dark = theme.slice(theme.indexOf('[data-theme="dark"]'));
    const dim = hexToken(dark, "dim");
    const faint = hexToken(dark, "faint");
    const ink = hexToken(dark, "ink");
    expect(dim && faint && ink).toBeTruthy();
    for (const bgName of ["bg0", "bg1", "bg2"]) {
      const bg = hexToken(dark, bgName);
      expect(contrast(dim, bg), `--dim on --${bgName}`).toBeGreaterThanOrEqual(7);
      expect(contrast(faint, bg), `--faint on --${bgName}`).toBeGreaterThanOrEqual(4.5);
      expect(contrast(ink, bg), `--ink on --${bgName}`).toBeGreaterThan(contrast(dim, bg));
    }
  });
  it("G9/G10/H4 — atomic CSS navigation and no top-right statistics", () => {
    const app = readFileSync(resolve(ROOT, "src/App.jsx"), "utf8");
    const home = readFileSync(resolve(ROOT, "src/screens/Home.jsx"), "utf8");
    expect(app).toContain('className="screen screen-enter"');
    expect(app).not.toContain("<RouteSignal");        // decorative mid-page route line removed
    expect(app).not.toContain("route-transition");
    expect(app).not.toContain("<motion.section");
    expect(app).not.toContain("ct-stat-value");
    expect(home).not.toContain("READOUTS");
    expect(home).not.toContain("Counter");
  });
  it("H5 — Home skips image backdrop and staggered motion", () => {
    const app = readFileSync(resolve(ROOT, "src/App.jsx"), "utf8");
    const home = readFileSync(resolve(ROOT, "src/screens/Home.jsx"), "utf8");
    expect(app).toContain('screen !== "home" && <SceneBg');
    expect(app).toContain("bd-home-ambient");
    expect(home).not.toContain("<Reveal");
    expect(home).toContain('data-text="LOBATON"');
  });
  it("H6 — Home roles type from a complete first frame without layout shift", () => {
    const home = readFileSync(resolve(ROOT, "src/screens/Home.jsx"), "utf8");
    const bits = readFileSync(resolve(ROOT, "src/components/bits.jsx"), "utf8");
    expect(home).toContain("useTyped(roles");
    expect(home).toContain("role-reserve");
    expect(home).toContain("role-live");
    expect(bits).toContain('useState(() => words[0] || "")');
    expect(bits).toContain('(prefers-reduced-motion: reduce)');
  });
});

describe("Home", () => {
  it("H2 — CIP 386940 in the home kicker", () => {
    expect(HOME.kicker.en).toContain("386940");
    expect(HOME.kicker.es).toContain("386940");
  });
  it("H3 — radial chart removed; skill chips remain", () => {
    const source = readFileSync(resolve(ROOT, "src/screens/Home.jsx"), "utf8");
    expect(source).not.toMatch(/EChart|radar/i);
    expect(source).toContain("SKILLS.map");
  });
});

describe("Career", () => {
  it("C1 — chronological newest → oldest (oldest last)", () => {
    expect(CAREER_ORDER[CAREER_ORDER.length - 1]).toBe("acm");
    expect(CAREER_ORDER).toContain("lead");
  });
  it("C4 — flagship lead role flagged ACTIVE and in the professional group", () => {
    expect(CAREER_DETAILS.lead.status.en).toBe("ACTIVE");
    const pro = CAREER_GROUPS.find((g) => g.id === "professional");
    expect(pro.dids).toContain("lead");
  });
  it("C5 — grouped into professional / complementary / academic sub-sections", () => {
    expect(CAREER_GROUPS.map((g) => g.id)).toEqual(["professional", "complementary", "academic"]);
    const comp = CAREER_GROUPS.find((g) => g.id === "complementary").dids;
    const acad = CAREER_GROUPS.find((g) => g.id === "academic").dids;
    for (const d of ["dss", "devopsinstitute", "ailab"]) expect(comp, `complementary ${d}`).toContain(d);
    for (const d of ["nixvoid", "gamedevs", "acm"]) expect(acad, `academic ${d}`).toContain(d);
    // every group name is bilingual
    for (const g of CAREER_GROUPS) expect(g.name.en && g.name.es).toBeTruthy();
  });
  it("C2 — no education nodes in career", () => {
    for (const did of ["uni", "hanyang", "mit"]) {
      expect(CAREER_ORDER).not.toContain(did);
      expect(CAREER_DETAILS[did]).toBeUndefined();
    }
  });
  it("C3 — every career item is complete", () => {
    for (const did of CAREER_ORDER) {
      const d = CAREER_DETAILS[did];
      expect(d, did).toBeTruthy();
      expect(d.logo).toBeTruthy();
      expect(d.title).toBeTruthy();
      expect(d.org).toBeTruthy();
      expect(d.date).toBeTruthy();
      expect(Array.isArray(d.notes) && d.notes.length).toBeTruthy();
      expect(Array.isArray(d.keys) && d.keys.length).toBeTruthy();
    }
  });
});

describe("Speaking", () => {
  it("S1 — exactly 9 talks", () => {
    expect(TALKS).toHaveLength(9);
  });
  it("S2 — July 2026: nothing upcoming", () => {
    for (const t of TALKS) expect(t.up, t.slug).toBeFalsy();
  });
  it("S3 — newest first", () => {
    const years = TALKS.map((t) => parseInt(t.year, 10));
    const sorted = [...years].sort((a, b) => b - a);
    expect(years).toEqual(sorted);
  });
  it("S4 — every talk is complete", () => {
    for (const t of TALKS) {
      for (const k of ["slug", "code", "year", "flag", "where", "title", "desc"]) {
        expect(t[k], `${t.slug}.${k}`).toBeTruthy();
      }
    }
  });
  it("S5 — DevOps ambassador badge string present (en + es)", () => {
    expect(STRINGS.en.speaking.ambassador).toMatch(/AMBASSADOR/i);
    expect(STRINGS.es.speaking.ambassador).toMatch(/EMBAJADOR/i);
  });
  it("S6 — every talk is geocoded and Speaking uses the projected globe", () => {
    for (const talk of TALKS) {
      expect(Array.isArray(talk.geo) && talk.geo.length, `${talk.slug}.geo`).toBeTruthy();
      for (const point of talk.geo) {
        expect(typeof point.lat).toBe("number");
        expect(typeof point.lon).toBe("number");
        expect(point.label).toBeTruthy();
      }
    }
    const speaking = readFileSync(resolve(ROOT, "src/screens/Speaking.jsx"), "utf8");
    const globe = readFileSync(resolve(ROOT, "src/components/TourGlobe.jsx"), "utf8");
    const app = readFileSync(resolve(ROOT, "src/App.jsx"), "utf8");
    const world = JSON.parse(readFileSync(resolve(ROOT, "src/data/world-land.json"), "utf8"));
    expect(speaking).toContain("<TourGlobe");
    expect(speaking).toContain('lazy(() => import("../components/TourGlobe.jsx"))');
    expect(app).toContain('import("./components/TourGlobe.jsx")');
    expect(speaking).toContain("tour-console");
    expect(globe).toContain('from "d3-geo"');
    expect(globe).toContain("geoOrthographic");
    expect(globe).toContain("geoPath");
    expect(globe).toContain("WORLD_LAND");
    expect(globe).not.toContain("const CONTINENTS");
    expect(globe).toContain("requestAnimationFrame");
    expect(globe).toContain("onPointerMove");
    expect(globe).toContain("onSelect");
    expect(globe).toContain('role="button"');
    expect(world.type).toBe("FeatureCollection");
    expect(world.features.length).toBeGreaterThan(100);

    const innerSource = TALKS.find((talk) => talk.slug === "innersource-summit-2025");
    expect(innerSource.geo.map((point) => point.label)).toEqual(["BERLIN", "NEW YORK", "TOKYO"]);
    expect(innerSource.geo[1].lat).toBeCloseTo(40.7128, 4);
    expect(innerSource.geo[1].lon).toBeCloseTo(-74.006, 3);
    expect(JSON.stringify(innerSource.geo)).not.toMatch(/SAN FRANCISCO/i);
  });
  it("S7/S8 — dossier precedes globe; full photos, timeline and SVG flags are used", () => {
    const speaking = readFileSync(resolve(ROOT, "src/screens/Speaking.jsx"), "utf8");
    const css = readFileSync(resolve(ROOT, "src/styles/app.css"), "utf8");
    expect(speaking.indexOf('className="mission-panel')).toBeLessThan(speaking.indexOf('className="globe-panel'));
    expect(speaking).toContain("mission-reel");
    expect(speaking).toContain("mission-roster");
    expect(speaking).toContain("<CountryFlag");
    expect(speaking).not.toContain("event.flag");
    expect(speaking).not.toContain("talk.flag");
    expect(css).toMatch(/\.mission-photo-primary\s*\{[^}]*object-fit:\s*contain/s);
    expect(css).toMatch(/\.mission-panel\s*\{[^}]*grid-template-columns:/s);
    for (const talk of TALKS) expect(talk.countryCodes?.length, `${talk.slug}.countryCodes`).toBeGreaterThan(0);
  });
  it("S9 — exact venue focus and active lock-on are independently modeled", () => {
    const speaking = readFileSync(resolve(ROOT, "src/screens/Speaking.jsx"), "utf8");
    const globe = readFileSync(resolve(ROOT, "src/components/TourGlobe.jsx"), "utf8");
    const css = readFileSync(resolve(ROOT, "src/styles/app.css"), "utf8");
    expect(speaking).toContain("geoIndex");
    expect(speaking).toContain("activationKey");
    expect(globe).toContain("focusedGeo");
    expect(globe).toContain("marker-acquisition");
    expect(globe).toContain("active-location-fill");
    expect(css).toContain("--geo-active");
    expect(css).toContain("locationAcquire");
    expect(css).toMatch(/prefers-reduced-motion:[\s\S]*\.marker-acquisition/);
  });
});

describe("Projects", () => {
  it("P1/P2 — six complete projects drive six unique blueprint modes", () => {
    expect(PROJECTS).toHaveLength(6);
    for (const field of ["id", "name", "url"]) {
      expect(new Set(PROJECTS.map((project) => project[field])).size).toBe(PROJECTS.length);
    }
    expect(new Set(PROJECTS.map((project) => project.visual)).size).toBe(PROJECTS.length);
    for (const project of PROJECTS) {
      expect(project.id).toMatch(/^PRJ-\d{2}$/);
      expect(project.tag.en && project.tag.es).toBeTruthy();
      expect(project.desc.en && project.desc.es).toBeTruthy();
      expect(project.shortName.en && project.shortName.es).toBeTruthy();
      expect(project.tech?.length).toBeGreaterThanOrEqual(2);
      expect(project.visual).toBeTruthy();
      expect(new URL(project.url).hostname).toBe("github.com");
    }
  });
  it("P3/P4/P6 — source index is accessible, atomic and reduced-motion safe", () => {
    const source = readFileSync(resolve(ROOT, "src/screens/Projects.jsx"), "utf8");
    const css = readFileSync(resolve(ROOT, "src/styles/app.css"), "utf8");
    expect(source).toContain("project-showcase");
    expect(source).toContain("project-index");
    expect(source).toContain("project-visual");
    expect(source).toContain("ProjectBlueprint");
    expect(source).toContain('aria-pressed={i === idx}');
    expect(source).toContain('aria-controls="project-presentation"');
    expect(source).toContain('aria-live="polite"');
    expect(source).toContain("ArrowDown");
    expect(source).toContain("ArrowUp");
    expect(source).toContain("Home");
    expect(source).toContain("End");
    expect(source).toContain("stopPropagation");
    expect(source).not.toContain("project-topology");
    expect(source).not.toContain("project-inspector");
    expect(source).not.toContain("AnimatePresence");
    expect(source).not.toContain('mode="wait"');
    expect(source).not.toContain("fetch(");
    expect(css).toContain(".project-index-item:focus-visible");
    expect(css).toMatch(/prefers-reduced-motion:[\s\S]*\.blueprint-signal/);
  });
});

describe("Contact", () => {
  it("CT1/CT3 — restored direct links remain real and secure", () => {
    expect(LINKS.email).toBe(`mailto:${LINKS.emailText}`);
    expect(existsSync(resolve(ROOT, "public", LINKS.cv.replace(/^\//, "")))).toBe(true);
    for (const id of ["linkedin", "github", "credly"]) expect(new URL(LINKS[id]).protocol).toBe("https:");
    expect(Object.keys(STRINGS.en.contact).sort()).toEqual(Object.keys(STRINGS.es.contact).sort());
  });
  it("CT2/CT3 — classic Reveal composition replaces the rejected uplink", () => {
    const source = readFileSync(resolve(ROOT, "src/screens/Contact.jsx"), "utf8");
    expect(source).toContain("<Reveal");
    for (const className of ["contact-title", "contact-cta", "contact-net", "contact-meta"]) {
      expect(source).toContain(className);
    }
    expect(source).toContain('target="_blank"');
    expect(source).toContain('rel="noopener noreferrer"');
    expect(source).toContain("download");
    expect(source).not.toContain("contact-uplink");
    expect(source).not.toContain("contact-handshake");
    expect(source).not.toContain("contact-router");
    expect(source).not.toContain("CONTACT_CHANNELS");
    expect(source).not.toContain("<form");
  });
  it("CT4 — Contact owns a viewport-locked, height-aware route", () => {
    const app = readFileSync(resolve(ROOT, "src/App.jsx"), "utf8");
    const css = readFileSync(resolve(ROOT, "src/styles/app.css"), "utf8");
    expect(app).toContain("data-screen={id}");
    expect(css).toMatch(/\.screen\[data-screen="contact"\]\s*\{[^}]*overflow-y:\s*hidden/);
    expect(css).toContain('.screen[data-screen="contact"] .contact');
    expect(css).toMatch(/@media\s*\(max-height:\s*760px\)/);
  });
});

describe("Certifications", () => {
  it("CE6 — rendered by ECharts as a sunburst", () => {
    const source = readFileSync(resolve(ROOT, "src/screens/Certs.jsx"), "utf8");
    expect(source).toContain('import EChart from "../components/EChart.jsx"');
    expect(source).toContain('type: "sunburst"');
    expect(source).toContain("<EChart");
  });
  it("CE7 — overview and drill-down sunbursts use rounded sectors", () => {
    const source = readFileSync(resolve(ROOT, "src/screens/Certs.jsx"), "utf8");
    expect(source.match(/type: "sunburst"/g)).toHaveLength(2);
    expect(source.match(/borderRadius:/g)?.length).toBeGreaterThanOrEqual(2);
    expect(source).toContain("sun-logo");
  });
  it("CE8 — wheel center scrolls to a dedicated highlights section", () => {
    const source = readFileSync(resolve(ROOT, "src/screens/Certs.jsx"), "utf8");
    const practitioner = CERT_CATEGORIES.flatMap((category) => category.certs)
      .find((cert) => cert.name === "Platform Engineering Certified Practitioner");
    expect(source).toContain("FEATURED_CERTS");
    expect(source).toContain("cert.featured");
    expect(source).toContain("sun-feature-star"); // featured star kept on the wheel
    expect(source).toContain("featuredRef");
    expect(source).toContain("featured-certs");
    expect(source).toContain("scrollIntoView");
    expect(practitioner?.featured).toBe(true);
  });
  it("CE9 — drilled slices swap to a badge image only once its file loads", () => {
    const source = readFileSync(resolve(ROOT, "src/screens/Certs.jsx"), "utf8");
    // badges are probed off-DOM so a missing file never flashes a broken image
    expect(source).toContain("probeBadge");
    expect(source).toContain("/assets/certs/badges/");
    expect(source).toContain("badgeSrc");
    expect(source).toContain("sun-badge-img");
    // the native radial text label stays until a badge image has resolved
    expect(source).toContain("show: !badgeSrc[cert.name]");
    // Azure certs are wired up with badge slugs
    const azure = CERT_CATEGORIES.find((c) => c.id === "azure");
    expect(azure.certs.every((cert) => typeof cert.badge === "string")).toBe(true);
  });
  it("CE10 — legible drilled labels; robust level-change deploy", () => {
    const source = readFileSync(resolve(ROOT, "src/screens/Certs.jsx"), "utf8");
    // full-opacity slices + a dark halo keep the white radial label readable
    expect(source).toContain("opacity: 1");
    expect(source).toContain("textShadowColor");
    // drilled slices don't emphasise on hover (no dark-on-hover text, less redraw)
    expect(source).toContain("emphasis: { disabled: true }");
    // ECharts' own animation is off (its internal deploy could freeze on resize)…
    expect(source).toContain("animation: false");
    // …the level-change deploy is a robust container zoom+fade, skipping 1st mount
    expect(source).toContain("wrapRef.current.animate(");
    expect(source).toContain("deployedRef");
    // resetting badges keeps the same empty reference (no spurious wheel redraw)
    expect(source).toContain("Object.keys(prev).length ? {} : prev");
  });
  it("CE11 — category logos are asset-only (no built-in glyph fallback)", () => {
    const source = readFileSync(resolve(ROOT, "src/screens/Certs.jsx"), "utf8");
    // category (catIcon) logos must show ONLY the supplied asset, never a glyph,
    // so there is no classic-glyph-then-asset double load on the wheel/ledger
    expect(source).not.toContain("fallbackId={g.catIcon}");
    expect(source).not.toContain("fallbackId={cat.catIcon}");
    expect(source).toContain("base={`/assets/certs/${g.catIcon}`}");
    // per-row issuer glyphs still keep their fallback (they are designed as glyphs)
    expect(source).toContain("fallbackId={cert.icon}");
  });
  it("CE1 — total 62", () => {
    expect(CERT_TOTAL).toBe(62);
  });
  it("CE2 — 9 categories with color + catIcon", () => {
    expect(CERT_CATEGORIES).toHaveLength(9);
    for (const c of CERT_CATEGORIES) {
      expect(c.id).toBeTruthy();
      expect(c.name.en && c.name.es).toBeTruthy();
      expect(c.color).toMatch(/^#/);
      expect(c.catIcon).toBeTruthy();
    }
  });
  it("CE3 — every cert has name, issuer, year, icon", () => {
    for (const c of CERT_CATEGORIES) {
      for (const cert of c.certs) {
        expect(cert.name).toBeTruthy();
        expect(cert.issuer).toBeTruthy();
        expect(cert.year).toBeTruthy();
        expect(cert.icon).toBeTruthy();
      }
    }
  });
});

describe("Education", () => {
  it("E1 — 3 programs, each with a logo", () => {
    expect(EDUCATION).toHaveLength(3);
    for (const e of EDUCATION) expect(e.logo).toBeTruthy();
  });
});

describe("Assets", () => {
  it("A1 — ASSETS.md exists and lists the folders", () => {
    const p = resolve(ROOT, "public/assets/ASSETS.md");
    expect(existsSync(p)).toBe(true);
    const md = readFileSync(p, "utf8");
    for (const folder of ["bg/", "talks/", "certs/", "orgs/", "tech/"]) {
      expect(md, folder).toContain(folder);
    }
  });
  it("A2 — every screen is named in the bg checklist", () => {
    const md = readFileSync(resolve(ROOT, "public/assets/ASSETS.md"), "utf8");
    for (const s of SCREENS) {
      expect(md, `bg/${s}`).toMatch(new RegExp(`bg/${s}\\.(?:jpe?g|png|webp|svg)`));
    }
  });
  it("A3 — original and retouched profile portraits are both preserved", () => {
    expect(existsSync(resolve(ROOT, "public/assets/profile.png"))).toBe(true);
    expect(existsSync(resolve(ROOT, "public/assets/profile-retouched.jpg"))).toBe(true);
    expect(readFileSync(resolve(ROOT, "src/screens/Home.jsx"), "utf8")).toContain("/assets/profile-retouched.jpg");
  });
  it("A4 — AssetIcon probes off-DOM so a missing logo never flashes a broken image", () => {
    const icons = readFileSync(resolve(ROOT, "src/components/Icons.jsx"), "utf8");
    const assetIcon = icons.slice(icons.indexOf("export function AssetIcon"), icons.indexOf("export function Photo"));
    expect(assetIcon).toContain("new Image()");        // probe off-DOM
    expect(assetIcon).toContain("probe.onerror");       // advance on failure without mounting <img>
    expect(assetIcon).toContain("src={resolved}");      // only ever mount a confirmed URL
    expect(assetIcon).not.toContain("onError=");        // no broken-image-then-swap in the DOM
  });
});

describe("Agent contract", () => {
  it("D1 — contract docs exist", () => {
    for (const f of ["AGENTS.md", "CLAUDE.md", "CHANGELOG.md", "SPEC.md"]) {
      expect(existsSync(resolve(ROOT, f)), f).toBe(true);
    }
  });
  it("D2 — CLAUDE.md imports the shared AGENTS.md", () => {
    expect(readFileSync(resolve(ROOT, "CLAUDE.md"), "utf8")).toContain("@AGENTS.md");
  });
  it("D3 — Claude and Codex have the same page visual QA skill", () => {
    const rels = ["SKILL.md", "agents/openai.yaml", "scripts/capture-pages.sh"];
    for (const rel of rels) {
      const codex = resolve(ROOT, ".codex/skills/page-visual-qa", rel);
      const claude = resolve(ROOT, ".claude/skills/page-visual-qa", rel);
      expect(existsSync(codex), `Codex ${rel}`).toBe(true);
      expect(existsSync(claude), `Claude ${rel}`).toBe(true);
      expect(readFileSync(claude, "utf8"), `${rel} parity`).toBe(readFileSync(codex, "utf8"));
    }
    const script = readFileSync(resolve(ROOT, ".codex/skills/page-visual-qa/scripts/capture-pages.sh"), "utf8");
    for (const screen of SCREENS) expect(script).toContain(screen);
    expect(script).toContain("1440,900");
    expect(script).toContain("500,900");
    expect(script).toContain("for theme in light dark");
  });
});
