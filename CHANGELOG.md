# Changelog

All notable changes to this project are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/);
this project uses loose [Semantic Versioning](https://semver.org/).

> **For agents:** add an entry under `[Unreleased]` in the same iteration as your
> change. Group under `Added / Changed / Fixed / Removed`. When the owner cuts a
> release, move `[Unreleased]` items under a new dated version.

## [Unreleased]

### Fixed
- **Contact is now a true single-scene final view:** its route alone removes the
  global bottom scroll allowance and locks vertical overflow, eliminating the
  unnecessary scrollbar without moving or scaling the restored composition.
  Height-aware spacing keeps the title, actions, social links and metadata fully
  visible at compact desktop and mobile heights.
- **Dark-theme secondary text is readable instead of washed out:** raised the
  `--dim` and `--faint` tokens to measurable 7:1 / 4.5:1 minimum contrast across
  all dark base surfaces, strengthened divider lines and panel opacity, and gave
  long-form dark copy a stable reading weight. The matching ECharts token mirror
  is synchronized so charts and interface copy retain the same hierarchy.
- **Category logos are asset-only (no classic-glyph-then-asset double load):** the
  category marks on the wheel, drilled center and ledger headers used to flash the
  built-in glyph first and then swap to the supplied `certs/<catIcon>.svg`. They
  now render **only the asset** (blank until the file exists). The owner supplies
  every category SVG; per-row issuer glyphs keep their fallback. Missing today:
  `platform`, `cloud`, `data`, `security`.
- **Certifications load is fluid and the level-change deploy is reliable:**
  ECharts' internal sunburst animation is fragile here — a resize landing mid-flight
  could freeze the sectors **translucent and unreadable** on drill-in (looked like
  "nothing showed"), and on first paint it fought the Framer `<Reveal>` fade. The
  sunburst now renders instantly (`animation: false`, always full-opacity and
  legible); the first paint is faded in by the `<Reveal>`, and the level-change
  **deploy** is a robust zoom+fade played on the wheel container (Web Animations
  API — can't stall on resize, skips the first mount, reduced-motion opts out).
  Hover emphasis is disabled in the drilled view (fixes dark-on-hover label text),
  the chart's `ResizeObserver` ignores no-op/sub-pixel resizes, and the redundant
  app-startup preload of category SVGs was removed.
- **Removed the mid-page line on navigation:** the decorative route signal (a
  violet line + node + code that swept across the middle of the page on every
  section change) is gone. Navigation keeps its atomic ~160ms opacity fade only.
- **No more broken-image icon while the wheel loads:** `AssetIcon` now probes its
  candidate URLs off-DOM (`new Image()`) and only mounts an `<img>` once one is
  confirmed to load, showing the built-in glyph meanwhile. Categories without a
  supplied SVG (and any other missing logo) no longer flash the browser's
  broken-image placeholder for ~a second — it looked like an error.
- **Dark-mode contrast on accent buttons:** dark theme's accent is a light violet,
  so white text on it (segmented LANGUAGE/THEME toggles, Download CV, active nav,
  drilled BACK) was low-contrast. `--accent-ink` is now dark in dark mode → legible
  dark-on-violet.
- **Certifications section no longer flashes white / redraws on open:** the
  badge-state reset now keeps a stable empty-object reference (it was minting a
  new `{}` on mount, which re-ran the sunburst option and redrew the whole wheel).
- **Drilled roster text was unreadable on lighter slices:** drilled slices are now
  full-opacity and the white radial labels carry a dark halo (`textShadow`), so the
  certification names stay legible on every category colour in both themes.
- **Removed the small ↓ arrow** under the wheel-centre HIGHLIGHTS star (the star and
  its scroll-to-highlights behaviour stay).

### Changed
- **Projects simplified into a live source index:** replaced the rejected
  topology/telemetry control room with a quieter split composition — six readable
  repositories on the left and one large purpose-specific SVG blueprint on the
  right. Each project now has its own minimal visual language (quadrant, wiki
  flow, bridge, migration, sync or slide deck), selection is immediate by hover,
  click, focus or keyboard, and reduced-motion preserves the finished drawing.
  Restrained frame depth, a clearer active acquisition halo and richer ambient
  blueprint detail add polish without changing or adding either base surface.
- **Contact restored to the previous direct-contact layout:** removed the rejected
  `DIRECT UPLINK` experiment and recovered the original bilingual title, email
  CTA, CV download, GitHub/LinkedIn/Credly row and metadata sequence exactly from
  local file history.
- **Speaking geography rebuilt:** replaced the eight hand-drawn continent
  polygons with locally bundled Natural Earth 1:110m land and D3's true
  orthographic horizon clipping. The map module is code-split and prefetched at
  idle, preserving the original Home bundle and first-render performance.
- **Exact venue acquisition:** Speaking now tracks the talk and venue
  independently. One location at a time receives a cyan gradient lock-on;
  selecting another venue of the same talk recenters the globe, updates the
  coordinate readout and restarts the acquisition animation. InnerSource Summit
  now correctly follows Berlin → New York → Tokyo instead of San Francisco.
- **Speaking Mission Reel:** the selected photograph is now the dominant left
  surface, with a compact information plate below and a readable vertical
  2026→2024 roster beside it. Mobile stacks photo, information and roster without
  horizontal navigation; mixed image ratios retain ambient-cover + full contain.
- **Certifications wheel — badge images on drill-down (badges keep the featured
  star):** drilling into a category now shows each certification's **badge
  image** on its slice (`certs/badges/<badge>.<ext>`, several extensions probed).
  Badges are **preloaded off-DOM**, so a slice only swaps its native radial text
  for the image once the file is confirmed to load — a missing file never
  flashes a broken-image icon and the text/image never both show (fixes the
  earlier doubled-text overlap). Azure's 8 certifications are wired with `badge`
  slugs; see `public/assets/ASSETS.md`. The wheel-center **highlights star is
  kept**.
- **Boot terminal now matches the active theme:** the first-session boot log
  uses the design tokens (`--bg0`, `--panel-strong`, `--ink`, …) instead of a
  hard-coded dark palette, so it renders light-on-light or dark-on-dark and no
  longer flashes dark before a light page resolves.
- **First-session opening restored to the NieR: Automata boot terminal:**
  replaced the ~1s diagnostic console with a monospace system log that types
  itself out line by line over dotted leaders (`BOOTING SYSTEM ···· OK`,
  `VERIFYING CREDENTIAL MATRIX ···· 62/62`, …), reports `SYSTEM ALL GREEN` and
  `▸ OPERATIVE ONLINE` with a blinking cursor, then fades out — ~2.8s total
  (owner-requested 2–3s), timer-driven, still once per session, non-blocking and
  skipped under reduced-motion. Boot copy is bilingual in `i18n` `intro`.
- **Motion language restored without navigation lag:** kept the non-blocking
  first-session boot terminal, atomic 160ms screen fade and lightweight Home
  title/portrait scan accents. Route content and the portrait are never
  translated, skewed or delayed.
- **Home role console restored:** bilingual roles type and erase after the full
  primary role is already visible. The longest role reserves the line geometry
  so the effect cannot shift the hero while cycling.
- **Motion accessibility:** reduced-motion now skips the diagnostic, route,
  typing, caret and ambient title effects, and forces shared content reveals to
  their fully visible resting state.
- **Navigation readiness:** non-Home backgrounds are prefetched during idle time
  and vector-backed sections select their existing SVG first, avoiding failed
  image probes during route changes.
- **Speaking visual system refined:** inverted the composition so the full-frame
  photographic mission dossier leads on the left and the globe occupies the
  right. Mixed-ratio talk images now use a contained foreground over an ambient
  image layer instead of destructive cropping. Events are organized as a
  readable 2026→2024 flight log with code-native SVG country marks.
- **Speaking globe interaction:** location nodes now select their conference
  directly (cycling co-located events in Lima and Medellín), support keyboard
  activation, and the projected globe can be dragged with mouse or touch.
  Non-active labels reveal on hover/focus to prevent map collisions.
- **Certification highlights:** explicitly added **Platform Engineering
  Certified Practitioner** to the featured credential selection.
- **Speaking rebuilt as a global tour console:** the previous featured-card/list
  composition is replaced by an organic projected globe that rotates to each
  talk's coordinates, a photographic mission briefing and a 3×3 event matrix.
  The section background remains deliberately visible through the interface.
- **Atomic page transitions:** removed Framer Motion from route and background
  image enter/exit. Screens now mount as a single DOM composition with a 160ms
  opacity-only CSS fade; Home's portrait is preloaded to prevent late collapse.
- **Top chrome simplified:** removed per-screen counters such as “REPOSITORIES 6”;
  only the OPTIONS control remains on the right.
- **Home transition rebuilt:** Home no longer requests or renders a section
  photograph, and its content skips staggered Framer entrances. A lightweight
  CSS orbital/diamond composition supplies motion without delaying text or the
  profile card.
- **Certification highlights:** the center star now scrolls to and flashes a
  dedicated full-width highlights section below the registry instead of opening
  an overlay on top of the wheel.
- **Home responsiveness:** route transitions now mount concurrently in 180ms;
  the top-right certification count and five animated readout counters were
  removed. The primary role renders immediately instead of cycling through a
  type/delete animation that could look partially loaded.
- **Career:** dates moved to the left side of the vertical rail and the section
  photograph shifted farther right. Speaking's backdrop is more visible.
- **Profile portrait:** Home uses a conservative identity-preserving retouch,
  optimized to a 318KB JPEG; the original `profile.png` remains untouched.
- **Certifications wheel:** retained the Apache ECharts sunburst, drill-down,
  category logo overlay and 62-cert registry while adopting rounded sectors
  (`itemStyle.borderRadius`) in both chart states. The ledger now uses a stronger
  theme token so its content remains legible over the dark-theme background.
- **Faster first paint and navigation:** removed the blocking boot sequence,
  shortened shared reveals/navigation transitions and eliminated Home's section
  image request.
- **Per-screen background composition:** restored the compact far-right Home
  portrait treatment; Career and Education shift farther right; Speaking now
  uses higher-contrast translucent reading panels. Projects and Certifications
  received richer custom vector backdrops (repository graph and credential
  matrix) in the established Detroit/violet visual language.
- **Section backgrounds:** photography is now confined to a right-aligned image
  region with centered framing and a shorter left-edge fade, keeping portrait
  subjects visible without washing over the primary content. Projects and
  Certifications use dedicated geometric SVG backgrounds.
- **Home:** removed the capability radar; the skill-chip registry remains.
- **Career grouped into sub-sections:** *Professional experience*, *Complementary
  activities* (DevSecOps Space, DevOps Institute, AI & Robotics Lab) and *Academic
  activities* (Nixvoid, GameDevs UNI, ACM). Each group is newest→oldest.
- **Org logos are JPEG:** Career and Education now load `orgs/<slug>.jpg` (were
  `.svg`). Tech and certification logos stay SVG; speaking photos stay JPG.
- **Certifications wheel is now an interactive drill-down.** Click a category (slice
  or logo) → the sunburst zooms into that category, showing its certifications as
  labeled segments with a center panel (category logo, name, count) and a **BACK**
  control to zoom out; the ledger highlights the drilled category. Overview keeps
  the 2-level wheel + 9 category logos + "62" center.
- **Speaking:** talks updated to the owner's authoritative list — **9 talks**
  (was 10; removed GitHubWeek/Prompt Engineering) with verbatim titles and
  abstracts (EN + ES). Counts updated to 9 (readouts, meta, stat).
- **Speaking:** added a prominent **"DevOps Institute — official ambassador"**
  badge; simplified the section kicker.
- Tests updated: S1 → 9 talks; added S5 (ambassador badge present).

### Fixed
- The active theme is now passed into the backdrop, so background opacity tracks
  light/dark mode as intended.

### Removed
- **Career II / Parallel Map:** removed the experimental eighth tab and restored
  the original seven-screen navigation after visual comparison.

### Added
- **Certification highlights:** the sunburst center provides a visual shortcut
  to a dedicated Expert and Leadership credential section below the registry.
- **Shared `page-visual-qa` skill for Claude and Codex:** identical project-local
  skills build the production app and capture all seven routes at desktop and
  mobile viewports for image-based inspection. Acceptance tests enforce parity.

## [3.4.0] — 2026-07-10

### Added
- **Agent contract:** `AGENTS.md` (shared by Claude Code / Codex / others),
  `CLAUDE.md` importing it, and this `CHANGELOG.md`.
- Per-section backgrounds: each screen loads `public/assets/bg/<screen>.jpg`
  (washed, crossfaded); clean gradient fallback. Profile photo removed from the
  global backdrop.
- Animated backdrop: drifting DBH diamonds + slow light sweep.
- **TDD:** `SPEC.md` acceptance criteria + `src/__tests__/spec.test.js` (Vitest,
  18 tests) + `npm test` / `npm run test:watch` scripts.
- `public/assets/ASSETS.md` — full drop-in image checklist for the owner.
- "SALAS" shown in the hero name (OSCAR / LOBATON / SALAS).

### Changed
- **Speaking** redesigned to a **no-scroll** layout (featured chapter + selectable
  list), ordered newest→oldest. (Replaced the horizontal chapter flowchart.)
- **Career** redesigned as a **vertical accordion timeline** with per-role org
  logos; contains professional roles only. (Replaced the ECharts tree.)
- **Certifications** wheel keeps the ECharts sunburst **and** overlays SVG
  category logos on the inner ring; ledger rows show issuer logos.
- Content updated to the owner's real LinkedIn record: 62 certifications in 9
  colored categories (incl. McKinsey Forward, Harvard Aspire, MIT Professional
  Education), real talk titles/descriptions, No Country / ACM / DevOps Institute /
  DevSecOps Space roles, CIP N° 386940, +22% delivery, InnerSource ×15 / 8,000+ devs.

### Fixed
- It is July 2026 — removed all "upcoming" flags; every talk is now past.
- Mobile overflow hardening (`box-sizing: border-box`, `100vw` on stage/screen,
  `min-width: 0` on flex text). Documented the headless-Chrome 500px-viewport
  screenshot artifact.

## [3.3.0] — 2026-07-10

### Added
- **Certifications categories:** 62 certs regrouped into 9 colored macro-categories
  (Azure, GitHub, Platform, Red Hat, Multi-cloud, DevOps & GitOps, Leadership,
  Data & AI, Security); two-level colored sunburst.
- **OPTIONS dropdown** (top-right): language (EN/ES), theme (Light/Dark), Download
  CV — moved out of the (now decluttered) bottom bar.
- Org logo box in the Career detail panel and Education cards
  (`public/assets/orgs/…`).

## [3.2.0] — 2026-07-10

### Added
- **i18n EN/ES** across all content (`{ en, es }` + `L()`), persisted toggle,
  `?lang=` override, browser auto-detect.
- **Download CV** buttons; certification **issuer icons**; speaking **photo slots**
  (`public/assets/talks/…`).
- Custom monochrome SVG issuer glyphs (`AssetIcon` with graceful fallback).

### Changed
- Instructor (Nixvoid) moved out of Education (it is an activity, ended 2024).

## [3.0.0] — 2026-07-10

### Changed
- **Full rewrite to React 18 + Vite + Framer Motion + ECharts.** Adopted the
  *Detroit: Become Human* menu-system aesthetic in violet, with light/dark themes
  and screen-based hash navigation. (Replaced all prior vanilla-JS prototypes.)

## Legacy (pre-React, archived in `.legacy-v2/`, not shipped)

- **v2** — "operative dossier": static HTML/CSS/JS, AAA dark HUD (NieR/Halo/Control).
  Rejected as "too normal / not original enough".
- **v1** — "player profile": static HTML/CSS/JS, retro-arcade / pixel style.
  Rejected — the owner wanted contemporary AAA game UI, not nostalgia pixel-art.
