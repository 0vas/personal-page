# AGENTS.md — 0VAS personal page

Shared contract for **any** coding agent (Claude Code, Codex, Cursor, …).
Read this first, then `SPEC.md` (acceptance criteria) and `CHANGELOG.md` (history).
`CLAUDE.md` just imports this file so Claude Code and Codex behave identically.

> Golden rule: **every change must keep `npm test` green and honor the design
> decisions below.** When you change behavior, update `SPEC.md` (+ its test) and
> add a `CHANGELOG.md` entry in the same iteration.

## 0. Always document (non-negotiable)

**Every interaction that changes the product is documented in the same turn — no
exceptions, even for "small" tweaks.** Before you call a task done:

1. **`CHANGELOG.md`** — add/adjust an entry under `[Unreleased]` (grouped
   `Added / Changed / Fixed / Removed`) describing the *net* behaviour and the
   *why*. If a later change supersedes an earlier `[Unreleased]` entry, reconcile
   it so the log never contradicts the shipped code.
2. **`SPEC.md` (+ its test in `src/__tests__/spec.test.js`)** — if behaviour or a
   design decision changed, update the criterion and its assertion.
3. **`AGENTS.md` §7** — if a settled design decision changed (owner asked), update it.
4. Owner-facing knobs (e.g. required assets) → note them in `public/assets/ASSETS.md`.

A change is not "done" until the docs above reflect it and `npm test` is green.
This section itself is the standing rule that makes documentation automatic.

---

## 1. What this is

Personal portfolio of **Oscar Lobaton Salas** — Platform Product Lead @ Credicorp,
DevSecOps architect, DevOps Institute ambassador, international speaker.
Deploys to **0vas.com** (GitHub Pages).

**Aesthetic:** the in-game menu system of *Detroit: Become Human* — washed light
background, thin tracked geometric type, parallelogram/triangle motifs, corner
brackets, diamond nodes — rendered in **violet**. Formal, professional content
inside a game-grade UI. It is NOT retro/pixel, and NOT a generic dark dashboard
(both were explicitly rejected — see §7).

## 2. Stack & commands

- **React 18 + Vite 5**, **Framer Motion** (animation), **Apache ECharts** (SVG
  certifications), **D3 Geo** (orthographic Speaking map), **Vitest** (tests).
- No CSS framework: hand-written CSS in `src/styles/`.

```bash
npm install
npm run dev        # http://localhost:5173  (use this to develop)
npm run build      # → dist/
npm run preview    # serve the production build
npm test           # run the acceptance suite (must pass)
npm run test:watch # TDD loop
```

## 3. Project structure

```
index.html                 # sets <html data-theme> + reads ?theme/?lang before paint
src/
  main.jsx                 # React entry
  App.jsx                  # hash router (#/career…), Settings dropdown, Backdrop, Boot, ←/→ keys
  i18n.js                  # STRINGS (UI copy en/es), L(value, lang), detectLang()
  data/content.js          # ALL content. Translatable fields are { en, es }
  data/world-land.json     # bundled Natural Earth 1:110m land for Speaking
  theme-colors.js          # JS mirror of CSS tokens, for ECharts options
  components/
    Icons.jsx              # <Icon id> (built-in glyphs) + <AssetIcon src fallbackId> (image w/ fallback)
    EChart.jsx             # thin ECharts wrapper (SVG renderer, resize-aware)
    TourGlobe.jsx          # lazy orthographic map + exact venue interaction
    bits.jsx               # <Reveal>, useTyped, <Counter>, <Micro>
  screens/                 # one file per screen (Profile, Career, Speaking, Projects, Education, Certs, Contact)
  styles/
    theme.css              # design tokens (light + dark), resets
    app.css                # every component style + responsive/mobile rules
  __tests__/spec.test.js   # executable acceptance criteria (see SPEC.md)
public/assets/             # drop-in images (see ASSETS.md); category marks may stay blank.
.github/workflows/deploy.yml  # build + publish to GitHub Pages
.legacy-v2/                # archived pre-React prototypes (gitignored) — do not ship
```

## 4. Screens (order is fixed)

`profile · career · speaking · projects · education · certifications · contact`

- **Profile** — hero (name OSCAR / LOBATON / SALAS), stable code-typed rotating
  roles, lightweight scan/glitch accents and a merged personal file. Its bio is
  paired with one ECharts Capability Directory: six equal typographic rows in
  overview and equal technology rows for all 35 complete names on focus. Counts
  remain factual text, never visual scores. The old fact ledger, skill-chip grid,
  3D plates, duplicate rail and readout do not return. `#/profile` is canonical;
  `#/home` remains a legacy alias.
- **Career** — **vertical timeline**, newest→oldest by start date (`CAREER_ORDER`),
  accordion; flagship `lead` role expanded by default; org logo per role.
  Career = professional roles ONLY (education never appears here).
- **Speaking** — **no horizontal scroll**: a photo-dominant Mission Reel with a
  vertical roster and an exact-venue, draggable Natural Earth globe. Venue
  acquisition is cyan; SVG country marks and the 2026→2024 chronology remain.
  All talks stay **newest→oldest** and the section background stays visible.
- **Projects** — minimal split interface: a dynamic vertical source index at
  left and one animated code-native SVG blueprint for the selected repository at
  right. Mobile stacks index then blueprint.
- **Education** — academic only (UNI, MIT Professional Education, Hanyang), each with a logo.
- **Certifications** — one stable ECharts **radial-reference credential atlas**:
  centre star, broad named category band, deliberate gutter and thin 62-cell
  credential corona, lifted as a shallow isometric/neon instrument. Compact SVG
  category diamonds share the band's outer orbit (keep chart + logos). Native
  `rootToNode` focus expands one category with complete outside names and equally
  sized badge/issuer marks inside a reserved top/bottom label lane while the
  registry filters in place; native and custom roll-up paths must restore the
  same complete overview state. Its centre star opens a five-item Featured
  signal rail with one compact live credential plate, not another table.
- **Contact** — viewport-locked CTA + links + CV; no vertical scroll.

## 5. Content & i18n

- Edit **`src/data/content.js`** — do not hard-code copy in components.
- Translatable fields are `{ en, es }`; resolve with `L(field, lang)`.
- UI chrome copy lives in `src/i18n.js` (`STRINGS[lang]`). Add every new key to
  **both** `en` and `es` (a test enforces parity).
- Language + theme are user-toggifiable (OPTIONS dropdown, top-right), persisted,
  overridable via `?lang=es` / `?theme=dark`.

## 6. Assets (user-supplied images)

All under `public/assets/`, auto-detected by filename, with graceful fallbacks
(glyphs / gradients). **Never block on a missing asset.** Certification category
marks are the deliberate exception: their framed slots stay empty, not broken,
until the real logo is supplied. The full checklist the owner fills in lives in
**`public/assets/ASSETS.md`**:
`bg/<screen>.jpg` (per-section background), `talks/<slug>.jpg`,
`certs/<icon>.svg` (category + issuer logos), `orgs/<slug>.svg`
(company/institution logos), `profile.png`, CV pdf. Technology slugs remain
stable content identifiers but the text-first Profile directory needs no logo upload.
`assets/favicon.svg` is code-managed identity artwork rather than a drop-in.

## 7. Design decisions — do NOT regress these

These were settled through iteration; changing them needs the owner's OK.

1. Use a real framework (React) — **no** vanilla-JS rewrite.
2. Detroit: Become Human menu aesthetic, violet accent, formal content.
3. Light **and** dark themes; EN **and** ES. Dark mode preserves a clear
   `--ink` → `--dim` → `--faint` hierarchy that meets SPEC G12; do not return
   body copy or microcopy to low-contrast gray.
4. Certifications = one stable ECharts sunburst **and** SVG logos (keep both).
   Preserve the reference-derived hierarchy: centre → broad named categories →
   gutter → thin credential corona → outside focus labels. Category diamonds
   share one exact orbit, focused credential marks share the corona midpoint,
   and both use the same compact 22px artwork box. Its theme-aware diagonal faces,
   displaced circular deck and restrained neon rim create shallow isometric depth
   without duplicating the chart. Category focus uses native `rootToNode`
   expansion; ECharts' ancestor roll-up, both BACK controls and Escape all reset
   React overlays to overview, and become instant under reduced motion. Do not
   replace this with a second chart or a container-only transition. Keep enough
   proportional space inside the ECharts viewport for every focused outside name
   at desktop and mobile widths. On desktop, keep the atlas track capped at
   700px and its registry gap at 14px or less. Common 1440×900 and 1512×982
   laptop layouts use a 640px atlas track and one shared 532–600px field so the
   complete circle and registry end above the fixed navigation. The registry
   outer height and 112px header/action lane never change between overview and
   category focus; only its ledger scrolls. Stack both surfaces at 1080px and
   below. Tooltip plates use the body portal and a confined lateral lane so they
   always clear the React-owned wheel overlays. Featured
   credentials remain one accessible five-item signal rail + one compact live
   plate; Platform Engineering Certified Practitioner is the initial signal,
   Arrow/Home/End stay local to the rail, and a separate control locates it in
   the atlas without making tab exploration jump the page.
5. Career is a **vertical** timeline; contains no education.
6. Speaking has **no horizontal scroll**; ordered newest→oldest; nothing is
   "upcoming". Keep the directly manipulable Natural Earth globe, independently
   selected talk/venue, cyan lock-on, photo-dominant Mission Reel, vertical
   year-grouped roster, SVG country marks and visible photographic background.
7. Full name includes **SALAS**.
8. Image-backed sections use `bg/<screen>.jpg`; Profile deliberately uses animated
   code-native geometry. Default is a clean gradient — the profile photo is NOT
   the section background. Shared violet backdrop signals are finite 1px traces,
   never full-height twin rails: they drift slowly, collapse to one short trace
   on mobile and remain as a quiet static mark under reduced motion.
9. Show the full 62-certification registry, grouped into 9 colored categories.
10. Keep the once-per-session NieR-style boot terminal (a monospace system log
    that types itself out line by line, ~2–3s total, then fades out). The app is
    mounted underneath immediately; the boot overlay never captures input; route
    content only uses a 160ms opacity fade and is never translated, skewed or
    held back. No decorative line/ornament is drawn across the page on navigation.
    Titled routes use the shared chrome-safe stage boundary so scrolling content
    is clipped below, never rendered behind, the fixed heading; Profile keeps the
    compact untitled boundary and Contact remains viewport-locked.
11. Reduced-motion skips the boot terminal and ambient effects, keeps the first
    Profile role static, resolves capability focus instantly and makes every
    content reveal immediately visible.
12. Projects keeps the minimal **source index + live blueprint** composition:
    readable list at left, one purpose-specific animated SVG at right. Do not
    reintroduce the rejected source topology, affinity graph, diamond cloud or
    telemetry dashboard. Aesthetic polish stays inside those same two surfaces.
13. Contact is the viewport-locked final scene: keep the restored direct-contact
    composition and never add vertical scrolling to that route. Height-aware
    spacing must keep every bilingual metadata line above the fixed navigation at
    768px-high desktop and mobile QA viewports.
14. The browser favicon is the transparent, code-native violet turtle head in
    profile in `public/assets/favicon.svg`. Keep its domed cranium, lateral cyan
    eye, blunt beak, organic angled neck, cropped shell collar and dual light/dark
    contour legible at native favicon sizes; do not return to a miniature full
    body, mask-like frontal portrait, old generic diamond or theme-dependent
    raster.
15. Profile capabilities use one ECharts SVG custom-series Capability Directory,
    not a fact table, chip registry, treemap, radar or second radial atlas.
    Overview keeps six flat typographic rows; focus exposes all 35 names on equal
    rows, with real technology counts shown only as text—never area, intensity or
    an invented skill score. The chart itself is the sole selector: do not restore
    isometric plates, scan effects, a duplicate keyboard rail or status readout.
    Click/tap, local keyboard navigation, Back/Escape, light/dark and mobile all
    preserve the same complete content.

## 8. TDD workflow (how to iterate safely)

1. Read `SPEC.md` — the acceptance criteria.
2. Before/while changing behavior, add or update a criterion in `SPEC.md` and its
   assertion in `src/__tests__/spec.test.js`.
3. Implement.
4. `npm test` must pass; `npm run build` must succeed.
5. Add a `CHANGELOG.md` entry under `[Unreleased]`.
6. Verify visually (see §9) before declaring done.

## 9. Visual verification

Drive the built app and screenshot it:

```bash
npm run build && (python3 -m http.server 8005 --directory dist &)
"<chrome>" --headless=new --hide-scrollbars --force-prefers-reduced-motion \
  --window-size=1440,900 --screenshot=out.png \
  --virtual-time-budget=8000 "http://localhost:8005/#/certifications"
```

**Mobile gotcha:** headless Chrome uses a ~500px CSS viewport even at
`--window-size=390`, so 390-wide screenshots look falsely clipped on the right.
Verify mobile at `--window-size=500,900`, or assert `scrollWidth == clientWidth`.

## 10. Coding conventions

- Match existing patterns: `<Reveal>` for entrance, `L()` for text, `AssetIcon`
  for any logo/photo that the owner will supply.
- Keep CSS in `src/styles/app.css`; use the design tokens from `theme.css`
  (`var(--accent)`, `var(--ink)`, `var(--panel)`, …) — never hard-code colors so
  light/dark keep working. ECharts colors come from `theme-colors.js`.
- Flex/grid children that hold text need `min-width: 0` (avoid overflow bugs).
- Keep it dependency-light; prefer the existing libs over adding new ones.

## 11. Deploy

`main` → GitHub Actions (`.github/workflows/deploy.yml`) builds and publishes to
GitHub Pages. Custom domain **0vas.com** via a `CNAME` (see `README.md` for DNS).
Do not commit or push unless the owner asks.
