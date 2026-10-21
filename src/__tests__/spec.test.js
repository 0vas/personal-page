/* Executable acceptance spec — see SPEC.md. Run: npm test */
import { describe, it, expect } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import {
  TALKS, CERT_CATEGORIES, CERT_TOTAL, CAREER_ORDER, CAREER_GROUPS, CAREER_DETAILS,
  EDUCATION, PROFILE, PROJECTS, LINKS, SKILLS, READOUTS,
} from "../data/content.js";
import { STRINGS } from "../i18n.js";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const SCREENS = ["profile", "career", "speaking", "projects", "education", "certifications", "contact"];

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
  it("G6/G7 — non-blocking first-session intro without a Profile background request", () => {
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
    expect(html).not.toContain('/assets/bg/profile.');
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
  it("G13 — shared backdrop signals are finite, subtle and motion-safe", () => {
    const app = readFileSync(resolve(ROOT, "src/App.jsx"), "utf8");
    const css = readFileSync(resolve(ROOT, "src/styles/app.css"), "utf8");
    const beamRule = css.match(/\.bd-beam\s*\{([^}]*)\}/s)?.[1] ?? "";
    expect(app.match(/className="bd-beam b[12]"/g)).toHaveLength(2);
    expect(beamRule).toMatch(/\bheight:\s*clamp\(64px, 11vh, 104px\)/);
    expect(beamRule).toMatch(/\bwidth:\s*1px/);
    expect(beamRule).not.toMatch(/\bbottom:/);
    expect(beamRule).toMatch(/\banimation:\s*backdropSignal/);
    expect(css).toContain("@keyframes backdropSignal");
    expect(css).not.toMatch(/\.bd-beam\s*\{[^}]*top:\s*-5%[^}]*bottom:\s*-5%/s);
    expect(css).toMatch(/@media \(max-width: 760px\)[\s\S]*?\.bd-beam\.b2\s*\{[^}]*display:\s*none;/);
    expect(css).toMatch(/@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.bd-beam\s*\{[^}]*animation:\s*none\s*!important;[^}]*opacity:\s*\.08;/);
  });
  it("G14 — titled routes use a dedicated chrome-safe scroll boundary", () => {
    const app = readFileSync(resolve(ROOT, "src/App.jsx"), "utf8");
    const css = readFileSync(resolve(ROOT, "src/styles/app.css"), "utf8");
    expect(app).toContain('className={`chrome-top ${title ? "chrome-top-titled" : ""}`}');
    expect(app).toContain('className={`stage ${title ? "stage-titled" : ""}`}');
    expect(app).toContain('data-screen={id}');
    expect(css).toMatch(/\.chrome-top-titled\s*\{[^}]*padding-top:\s*24px;/s);
    expect(css).toMatch(/\.chrome-top-titled \.ct-left \.rule\s*\{[^}]*margin-bottom:\s*18px;/s);
    expect(css).toMatch(/\.stage\s*\{[^}]*--stage-top:\s*clamp\(120px, 19vh, 190px\);[^}]*padding:\s*var\(--stage-top\) 0 86px;/s);
    expect(css).toMatch(/\.stage-titled\s*\{[^}]*--stage-top:\s*clamp\(150px, 17vh, 166px\);/s);
    expect(css).toMatch(/\.project-command\s*\{[^}]*align-items:\s*start;/s);
    expect(css).toMatch(/\.tour-command\s*\{[^}]*align-items:\s*start;/s);
    expect(css).not.toMatch(/\.chrome-top\[data-screen="(?:contact|certifications)"\]\s*\{[^}]*padding-top:/s);
    expect(css).not.toMatch(/\.stage\[data-screen="(?:contact|certifications)"\]\s*\{[^}]*--stage-top:/s);
    expect(css).toMatch(/@media \(max-width: 720px\)[\s\S]*?\.stage\s*\{[^}]*--stage-top:\s*clamp\(96px, 15vh, 150px\);[^}]*\}[\s\S]*?\.stage-titled\s*\{[^}]*--stage-top:\s*clamp\(128px, 18vh, 156px\);/s);
    expect(css).toMatch(/\.screen\s*\{[^}]*overflow-y:\s*auto;/s);
    expect(css).toMatch(/\.screen\[data-screen="contact"\]\s*\{[^}]*overflow-y:\s*hidden;/s);
  });
  it("G15 — compact navigation keeps the active route fully visible", () => {
    const app = readFileSync(resolve(ROOT, "src/App.jsx"), "utf8");
    expect(app).toContain("navMenuRef");
    expect(app).toContain('aria-current={i === idx ? "page" : undefined}');
    expect(app).toContain("menu.scrollTo({ left: nextLeft");
    expect(app).toContain('(prefers-reduced-motion: reduce)');
    expect(app).not.toContain("scrollIntoView({ behavior");
  });
  it("G16 — the production domain is documented and declared as HTTPS-only", () => {
    const html = readFileSync(resolve(ROOT, "index.html"), "utf8");
    const readme = readFileSync(resolve(ROOT, "README.md"), "utf8");
    expect(html).toContain('<meta property="og:url" content="https://0vas.com">');
    expect(readme).toContain("certificate provisioning");
    expect(readme).toContain("**Enforce HTTPS**");
    expect(readme).toContain("curl -I http://0vas.com");
    expect(readme).toContain("openssl s_client -connect 0vas.com:443");
  });
  it("G9/G10/PF4 — atomic CSS navigation and no top-right statistics", () => {
    const app = readFileSync(resolve(ROOT, "src/App.jsx"), "utf8");
    const profile = readFileSync(resolve(ROOT, "src/screens/Profile.jsx"), "utf8");
    expect(app).toContain('className="screen screen-enter"');
    expect(app).not.toContain("<RouteSignal");        // decorative mid-page route line removed
    expect(app).not.toContain("route-transition");
    expect(app).not.toContain("<motion.section");
    expect(app).not.toContain("ct-stat-value");
    expect(profile).not.toContain("READOUTS");
    expect(profile).not.toContain("Counter");
  });
  it("PF5 — Profile skips image backdrop and uses the animated turtle ambient", () => {
    const app = readFileSync(resolve(ROOT, "src/App.jsx"), "utf8");
    const profile = readFileSync(resolve(ROOT, "src/screens/Profile.jsx"), "utf8");
    const turtle = readFileSync(resolve(ROOT, "src/components/ProfileTurtle.jsx"), "utf8");
    const css = readFileSync(resolve(ROOT, "src/styles/app.css"), "utf8");
    expect(app).toContain('screen !== "profile" && <SceneBg');       // no bg image on Profile
    expect(app).toContain("<ProfileTurtle");
    expect(profile).not.toContain("<Reveal");
    expect(profile).toContain('data-text="LOBATON"');
    // Prefers an owner illustration at /assets/turtle-home.*, else a code-native
    // line-art turtle (shell + flippers); frozen under reduced-motion.
    expect(turtle).toContain("/assets/turtle-home");
    expect(turtle).toContain("onError");
    expect(turtle).toContain("pt-shell");
    expect(turtle).toContain("pt-flap");
    expect(css).toContain(".bd-profile-turtle");
    expect(css).toContain(".pt-img");
    expect(css).toMatch(/@media \(prefers-reduced-motion: reduce\)[\s\S]*\.bd-profile-turtle/);
  });
  it("PF6 — Profile roles type from a complete first frame without layout shift", () => {
    const profile = readFileSync(resolve(ROOT, "src/screens/Profile.jsx"), "utf8");
    const bits = readFileSync(resolve(ROOT, "src/components/bits.jsx"), "utf8");
    expect(profile).toContain("useTyped(roles");
    expect(profile).toContain("role-reserve");
    expect(profile).toContain("role-live");
    expect(bits).toContain('useState(() => words[0] || "")');
    expect(bits).toContain('(prefers-reduced-motion: reduce)');
  });
  it("PF7 — Profile is canonical while #/home remains a compatibility alias", () => {
    const app = readFileSync(resolve(ROOT, "src/App.jsx"), "utf8");
    expect(app).toContain('const SCREEN_IDS = ["profile"');
    expect(app).toContain('const ROUTE_ALIASES = { home: "profile" }');
    expect(app).toContain("ROUTE_ALIASES[rawId] || rawId");
    expect(app).toContain('window.history.replaceState(null, "", "#/profile")');
    expect(app).toContain("profile: Profile");
  });
  it("PF8 — narrow Profile uses a full-width editorial portrait between role and lede", () => {
    const profile = readFileSync(resolve(ROOT, "src/screens/Profile.jsx"), "utf8");
    const css = readFileSync(resolve(ROOT, "src/styles/app.css"), "utf8");
    expect(profile).toContain('className="profile-hero"');
    expect(profile).toContain('className="profile-lede-block"');
    expect(profile).toContain('className="profile-photo"');
    expect(profile).toContain("/assets/profile-retouched.jpg");
    expect(profile).toContain('alt="Oscar Lobaton Salas"');
    expect(profile).toContain('fetchPriority="high"');
    expect(profile).toContain('className="profile-photo-channel dbar"');
    expect(profile).toContain('className="profile-photo-frame"');
    expect(profile).toContain("GITHUB // @0VAS");
    expect(profile).toContain("href={LINKS.github}");
    expect(profile).not.toContain('<span className="tag dbar"><span>OSCAR LOBATON SALAS</span></span>');
    expect(css).toContain(".profile-hero { display: contents; }");
    expect(css).toContain(".profile-photo-channel");
    expect(css).toMatch(/\.profile\s*\{[^}]*grid-template-columns:\s*minmax\(0,\s*1fr\);/);
    expect(css).toMatch(/\.profile-photo\s*\{[^}]*display:\s*block;[^}]*grid-column:\s*1\s*\/\s*-1;[^}]*grid-row:\s*4;[^}]*width:\s*100%;/);
    expect(css).toMatch(/\.profile-lede-block\s*\{[^}]*grid-column:\s*1\s*\/\s*-1;[^}]*grid-row:\s*5;/);
    expect(css).toMatch(/\.profile-cta-block\s*\{[^}]*grid-column:\s*1\s*\/\s*-1;[^}]*grid-row:\s*6;/);
    expect(css).toMatch(/\.profile-net-block\s*\{[^}]*grid-column:\s*1\s*\/\s*-1;[^}]*grid-row:\s*7;/);
    expect(css).toMatch(/\.profile-photo \.ph\s*\{[^}]*aspect-ratio:\s*8\s*\/\s*5;/);
    expect(css).not.toContain(".profile-photo { display: none; }");
  });
});

describe("Profile", () => {
  it("PF2 — CIP 386940 in the Profile kicker", () => {
    expect(PROFILE.kicker.en).toContain("386940");
    expect(PROFILE.kicker.es).toContain("386940");
  });
  it("PF3 — one minimal vanilla two-pane capability directory replaces facts and the skill-chip grid", () => {
    const profile = readFileSync(resolve(ROOT, "src/screens/Profile.jsx"), "utf8");
    const matrix = readFileSync(resolve(ROOT, "src/components/CapabilityMatrix.jsx"), "utf8");
    const wrapper = readFileSync(resolve(ROOT, "src/components/EChart.jsx"), "utf8");
    const data = readFileSync(resolve(ROOT, "src/data/content.js"), "utf8");
    const css = readFileSync(resolve(ROOT, "src/styles/app.css"), "utf8");
    expect(SKILLS).toHaveLength(6);
    expect(SKILLS.flatMap((group) => group.items)).toHaveLength(35);
    expect(profile).toContain("<CapabilityMatrix");
    expect(profile).not.toContain("FACTS");
    expect(profile).not.toContain("skgrid");
    expect(data).not.toContain("export const FACTS");
    expect(data).not.toContain("export const RADAR");
    // Capabilities is now plain HTML/CSS — the shared ECharts runtime no longer bundles the custom series.
    expect(wrapper).not.toContain("CustomChart");
    expect(wrapper).toContain("SunburstChart");
    expect(matrix).not.toContain("EChart");
    expect(matrix).not.toContain('type: "custom"');
    expect(matrix).not.toContain("renderItem");
    expect(matrix).not.toContain("chartColors");
    expect(matrix).not.toContain("AssetIcon");
    // Two panes: a domain roster (left) and the selected domain's technology chips (right).
    expect(matrix).toContain("SKILLS.map");
    expect(matrix).toContain("capability-panes");
    expect(matrix).toContain("capability-domain");
    expect(matrix).toContain("capability-detail");
    expect(matrix).toContain("capability-chips");
    expect(matrix).toContain("capability-chip");
    expect(matrix).toContain('role="listbox"');
    expect(matrix).toContain('role="option"');
    expect(matrix).toContain("aria-selected");
    expect(matrix).toContain("aria-activedescendant");
    expect(matrix).toContain('tabIndex={0}');
    for (const key of ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Home", "End"]) expect(matrix).toContain(key);
    expect(matrix).not.toContain("activeSkill");
    expect(matrix).not.toContain("capability-rail");
    expect(matrix).not.toContain("capability-readout");
    expect(matrix).not.toContain("capability-scan");
    expect(matrix).not.toContain("signalFill");
    expect(matrix).toContain('aria-live="polite"');
    expect(STRINGS.en.profile.matrixOverview).toBe("CAPABILITIES");
    expect(STRINGS.es.profile.matrixOverview).toBe("CAPACIDADES");
    expect(STRINGS.en.profile.matrixKicker).toBe("06 // 6 DOMAINS · 35 TECHNOLOGIES");
    expect(STRINGS.es.profile.matrixKicker).toBe("06 // 6 DOMINIOS · 35 TECNOLOGÍAS");
    expect(css).toContain(".capability-matrix");
    expect(css).toContain(".capability-panes");
    expect(css).toContain(".capability-domain");
    expect(css).toContain(".capability-chip");
    expect(css).not.toContain(".capability-chart-shell");
    expect(css).not.toContain(".capability-rail");
    expect(css).not.toContain(".capability-readout");
    expect(css).not.toContain(".capability-scan");
    // Mobile stacks the two panes; the outer profile grid still collapses at 980px.
    expect(css).toMatch(/@media \(max-width: 720px\)[\s\S]*\.capability-panes \{ grid-template-columns: 1fr/);
    expect(css).toMatch(/@media \(max-width: 980px\)[\s\S]*\.profile-file/);
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
  it("S1 — exactly 11 talks, with the two newest 2026 appearances first", () => {
    expect(TALKS).toHaveLength(11);
    expect(TALKS[0]).toMatchObject({
      slug: "f13-code-summit-2026",
      year: "2026",
      title: "Abstracción en Platform Engineering",
      url: "https://www.f13.pe/",
    });
    expect(TALKS[0].countryCodes).toEqual(["PE"]);
    expect(TALKS[1]).toMatchObject({
      slug: "github-latam-quack-2026",
      year: "2026",
      title: "Jueves de Quack: InnerSource con Credicorp",
      url: "https://www.youtube.com/watch?v=aWz3BWj3d00",
      broadcast: true,
    });
    expect(TALKS[1].countryCodes).toEqual(["GLOBAL"]);
    expect(READOUTS.find((item) => item.label.en === "CONFERENCE TALKS").value).toBe(11);
    expect(STRINGS.en.speaking.meta[0]).toBe("11 TALKS");
    expect(STRINGS.es.speaking.meta[0]).toBe("11 CHARLAS");
    expect(STRINGS.en.speaking.meta[3]).toMatch(/2 OFFICIAL GITHUB BROADCASTS/);
    expect(STRINGS.es.speaking.meta[3]).toMatch(/2 TRANSMISIONES OFICIALES DE GITHUB/);
    expect(STRINGS.en.stats.speaking[1]).toBe("11");
    expect(STRINGS.es.stats.speaking[1]).toBe("11");
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
  it("S10 — Speaking has a bilingual 'view slides' button to the slides subdomain", () => {
    const speaking = readFileSync(resolve(ROOT, "src/screens/Speaking.jsx"), "utf8");
    expect(LINKS.slides).toBe("https://slides.0vas.com");
    expect(speaking).toContain("LINKS.slides");
    expect(speaking).toContain('className="slides-link"');
    expect(speaking).toContain('target="_blank"');
    expect(speaking).toContain("S.viewSlides");
    expect(STRINGS.en.speaking.viewSlides).toBeTruthy();
    expect(STRINGS.es.speaking.viewSlides).toBeTruthy();
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
    expect(speaking).toContain("padStart(2, \"0\")");
    expect(speaking).toContain("roster.scrollTop");
    expect(css).toMatch(/\.tour-timeline\s*\{[^}]*overflow-y:\s*auto/s);
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
    expect(globe).toContain("const gap = point.active ? 30 : 16");
    expect(globe).toContain("textAnchor={placeLeft ? \"start\" : \"end\"}");
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
    expect(css).toMatch(/@media\s*\(max-height:\s*840px\)/);
    expect(css).toMatch(/@media \(max-height: 840px\)[\s\S]*?\.screen\[data-screen="contact"\] \.contact-meta\s*\{[^}]*margin-top:\s*8px;[^}]*padding-top:\s*10px;/s);
    expect(css).toMatch(/@media \(max-width: 720px\) and \(max-height: 840px\)[\s\S]*?\.screen\[data-screen="contact"\] \.contact-cta\s*\{[^}]*grid-template-columns:\s*minmax\(0, 1\.35fr\) minmax\(0, \.85fr\);/s);
  });
});

describe("Certifications", () => {
  it("CE5/CE6 — one stable ECharts sunburst owns native drill-down", () => {
    const source = readFileSync(resolve(ROOT, "src/screens/Certs.jsx"), "utf8");
    expect(source).toContain('import EChart from "../components/EChart.jsx"');
    expect(source.match(/type: "sunburst"/g)).toHaveLength(1);
    expect(source).toContain('nodeClick: "rootToNode"');
    expect(source).toContain("SERIES_ID");
    expect(source).toContain("<EChart");
  });
  it("CE7 — the stable sunburst follows the reference's spaced radial hierarchy", () => {
    const source = readFileSync(resolve(ROOT, "src/screens/Certs.jsx"), "utf8");
    expect(source.match(/borderRadius:/g)?.length).toBeGreaterThanOrEqual(2);
    expect(source).toContain("ATLAS_GEOMETRY");
    expect(source).toContain("CATEGORY_RING");
    expect(source).toContain("CERT_RING");
    expect(source).toMatch(/r0:\s*CATEGORY_RING\.r0/);
    expect(source).toMatch(/r:\s*CATEGORY_RING\.r/);
    expect(source).toMatch(/r0:\s*CERT_RING\.r0/);
    expect(source).toMatch(/r:\s*CERT_RING\.r/);
    expect(source).toContain("wrapCategoryLabel");
    expect(source).toContain("categoryLabelRadius");
    expect(source).toContain("sun-category-name");
    expect(source).toContain('"--label-angle"');
    expect(source).toContain("credentialLabelDistance");
    expect(source).toContain("sort: null");
    expect(source).toContain("sun-logo");
    expect(source).toMatch(/regular:\s*\{[\s\S]*?category:\s*\{\s*r0:\s*"16%",\s*r:\s*"60%"\s*\}[\s\S]*?credential:\s*\{\s*r0:\s*"62%",\s*r:\s*"76%"\s*\}[\s\S]*?faceRatio:\s*0\.76[\s\S]*?labelFrameRatio:\s*0\.90/);
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
  it("CE9 — focused slices retain both complete names and a resolved icon", () => {
    const source = readFileSync(resolve(ROOT, "src/screens/Certs.jsx"), "utf8");
    // badges are probed off-DOM so a missing file never flashes a broken image
    expect(source).toContain("probeBadge");
    expect(source).toContain("BADGE_PROBE_CACHE");
    expect(source).toContain("/assets/certs/badges/");
    expect(source).toContain("badgeSrc");
    expect(source).toContain("sun-badge-img");
    expect(source).toContain('position: "outside"');
    expect(source).toContain("sun-slice-icon");
    expect(source).toContain("fallbackId={cert.icon}");
    expect(source).not.toContain("show: !badgeSrc[cert.name]");
    // Azure certs are wired up with badge slugs
    const azure = CERT_CATEGORIES.find((c) => c.id === "azure");
    expect(azure.certs.every((cert) => typeof cert.badge === "string")).toBe(true);
  });
  it("CE10 — native ECharts expansion animates unless motion is reduced", () => {
    const source = readFileSync(resolve(ROOT, "src/screens/Certs.jsx"), "utf8");
    const wrapper = readFileSync(resolve(ROOT, "src/components/EChart.jsx"), "utf8");
    expect(source).toContain("useReducedMotion");
    expect(source).toContain('animationType: "expansion"');
    expect(source).toContain("animationDurationUpdate");
    expect(source).toContain("animation: !reduceMotion");
    expect(source).not.toContain("wrapRef.current.animate(");
    expect(source).toMatch(
      /useEffect\(\(\) => \{\s*resetAtlasState\(\);\s*\}, \[theme, lang, compact, reduceMotion, resetAtlasState\]\);/,
    );
    expect(wrapper).toContain("rootToTop");
    expect(wrapper).toContain("sunburstRootToNode");
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
  it("CE12/CE13 — contextual registry, accessible controls and theme-safe imagery", () => {
    const source = readFileSync(resolve(ROOT, "src/screens/Certs.jsx"), "utf8");
    const css = readFileSync(resolve(ROOT, "src/styles/app.css"), "utf8");
    expect(source).toContain("visibleCategories");
    expect(source).toContain("selectedCert");
    expect(source).toContain("categoryIconRadius");
    expect(source).toContain("credentialIconRadius");
    expect(source).not.toContain("CATEGORY_LOGO_RADIUS");
    expect(source).not.toContain("DRILL_ICON_RADIUS");
    expect(source).not.toContain("LOGO_CLEARANCE");
    expect(source).not.toContain("LOGO_ORBIT_GAP");
    expect(source).not.toContain("sun-logo-displaced");
    expect(source).not.toContain("displaced:");
    expect(source).not.toContain("sun-logo-count");
    expect(source).not.toContain("cert-orbit-readout");
    expect(source).not.toContain("setHoveredCert");
    expect(css).not.toContain(".cert-orbit-readout");
    expect(source).toContain('aria-pressed={drill === g.id}');
    expect(source).toContain('<button className="lg-head"');
    expect(css).toMatch(/\.sun-logo\s*\{[^}]*width:\s*36px;[^}]*height:\s*36px;/);
    expect(css).toMatch(/\.sun-slice-icon\s*\{[^}]*width:\s*36px;[^}]*height:\s*36px;/);
    expect(css).toMatch(/\.sun-badge-img,[\s\S]*?\.sun-slice-icon img,[\s\S]*?\.sun-slice-icon svg\s*\{[^}]*width:\s*22px;[^}]*height:\s*22px;/);
    expect(css).toMatch(/\.sun-logo img[^{]*\{[^}]*width:\s*22px;[^}]*height:\s*22px;/);
    expect(css).toContain('[data-theme="dark"] .sun-logo');
    expect(css).toMatch(/@media \(max-width: 720px\)[\s\S]*?\.sun-wrap\s*\{[^}]*overflow:\s*visible;/);
    expect(source).toContain('name.replace(/-/g, "- ")');
    const categoryOrbits = [...source.matchAll(
      /(regular|compact):\s*\{[\s\S]*?categoryLabelRadius:\s*([\d.]+),[\s\S]*?categoryIconRadius:\s*([\d.]+)/g,
    )];
    expect(categoryOrbits.map((match) => match[1])).toEqual(["regular", "compact"]);
    for (const [, mode, labelRadius, iconRadius] of categoryOrbits) {
      expect(Number(iconRadius) - Number(labelRadius), `${mode} category orbit clearance`).toBeGreaterThanOrEqual(0.23);
    }
  });
  it("CE14 — desktop gives the atlas the dominant column without changing the mobile stack", () => {
    const source = readFileSync(resolve(ROOT, "src/screens/Certs.jsx"), "utf8");
    const app = readFileSync(resolve(ROOT, "src/App.jsx"), "utf8");
    const css = readFileSync(resolve(ROOT, "src/styles/app.css"), "utf8");
    const certCss = css.slice(
      css.indexOf("/* ============ CERTIFICATIONS ============ */"),
      css.indexOf("/* ============ CONTACT ============ */"),
    );
    expect(certCss).toMatch(/\.certs\s*\{[^}]*grid-template-columns:\s*minmax\(0, 700px\) clamp\(340px, 26vw, 380px\);/);
    expect(certCss).toMatch(/\.certs\s*\{[^}]*gap:\s*clamp\(10px, 1vw, 14px\);/);
    expect(certCss).toMatch(/\.certs\s*\{[^}]*justify-content:\s*center;/);
    expect(app).toContain('<header className={`chrome-top ${title ? "chrome-top-titled" : ""}`} data-screen={id}>');
    expect(certCss).toMatch(/\.stage\[data-screen="certifications"\]\s*\{[^}]*--cert-field-h:\s*clamp\(560px, calc\(100svh - var\(--stage-top\) - 166px\), 650px\);[^}]*padding-bottom:\s*73px;/);
    expect(certCss).toMatch(/\.sun-wrap\s*\{[^}]*height:\s*var\(--cert-field-h\);/);
    expect(certCss).toMatch(/@media \(min-width: 1081px\) and \(max-height: 1000px\)[\s\S]*?\.certs\s*\{[^}]*grid-template-columns:\s*minmax\(0, 680px\) clamp\(340px, 26vw, 380px\);[^}]*gap:\s*14px;/);
    expect(source).toContain('"--atlas-size"');
    expect(certCss).toContain("--atlas-center-y");
    expect(certCss).toMatch(/@media \(max-width: 1120px\)[\s\S]*?\.certs\s*\{[^}]*grid-template-columns:\s*minmax\(0, 1fr\) clamp\(335px, 32vw, 350px\);[^}]*gap:\s*12px;/);
    expect(certCss).toMatch(/@media \(max-width: 1080px\)[\s\S]*?\.certs\s*\{[^}]*grid-template-columns:\s*minmax\(0, 1fr\);/);
  });
  it("CE15 — native and explicit roll-up paths restore the complete overview", () => {
    const source = readFileSync(resolve(ROOT, "src/screens/Certs.jsx"), "utf8");
    const wrapper = readFileSync(resolve(ROOT, "src/components/EChart.jsx"), "utf8");
    const reset = source.slice(
      source.indexOf("const resetAtlasState"),
      source.indexOf("const cat ="),
    );
    expect(source).toContain("resetAtlasState");
    expect(source).toContain('sunburstroottonode');
    expect(source).toContain('direction === "rollUp"');
    expect(reset).toContain("clearTimeout(selectionTimer.current)");
    expect(reset).toContain("setDrill(null)");
    expect(reset).toContain("setSelectedCert(null)");
    expect(reset).toContain("setBadgeSrc({})");
    expect(source).toMatch(/const back = useCallback\([\s\S]*?resetAtlasState\(\)[\s\S]*?rootToTop\(SERIES_ID\)/);
    expect(wrapper).toContain("sunburstRootToNode");
  });
  it("CE16 — one aligned isometric plane supplies responsive theme-safe neon depth", () => {
    const source = readFileSync(resolve(ROOT, "src/screens/Certs.jsx"), "utf8");
    const css = readFileSync(resolve(ROOT, "src/styles/app.css"), "utf8");
    expect(source).toContain("sun-iso-deck");
    expect(source).toContain("sun-plane");
    expect(source).toContain('"--atlas-signal"');
    expect(css).toMatch(/\.sun-plane\s*\{[^}]*perspective\([^}]*rotateX\(/);
    expect(css).toMatch(/\.sun-iso-deck\s*\{[^}]*box-shadow:/);
    expect(css).toContain("certNeonBreathe");
    expect(css).toMatch(/@media \(max-width: 720px\)[\s\S]*?\.sun-plane\s*\{[^}]*rotateX\(/);
    expect(css).toMatch(/@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.sun-iso-deck/);
  });
  it("CE17 — focused radial names keep a proportional in-viewport safety lane", () => {
    const source = readFileSync(resolve(ROOT, "src/screens/Certs.jsx"), "utf8");
    const modes = [...source.matchAll(
      /(regular|compact):\s*\{[\s\S]*?centerY:\s*([\d.]+),[\s\S]*?credential:\s*\{[^}]*\br:\s*"([\d.]+)%"/g,
    )];
    expect(modes.map((match) => match[1])).toEqual(["regular", "compact"]);
    for (const [, mode, centerValue, radiusValue] of modes) {
      const center = Number(centerValue);
      const outerRadius = Number(radiusValue) / 200;
      const safeLane = Math.min(center - outerRadius, 1 - center - outerRadius);
      expect(safeLane, `${mode} radial-label lane`).toBeGreaterThanOrEqual(0.08);
    }
    expect(source).toContain('center: ["50%", `${atlasGeometry.centerY * 100}%`]');
    expect(source).toContain('"--atlas-center-y"');
    expect(source).toContain("credentialIconRadius");
  });
  it("CE18 — featured credentials use one minimal signal rail and one live plate", () => {
    const source = readFileSync(resolve(ROOT, "src/screens/Certs.jsx"), "utf8");
    const app = readFileSync(resolve(ROOT, "src/App.jsx"), "utf8");
    const css = readFileSync(resolve(ROOT, "src/styles/app.css"), "utf8");
    const featured = CERT_CATEGORIES.flatMap((category) => category.certs)
      .filter((cert) => cert.featured || ["EXPERT", "LEADERSHIP"].includes(cert.level));
    expect(featured).toHaveLength(5);
    expect(featured.find((cert) => cert.name === "Platform Engineering Certified Practitioner")?.featured).toBe(true);
    expect(source).toContain("FEATURED_DEFAULT_INDEX");
    expect(source).toContain("featured-showcase");
    expect(source).toContain("featured-signal-rail");
    expect(source).toContain("featured-track-indicator");
    expect(source).toContain("featured-tab");
    expect(source).toContain("featured-plate");
    expect(source).toContain('role="tablist"');
    expect(source).toContain('role="tab"');
    expect(source).toContain("aria-selected");
    expect(source).toContain('role="tabpanel"');
    expect(source).toContain("featured-locate");
    expect(source).toContain('event.key === "ArrowRight"');
    expect(source).toContain('event.key === "Home"');
    expect(source).toContain('event.key === "End"');
    expect(source).toContain("event.stopPropagation()");
    expect(app).toContain("e.defaultPrevented");
    expect(app).toContain('button, [role="tab"]');
    expect(source).not.toContain("onMouseEnter");
    for (const rejected of [
      "FEATURED_NODE_POSITIONS", "featured-constellation", "featured-deck",
      "featured-route", "featured-core", "featured-node", "featured-dossier",
      "featured-acquire", "featured-grid", "featured-card",
    ]) {
      expect(source).not.toContain(rejected);
      expect(css).not.toContain(`.${rejected}`);
    }
    expect(css).toContain(".featured-showcase");
    expect(css).toMatch(/\.featured-tabs\s*\{[^}]*grid-template-columns:\s*repeat\(5, minmax\(0, 1fr\)\);/);
    expect(css).toMatch(/\.featured-tab\s*\{[^}]*min-height:\s*78px;/);
    expect(css).toMatch(/\.featured-plate\s*\{[^}]*grid-template-columns:\s*56px minmax\(0, 1fr\) auto;/);
    expect(css).toMatch(/@media \(max-width: 720px\)[\s\S]*?\.featured-plate\s*\{[^}]*grid-template-columns:\s*48px minmax\(0, 1fr\);/);
    expect(css).toMatch(/@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.featured-track-indicator,[\s\S]*?\.featured-plate-copy\s*\{[^}]*animation:\s*none\s*!important;/);
  });
  it("CE19 — certification tooltips stay above the wheel in a lateral safe zone", () => {
    const source = readFileSync(resolve(ROOT, "src/screens/Certs.jsx"), "utf8");
    const css = readFileSync(resolve(ROOT, "src/styles/app.css"), "utf8");
    expect(source).toContain("function placeCertificationTooltip");
    expect(source).toContain('renderMode: "html"');
    expect(source).toContain('appendTo: "body"');
    expect(source).toContain('className: "cert-atlas-tooltip"');
    expect(source).toContain("position: placeCertificationTooltip");
    expect(source).toContain("size.contentSize");
    expect(source).toContain("size.viewSize");
    expect(css).toMatch(/\.cert-atlas-tooltip\s*\{[^}]*z-index:\s*80\s*!important;[^}]*pointer-events:\s*none\s*!important;/s);
  });
  it("CE20 — registry geometry is invariant across overview and category filters", () => {
    const source = readFileSync(resolve(ROOT, "src/screens/Certs.jsx"), "utf8");
    const css = readFileSync(resolve(ROOT, "src/styles/app.css"), "utf8");
    const certCss = css.slice(
      css.indexOf("/* ============ CERTIFICATIONS ============ */"),
      css.indexOf("/* ============ CONTACT ============ */"),
    );
    expect(source).toContain('className="cert-registry-action-slot"');
    expect(source).toContain("S.registryHint");
    expect(certCss).toMatch(/\.cert-registry-wrap\s*\{[^}]*height:\s*var\(--cert-field-h\);[^}]*display:\s*grid;[^}]*grid-template-rows:\s*112px minmax\(0, 1fr\);/);
    expect(certCss).toMatch(/\.cert-registry-head\s*\{[^}]*height:\s*112px;/);
    expect(certCss).toMatch(/\.ledger\s*\{[^}]*height:\s*auto;[^}]*min-height:\s*0;[^}]*max-height:\s*none;[^}]*scrollbar-gutter:\s*stable;/);
    expect(certCss).not.toMatch(/@media \(max-width: 1080px\)[\s\S]*?\.ledger\s*\{[^}]*height:\s*auto;[^}]*max-height:/);
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
  it("E2 — UNI highlights the Tesis con Impacto faculty prize", () => {
    const uni = EDUCATION.find((item) => item.logo === "uni");
    expect(uni.award.en).toMatch(/Tesis con Impacto/i);
    expect(uni.award.en).toMatch(/faculty/i);
    expect(uni.award.en).toMatch(/Top 4/i);
    expect(uni.award.es).toMatch(/Tesis con Impacto/i);
    expect(uni.award.es).toMatch(/facultad/i);
    expect(uni.award.es).toMatch(/Top 4/i);
    const education = readFileSync(resolve(ROOT, "src/screens/Education.jsx"), "utf8");
    const css = readFileSync(resolve(ROOT, "src/styles/app.css"), "utf8");
    expect(education).toContain('className="edu-award"');
    expect(css).toMatch(/\.edu-award\s*\{[^}]*color:\s*var\(--gold\)/s);
  });
});

describe("Assets", () => {
  it("A1 — ASSETS.md exists and lists the folders", () => {
    const p = resolve(ROOT, "public/assets/ASSETS.md");
    expect(existsSync(p)).toBe(true);
    const md = readFileSync(p, "utf8");
    for (const folder of ["bg/", "talks/", "certs/", "orgs/", "tech/", "brands/"]) {
      expect(md, folder).toContain(folder);
    }
  });
  it("A2 — every image-backed screen is named in the bg checklist", () => {
    const md = readFileSync(resolve(ROOT, "public/assets/ASSETS.md"), "utf8");
    for (const s of SCREENS.slice(1)) {
      expect(md, `bg/${s}`).toMatch(new RegExp(`bg/${s}\\.(?:jpe?g|png|webp|svg)`));
    }
  });
  it("A3 — original and retouched profile portraits are both preserved", () => {
    expect(existsSync(resolve(ROOT, "public/assets/profile.png"))).toBe(true);
    expect(existsSync(resolve(ROOT, "public/assets/profile-retouched.jpg"))).toBe(true);
    expect(readFileSync(resolve(ROOT, "src/screens/Profile.jsx"), "utf8")).toContain("/assets/profile-retouched.jpg");
  });
  it("A4 — AssetIcon probes off-DOM so a missing logo never flashes a broken image", () => {
    const icons = readFileSync(resolve(ROOT, "src/components/Icons.jsx"), "utf8");
    const assetIcon = icons.slice(icons.indexOf("export function AssetIcon"), icons.indexOf("export function Photo"));
    expect(assetIcon).toContain("new Image()");        // probe off-DOM
    expect(assetIcon).toContain("probe.onerror");       // advance on failure without mounting <img>
    expect(assetIcon).toContain("src={resolved}");      // only ever mount a confirmed URL
    expect(assetIcon).not.toContain("onError=");        // no broken-image-then-swap in the DOM
    expect(icons).toContain("ASSET_PROBE_CACHE");
    expect(assetIcon).toContain("resolveAssetCandidates");
  });
  it("A5 — certification asset checklist covers every referenced logo and badge", () => {
    const md = readFileSync(resolve(ROOT, "public/assets/ASSETS.md"), "utf8");
    const logoSlugs = new Set(CERT_CATEGORIES.flatMap((category) => [
      category.catIcon,
      ...category.certs.map((cert) => cert.icon),
    ]));
    for (const slug of logoSlugs) expect(md).toContain(`certs/${slug}.svg`);
    for (const badge of CERT_CATEGORIES.flatMap((category) => category.certs.map((cert) => cert.badge).filter(Boolean))) {
      expect(md).toContain(`certs/badges/${badge}.png`);
    }
    expect(md).toContain("theme-safe");
  });
  it("A6 — favicon is the owner's transparent geometric violet turtle (PNG)", () => {
    const html = readFileSync(resolve(ROOT, "index.html"), "utf8");
    const pngPath = resolve(ROOT, "public/assets/favicon.png");
    expect(existsSync(pngPath)).toBe(true);
    expect(html).toContain('<link rel="icon" type="image/png" sizes="any" href="/assets/favicon.png?v=turtle-geo2">');

    const buf = readFileSync(pngPath);
    expect(buf.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a"); // valid PNG
    expect(buf[25]).toBe(6); // RGBA — transparent, so the tab colour shows through
  });
  it("A7 — the owner-supplied Credly mark is reused only on Credly verification links", () => {
    const asset = resolve(ROOT, "public/assets/brands/credly.png");
    expect(existsSync(asset)).toBe(true);
    const buf = readFileSync(asset);
    expect(buf.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
    expect(buf[25]).toBe(6);

    for (const screen of ["Profile", "Contact", "Certs"]) {
      const source = readFileSync(resolve(ROOT, `src/screens/${screen}.jsx`), "utf8");
      expect(source).toContain('base="/assets/brands/credly"');
      expect(source).toContain('fallbackId="credly"');
      expect(source).toMatch(/>\s*Credly/);
    }

    const certs = readFileSync(resolve(ROOT, "src/screens/Certs.jsx"), "utf8");
    expect(certs).not.toContain("/assets/certs/credly");
  });
  it("A8 — ambient music: opt-in play/pause beside OPTIONS, volume + credit in the menu", () => {
    const app = readFileSync(resolve(ROOT, "src/App.jsx"), "utf8");
    const hook = readFileSync(resolve(ROOT, "src/hooks/useMusic.js"), "utf8");
    const css = readFileSync(resolve(ROOT, "src/styles/app.css"), "utf8");
    // <audio> is lifted to App so it stays mounted (keeps playing) when the dropdown closes.
    expect(app).toContain("useMusic(");
    expect(app).toContain("<audio");
    expect(app).toContain("loop");
    expect(app).toContain('preload="none"');
    // Play/pause is a button beside OPTIONS; volume + the credit "i" live in the dropdown.
    expect(app).toContain("music={music}");
    expect(app).toContain("music-toggle");   // standalone play/pause
    expect(app).toContain("music.setVolume"); // volume control in the dropdown
    expect(app).toContain("opt-info");        // credit "i" toggle
    // Hook: probes owner audio, hidden if absent, never autoplays, remembers pref + volume.
    expect(hook).toContain("/assets/ambient");
    expect(hook).toContain("Boolean(src)");
    expect(hook).not.toMatch(/autoplay/i);
    expect(hook).toContain("localStorage");
    expect(hook).toContain("setVolume");
    expect(css).toContain(".music-toggle");
    expect(css).toContain(".sp-vol");
    expect(css).toContain(".opt-info");
    for (const key of ["musicPlay", "musicPause", "optMusic", "musicInfo"]) {
      expect(STRINGS.en[key], `en.${key}`).toBeTruthy();
      expect(STRINGS.es[key], `es.${key}`).toBeTruthy();
    }
    // The bundled FiftySounds track ("Arcano") requires attribution. If the audio
    // ships, the credit + source link must ship (Contact footer + the dropdown "i").
    if (existsSync(resolve(ROOT, "public/assets/ambient.mp3"))) {
      const contact = readFileSync(resolve(ROOT, "src/screens/Contact.jsx"), "utf8");
      expect(contact).toContain("FiftySounds");
      expect(app).toContain("FiftySounds");
      expect(LINKS.music).toContain("fiftysounds.com");
      expect(STRINGS.en.contact.musicBy).toBeTruthy();
      expect(STRINGS.es.contact.musicBy).toBeTruthy();
    }
  });
  it("A9 — the owner-supplied LinkedIn mark is used beside LinkedIn links", () => {
    const asset = resolve(ROOT, "public/assets/brands/linkedin.png");
    expect(existsSync(asset)).toBe(true);
    const buf = readFileSync(asset);
    expect(buf.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
    expect(buf[25]).toBe(6); // RGBA — transparent outside the blue circle

    for (const screen of ["Profile", "Contact", "Certs"]) {
      const source = readFileSync(resolve(ROOT, `src/screens/${screen}.jsx`), "utf8");
      expect(source, screen).toContain('base="/assets/brands/linkedin"');
      expect(source, screen).toContain('fallbackId="linkedin"');
    }
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
