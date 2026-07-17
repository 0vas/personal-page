# 0VAS — Acceptance Spec (TDD)

Design/content criteria, encoded as executable tests in `src/__tests__/`.
Run `npm test` after every change; every box must stay green before shipping.

## Global
- **G1** — 7 screens, in order: home, career, speaking, projects, education, certifications, contact.
- **G2** — Every screen has a label + title in **both** `en` and `es` (title may be empty for `home`).
- **G3** — Every UI string key present in `en` exists in `es` (no missing translations).
- **G4** — Image-backed tabs load `public/assets/bg/<screen>` in a supported
  format; Home deliberately uses a code-native animated backdrop instead.
- **G5** (visual) — Section photography stays anchored to the right and centered
  inside its image region; its left edge fades away before the primary content.
- **G6** — First entry may show a NieR-style boot terminal (a monospace system
  log that types itself out line by line, then reports the system green) for
  roughly 2–3 seconds and once per session. It uses the design tokens so it
  **matches the active light/dark theme** (no dark-to-light flash). The
  application is already mounted beneath it, the overlay never captures input,
  fades out via `.leaving`, and reduced-motion skips it entirely. Shared
  screen/reveal transitions still complete in 320ms or less; reduced-motion
  resolves every reveal immediately and leaves content visible.
- **G7** — Home does not preload or request a section background image.
- **G8** (visual) — Career and Education photography is shifted farther right;
  Speaking places its controls on a high-contrast translucent reading surface.
- **G9** — Screen navigation replaces routes atomically with a sub-200ms CSS
  opacity fade; it does not use Framer Motion for screen enter/exit transforms.
  No decorative route line/ornament is drawn across the page on navigation.
- **G10** — The top chrome contains OPTIONS only; per-screen numeric statistics
  such as “REPOSITORIES 6” are not rendered.
- **G11** — Dark theme's accent is a light violet, so `--accent-ink` (text/icons
  that sit on accent fills — segmented toggles, Download CV, active nav, drilled
  BACK) is a **dark** colour in dark mode for legible contrast, not white.
- **G12** — Dark theme preserves a deliberate readable hierarchy on every
  screen: secondary `--dim` text reaches at least 7:1 and microcopy `--faint` at
  least 4.5:1 against each dark base surface (`--bg0`, `--bg1`, `--bg2`). Primary
  `--ink` remains brightest; improved contrast must not flatten all text into one
  colour.

## Home
- **H1** — Full name shows the three parts OSCAR / LOBATON / SALAS.
- **H2** — CIP 386940 appears in the home kicker.
- **H3** — Home has no radial capability chart; capabilities remain as skill chips.
- **H4** — Home has neither the top-right certification statistic nor the five
  animated readout counters.
- **H5** — Home has no section background image and mounts its content without
  staggered Framer Motion entrances. Lightweight ambient geometry, title scan
  and pseudo-element glitches may move without delaying the composition.
- **H6** — The role line cycles through all bilingual `ROLES` with a code-typing
  effect. Its first render is the complete primary role, its geometry is reserved
  to prevent layout shift, and reduced-motion keeps the primary role static.

## Career (vertical, grouped)
- **C1** — Career is a vertical timeline; oldest role overall (`acm`) is last in `CAREER_ORDER`.
- **C2** — Career contains **no education** nodes (no `uni`, `hanyang`, `mit`).
- **C3** — Every career item has: logo (JPEG), title(en/es), org, date(en/es), notes[], keys[].
- **C4** — Flagship role `lead` is flagged ACTIVE and lives in the `professional` group.
- **C5** — Career is split into 3 sub-sections: `professional`, `complementary`
  (dss, devopsinstitute, ailab), `academic` (nixvoid, gamedevs, acm); group names bilingual.

## Speaking (no scroll)
- **S1** — Exactly 9 talks (the owner's authoritative list).
- **S2** — It is **July 2026**: no talk is "upcoming" (`up` flag absent on all).
- **S3** — Talks render **newest → oldest** (data order preserved, not reversed).
- **S4** — Every talk has: slug, code, year, flag, where, title, desc(en/es), (url optional).
- **S5** — A "DevOps Institute — official ambassador" badge is shown (i18n key `speaking.ambassador`).
- **S6** — Every talk has one or more geographic coordinates. Speaking renders
  an organic projected globe with locally bundled Natural Earth land geometry
  and true orthographic clipping. It rotates toward the exact selected venue;
  its visible location nodes are directly selectable and the globe can be
  dragged. InnerSource Summit is Berlin → New York → Tokyo (never San Francisco).
  The map/data module is split from the initial bundle and prefetched while the
  browser is idle so geographic fidelity does not slow Home's first render.
- **S7** (visual) — The globe, mission panel and event selector form one original
  Detroit-style tour interface while the section background remains visible.
  The left dossier is a Mission Reel: its selected conference photograph is the
  dominant surface, shown completely over an ambient image layer; a compact
  information plate sits beneath it and a vertical roster sits beside it. The
  globe remains on the right. Mobile stacks reel, information, roster and globe
  without a horizontal carousel.
- **S8** — Events form an explicit 2026 → 2025 → 2024 timeline with readable
  names. Country identity is rendered with code-native SVG flags, never emoji
  text in the Speaking interface.
- **S9** — Speaking tracks the selected talk and selected venue independently.
  Exactly one venue uses the active cyan acquisition treatment; clicking any
  marker, including another venue of the already-selected talk, recenters the
  globe, updates the coordinate readout and restarts a short gradient lock-on.
  Reduced-motion keeps the final locked state without rotation or pulses.

## Projects (source index + live blueprint)
- **P1** — Exactly 6 GitHub projects. IDs, names and URLs are unique; every
  project has bilingual tag/description and short name, a language, technologies
  and one unique visual mode. Content is local and never waits for the GitHub API.
- **P2** — Projects is a minimal split composition: a persistent vertical source
  index on the left and one large live blueprint on the right. It does not use a
  source topology, affinity graph, diamond cloud or telemetry dashboard.
- **P3** — Exactly one index row is selected. Selection atomically updates the
  blueprint motif, ID, full name, description, language, technologies and real
  repository URL without unmounting the presentation or using
  `AnimatePresence mode="wait"`/translations.
- **P4** — Index rows expose `aria-pressed`, point to the presentation with
  `aria-controls`, have visible keyboard focus and support ArrowUp/ArrowDown,
  Home and End. The selected project copy is announced politely.
- **P5** (visual) — Desktop keeps the readable list at left and a clean, dominant
  code-native SVG representation at right. Each repository has a distinct motif
  related to its purpose. Restrained frame depth, selection/acquisition accents
  and ambient SVG detail may polish those same two surfaces, but must not add a
  third panel, dashboard or topology. Mobile stacks list then blueprint, keeps
  targets at least 44px and has no horizontal carousel or overflow.
- **P6** — Blueprint drawing, cursor and signal movement use CSS/SVG only and
  never delay selection. Reduced-motion disables them while preserving the full
  final motif and selected state.

## Contact (classic direct contact)
- **CT1** — Contact keeps the primary mailto CTA, downloadable CV and direct
  GitHub, LinkedIn and Credly links from `LINKS`; no fake form is introduced.
- **CT2** — The restored composition is the simple title, CTA, social link row
  and metadata sequence animated by the shared `Reveal`. It contains no uplink,
  handshake console or routing matrix.
- **CT3** — Copy stays structurally complete in English and Spanish. External
  links retain `target="_blank"` + `rel="noopener noreferrer"`, the CV retains
  `download`, and mobile keeps the email/actions readable without horizontal
  overflow. Reduced-motion inherits the shared resolved Reveal state.
- **CT4** — Contact is a viewport-locked final screen: its route container never
  scrolls vertically. Its title, direct actions, social links and metadata remain
  visible through height-aware spacing at the desktop and mobile QA viewports.

## Certifications (ECharts wheel + SVG logos)
- **CE1** — Total = 62 certifications.
- **CE2** — 9 categories, each with id, name(en/es), color, catIcon.
- **CE3** — Every certification has a name, issuer, year and an `icon` slug (→ `certs/<icon>.svg`).
- **CE4** — Category logos are kept on the wheel (`catIcon` → `certs/<catIcon>.svg`), plus per-row issuer logos.
- **CE11** — Category (`catIcon`) logos on the wheel, drilled center and ledger
  headers are **asset-only**: they render the supplied image or stay blank (never
  a built-in glyph), so there is no classic-glyph-then-asset double load. The
  owner supplies every `certs/<catIcon>.svg`. Per-row issuer glyphs keep their
  fallback.
- **CE5** (manual) — The wheel is an interactive **drill-down**: clicking a category
  zooms into its certifications; a center BACK control zooms back out.
- **CE6** — The certification wheel is rendered by ECharts as a `sunburst` series.
- **CE7** — Both overview and drill-down use ECharts' rounded-sector sunburst
  treatment (`itemStyle.borderRadius`) while retaining SVG logo overlays.
- **CE8** — The wheel center is an aesthetic interactive star that scrolls to a
  dedicated highlighted-certifications section below the main registry.
  **Platform Engineering Certified Practitioner** is explicitly included.
- **CE9** — In the drilled view a certification slice shows the cert's own
  **badge image** (`certs/badges/<badge>.<ext>`, several extensions probed) once
  the file is confirmed to load; until then (or when no file exists) the slice
  keeps its **native radial text label**. Badges are probed off-DOM so a missing
  image never flashes a broken-image icon, and the text/image never both show.
  Azure's certifications are wired with `badge` slugs.
- **CE10** — Drilled slices are full-opacity and their white radial labels carry
  a dark halo so the text stays legible on every category colour (both themes),
  with hover emphasis disabled (no dark-on-hover text). ECharts' own animation is
  **off** (`animation: false`) — its internal deploy could freeze the sectors
  translucent if a resize landed mid-flight — so the wheel always renders fully
  and legibly. The level-change **deploy** is instead a robust zoom+fade played on
  the wheel container (Web Animations API, skips first mount, reduced-motion opts
  out), which can't stall. The badge-state reset keeps a stable reference (no
  spurious redraw).

## Education
- **E1** — 3 academic programs (UNI, MIT Professional Education, Hanyang), each with a `logo`.

## Assets
- **A1** — `public/assets/ASSETS.md` exists and lists the bg/, talks/, certs/, orgs/, tech/ folders.
- **A2** — every screen is named in the `bg/` checklist.
- **A4** — `AssetIcon` resolves user images by probing candidate URLs **off-DOM**
  (`new Image()`), mounting an `<img>` only once one loads and showing the glyph
  fallback meanwhile — a missing file never flashes the browser's broken-image
  icon (nor an empty box) on the certifications wheel or anywhere else.
- **A3** — Home uses a non-destructive, optimized retouched portrait while the
  original `profile.png` remains available.

## Agent contract (cross-agent consistency)
- **D1** — `AGENTS.md`, `CLAUDE.md`, `CHANGELOG.md`, `SPEC.md` all exist.
- **D2** — `CLAUDE.md` imports the shared contract (`@AGENTS.md`).
- **D3** — Claude and Codex ship identical `page-visual-qa` skills. The skill
  builds the app and captures every screen at desktop and mobile viewports in
  both light and dark themes.
