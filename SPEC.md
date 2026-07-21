# 0VAS — Acceptance Spec (TDD)

Design/content criteria, encoded as executable tests in `src/__tests__/`.
Run `npm test` after every change; every box must stay green before shipping.

## Global
- **G1** — 7 screens, in order: profile, career, speaking, projects, education, certifications, contact.
- **G2** — Every screen has a label + title in **both** `en` and `es` (title may be empty for `profile`).
- **G3** — Every UI string key present in `en` exists in `es` (no missing translations).
- **G4** — Image-backed tabs load `public/assets/bg/<screen>` in a supported
  format; Profile deliberately uses a code-native animated backdrop instead.
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
- **G7** — Profile does not preload or request a section background image.
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
- **G13** (visual) — The shared backdrop never draws continuous full-height twin
  rails. Its two ambient signals are finite 1px traces no taller than 104px,
  rendered with a transparent low-contrast gradient and independent slow drift
  below the OPTIONS zone. Mobile keeps only one trace no taller than 56px;
  reduced-motion freezes it as a faint static segment. No route or theme gains
  horizontal overflow from these signals.
- **G14** (visual) — The fixed top chrome and the scroll viewport use one
  title-aware safety boundary. Every titled route begins at least 28px below the
  desktop title and 24px below it on mobile, so scrolling content is clipped at
  that boundary instead of passing behind the heading. Profile retains its compact
  untitled origin, while Contact uses a dedicated shorter safe boundary and
  remains viewport-locked with no vertical scroll.
- **G15** (visual) — On compact/mobile widths the horizontally scrollable bottom
  menu always brings the active route fully into view and centres it when space
  permits. Route changes adjust only the menu's horizontal position, never the
  screen's vertical scroll, and reduced-motion resolves the alignment instantly.

## Profile
- **PF1** — Full name shows the three parts OSCAR / LOBATON / SALAS.
- **PF2** — CIP 386940 appears in the Profile kicker.
- **PF3** (visual) — The static six-row personal fact ledger and the separate
  skill-chip grid are removed. One theme-aware ECharts SVG **Capability
  Directory** replaces both inside the personal-file column. Its custom series
  is a flat, typographic list of six equal domain rows with factual technology
  counts—never area, intensity or an invented proficiency score. Selecting a
  domain transitions to all 35 complete technology names in equal rows (two
  columns on desktop, one on mobile). The chart itself is the only selector:
  there is no duplicate tab rail, status readout, scan, 3D plate or dashboard
  telemetry. Click/tap and ArrowUp/ArrowDown/Home/End + Enter operate the same
  focus state; Back and Escape restore the directory. Mobile never overflows
  horizontally, and reduced-motion resolves the same state changes instantly.
- **PF4** — Profile has neither the top-right certification statistic nor the five
  animated readout counters.
- **PF5** — Profile has no section background image and mounts its content without
  staggered Framer Motion entrances. Lightweight ambient geometry, title scan
  and pseudo-element glitches may move without delaying the composition.
- **PF6** — The role line cycles through all bilingual `ROLES` with a code-typing
  effect. Its first render is the complete primary role, its geometry is reserved
  to prevent layout shift, and reduced-motion keeps the primary role static.
- **PF7** — `#/profile` is the canonical first route and the navigation writes
  that URL. The legacy `#/home` hash remains an explicit compatibility alias
  that resolves to the same Profile screen without adding an eighth route.

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
  browser is idle so geographic fidelity does not slow Profile's first render.
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
  scrolls vertically. Its title, direct actions, social links and every metadata
  line remain visible through height-aware spacing at 768px-high desktop/mobile
  QA viewports and taller screens.

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
- **CE5** — The wheel is an interactive two-state **credential atlas**: clicking
  a category uses ECharts' native `rootToNode` drill to expand it to 360° without
  scrolling the wheel out of view; an accessible BACK control rolls up to the
  complete registry.
- **CE6** — The certification wheel is rendered by one stable ECharts `sunburst`
  series with stable category/certification node IDs. React never replaces it
  with a second chart just to represent the focused state.
- **CE7** — The same stable sunburst follows the supplied radial-reference
  hierarchy: the highlights star at its centre, a broad inner category band
  with readable radial category names, a deliberate annular gutter, then a
  visibly thinner 62-cell credential corona. Overview keeps those 62 names
  quiet; category focus deploys every complete credential name into a reserved
  outside label lane. Rounded corners remain restrained so narrow cells read as
  one continuous atlas rather than detached pills. The violet/category palette
  and adaptive light/dark keylines remain without creating a second chart.
- **CE8** — The wheel center is an aesthetic interactive star that scrolls to a
  dedicated highlighted-certifications section below the main registry.
  **Platform Engineering Certified Practitioner** is explicitly included.
- **CE9** — In category focus, every certification keeps its complete radial name
  **and** an icon: a confirmed badge image (`certs/badges/<badge>.<ext>`) is used
  when supplied, otherwise its issuer asset/glyph remains. Badges are probed
  off-DOM through a shared result cache, so missing files never flash a
  broken-image icon or repeat the same extension cascade on every focus. Azure's
  eight certifications remain wired with badge slugs.
- **CE10** — ECharts owns the radial motion: the stable tree uses expansion plus
  animated update duration/easing for drill and roll-up. Reduced-motion keeps the
  same two states but resolves them instantly. The former whole-container
  scale/fade substitute is not used. If theme, language, the compact breakpoint
  or reduced-motion preference changes, the chart and contextual registry reset
  to overview together instead of exposing different states.
- **CE12** (visual) — Overview shows nine named category sectors and 62 compact
  credential cells without forcing 62 overlapping names. Category focus gives
  each complete name enough radial distance from its cell and icon to remain
  readable, while the right registry filters to the acquired category and
  preserves full name, issuer, year and level. Selecting a credential highlights
  its exact row; selecting a category never scrolls the page away from the chart.
- **CE13** (visual) — Category and issuer imagery uses neutral adaptive
  backplates so black/multicolour assets remain visible in dark and light
  themes. All nine category controls share one exact orbit at the outer edge of
  the category band; all focused credential marks share the exact midpoint of
  the credential corona. Both use the same compact target and 22px artwork box,
  with no satellite count bubble or per-item radial displacement. Controls stay
  keyboard accessible, and missing category assets leave a deliberate aligned
  slot instead of a broken image or glyph swap.
- **CE14** (visual) — The desktop composition is atlas-dominant: the contextual
  registry is capped at 380px (335–350px through the compact desktop/tablet
  band), the atlas column is capped at 700px and centred beside it, and the
  inter-panel gap never exceeds 14px (12px through the compact desktop band).
  This removes dead column space so the registry sits visibly closer without
  shrinking the wheel. On common 14-inch laptop layouts its shared field is
  height-aware from 532–600px so the complete circle and invariant registry fit
  above the fixed navigation chrome at 1440×900 and 1512×982. The redundant
  atlas readout below that field is absent; selection detail remains in the
  tooltip and synchronized registry. Every circular layer
  continues to use the same measured diameter and centre as ECharts. At
  1080px and below the single-column stack gives long radial names a full-width
  canvas before the registry instead of clipping them; no certification name,
  icon, filter or interaction is removed to gain space.
- **CE15** — Every roll-up path is deterministic. The centre BACK control, the
  registry BACK control, Escape **and ECharts' native blue ancestor sector** all
  return the chart and React overlays to the same overview state: focused issuer
  marks, category centre, selection, hover and badge state are cleared, while the
  nine overview category marks and names return immediately. The native
  `sunburstRootToNode` action remains the single radial transition mechanism.
- **CE16** (visual) — The atlas reads as one shallow isometric instrument rather
  than a flat diagram: the ECharts SVG and its aligned DOM labels/marks share one
  perspective plane over a code-native layered deck, with restrained violet or
  active-category neon rims and depth shadows. The treatment remains legible in
  light and dark themes, reduces its tilt/glow on mobile, freezes ambient light
  under reduced motion, and never duplicates or substitutes the ECharts series.
- **CE17** (visual) — Category focus reserves a proportional outside-label safety
  lane inside the ECharts viewport. The radial face stays vertically balanced and
  its credential corona leaves at least 8% of the chart field at both the top and
  bottom for every complete rotated name, including the longest Red Hat and
  Azure credentials; no label is clipped, hidden or pushed under the explanatory
  copy at desktop, compact desktop or mobile widths. The same measured centre
  continues to align ECharts, issuer marks, hub, deck and neon rings.
- **CE18** — Featured Certifications is a quiet five-item signal rail with one
  compact live credential plate, not a constellation, orbit, second registry or
  card matrix. Platform Engineering Certified Practitioner is selected initially.
  Five equal diamond selectors share one visual baseline and real
  tablist/tab/tabpanel semantics with roving focus and Arrow/Home/End navigation
  that stays inside the rail instead of triggering global route navigation.
  The active plate exposes full name, category, level, issuer and year;
  exploration never moves the page, while a separate Locate in Atlas control
  preserves atlas drill, registry selection and scroll. Desktop and mobile keep
  one rail plus one detail surface, targets of at least 44px, no carousel or
  horizontal overflow. Light/dark themes use a restrained active signal and
  reduced-motion removes selection movement while retaining the selected state.
- **CE19** (visual) — The contextual registry is vertically centred beside the
  complete atlas on desktop instead of being pinned to its upper-right corner.
  Certification tooltips mount above the ECharts/React instrument layers and
  choose a confined lateral safe zone, so their full name and issuer plate never
  disappears behind the centre hub, category controls or focused wheel. The
  single-column layout keeps its natural atlas-then-registry order.
- **CE20** (visual) — The contextual registry has one invariant outer height in
  overview and every 3/4/5/7/8/10-item category focus. Its 112px header always
  reserves the same action lane (overview guidance or Back), while only the
  ledger scrolls inside the remaining row with a stable scrollbar gutter.
  Filtering never moves, grows or shrinks the panel, atlas or following content
  at desktop, stacked or mobile widths.

## Education
- **E1** — 3 academic programs (UNI, MIT Professional Education, Hanyang), each with a `logo`.

## Assets
- **A1** — `public/assets/ASSETS.md` exists and lists the bg/, talks/, certs/, orgs/, tech/ folders.
- **A2** — every image-backed screen is named in the `bg/` checklist; Profile's
  code-native background and legacy unused `bg/home.jpg` are documented explicitly.
- **A4** — `AssetIcon` resolves user images by probing candidate URLs **off-DOM**
  (`new Image()`), mounting an `<img>` only once one loads and showing the glyph
  fallback meanwhile when `fallbackId` is supplied — a missing file never
  flashes the browser's broken-image icon. Certification category controls are
  the deliberate exception: without `fallbackId`, their framed slot remains
  empty until the owner supplies the real mark. Probe promises are cached by
  candidate set so repeated issuer marks and route/theme remounts reuse one
  result instead of replaying missing-file requests.
- **A3** — Profile uses a non-destructive, optimized retouched portrait while the
  original `profile.png` remains available.
- **A5** — The asset checklist enumerates every category/issuer logo slug and
  every currently wired certification badge slug, including which files are
  still missing and theme-safe preparation guidance.
- **A6** — The browser icon is the code-native `assets/favicon.svg`: a transparent,
  organic violet **turtle head in profile**, not a miniature full body or a
  mask-like frontal portrait. Its domed cranium, single lateral cyan eye, blunt
  beak with nostril/long jaw, organic neck sweep and a cropped shell collar keep
  the animal unmistakable at 16px and 32px. A light outer halo and dark inner contour
  preserve it on both light and dark browser chrome. It contains no embedded
  image, text, filter or animation and is linked as a size-independent,
  cache-busted SVG so browsers do not retain the rejected icon.

## Agent contract (cross-agent consistency)
- **D1** — `AGENTS.md`, `CLAUDE.md`, `CHANGELOG.md`, `SPEC.md` all exist.
- **D2** — `CLAUDE.md` imports the shared contract (`@AGENTS.md`).
- **D3** — Claude and Codex ship identical `page-visual-qa` skills. The skill
  builds the app and captures every screen at desktop and mobile viewports in
  both light and dark themes.
