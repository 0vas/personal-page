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
  title-aware safety boundary. Every titled route inherits the compact
  Certifications calibration: `24px` desktop chrome inset, `18px` between the
  top rule and eyebrow, and one shared
  `clamp(150px, 17vh, 166px)` desktop content reserve. No titled screen keeps a
  private vertical offset. Speaking's command row aligns its kicker to the top
  of that shared boundary. Projects fills the same boundary from the top with
  the source sphere and no longer keeps a separate command row. Mobile preserves its shared
  `clamp(128px, 18vh, 156px)` reserve, so scrolling content is clipped below the
  heading instead of passing behind it. Profile retains its compact untitled
  origin, while Contact remains viewport-locked with no vertical scroll.
- **G15** (visual) — On compact/mobile widths the horizontally scrollable bottom
  menu always brings the active route fully into view and centres it when space
  permits. Route changes adjust only the menu's horizontal position, never the
  screen's vertical scroll, and reduced-motion resolves the alignment instantly.
- **G16** (deployment) — The canonical production origin is
  `https://0vas.com`. GitHub Pages keeps `0vas.com` as its configured custom
  domain, completes certificate provisioning for both the apex and `www`, and
  has **Enforce HTTPS** enabled so every HTTP request redirects to HTTPS. The
  repository deploy guide records the certificate recovery and verification
  commands; production assets must not introduce mixed HTTP content.

## Profile
- **PF1** — Full name shows the three parts OSCAR / LOBATON / SALAS.
- **PF2** — CIP 386940 appears in the Profile kicker.
- **PF3** (visual) — The static six-row personal fact ledger and the separate
  skill-chip grid are removed. One minimal, vanilla HTML/CSS **two-pane
  Capability Directory** replaces both inside the personal-file column — no
  ECharts, no canvas. The left pane is a roster of six equal domain rows (index,
  diamond marker, name, factual technology count, caret); the right pane shows
  the selected domain's complete technology names as plain chips with a
  name + count header. Counts stay factual text—never area, intensity or an
  invented proficiency score. The roster is the only selector: there is no
  duplicate tab rail, status readout, scan, 3D plate or dashboard telemetry.
  Click/tap and ArrowUp/ArrowDown/ArrowLeft/ArrowRight/Home/End move the same
  selection (the panes always show a selected domain—there is no empty overview
  state to return to). The list is a `role="listbox"` with `role="option"`
  rows and `aria-activedescendant`; an `aria-live` region announces the active
  domain and every technology name stays in the DOM. Mobile stacks the two panes
  (list then detail) and never overflows horizontally; reduced-motion drops the
  detail fade so state changes resolve instantly.
- **PF4** — Profile has neither the top-right certification statistic nor the five
  animated readout counters.
- **PF5** — Profile has no section background image and mounts its content without
  staggered Framer Motion entrances. Its ambient motif is `<ProfileTurtle theme>`,
  which loads a **per-theme owner illustration** — `/assets/turtle-home-light.png`
  (violet) or `/assets/turtle-home-dark.png` (neon) — a tribal sea turtle flanked by
  jellyfish, falling back to `/assets/turtle-home.png` then a code-native line-art
  turtle. It sits large in the right half of the hero, gently drifting as if swimming,
  and **must not overlap the name text**; it is hidden on narrow/stacked layouts
  (≤1024px). Title scan and pseudo-element glitches may also move without delaying the
  composition. Reduced-motion freezes the turtle.
- **PF6** — The role line cycles through all bilingual `ROLES` with a code-typing
  effect. Its first render is the complete primary role, its geometry is reserved
  to prevent layout shift, and reduced-motion keeps the primary role static.
- **PF7** — `#/profile` is the canonical first route and the navigation writes
  that URL. The legacy `#/home` hash remains an explicit compatibility alias
  that resolves to the same Profile screen without adding an eighth route.
- **PF8** (visual) — Narrow/stacked Profile layouts keep the same retouched
  portrait visible inside the opening hero. At ≤980px it becomes a full-width
  horizontal editorial dossier between the role and lede; the lede, CTA and
  social rows then regain the complete column below it. The cinematic crop keeps
  Oscar's full face visible, preserves the framed Detroit identity treatment,
  never overlaps copy, never creates horizontal overflow and does not restore
  the mobile turtle ambient. The existing vertical desktop portrait remains
  unchanged. Both layouts place one linked `GITHUB // @0VAS` channel signature
  below the image instead of repeating Oscar's name over his portrait; the
  brackets frame only the photograph.

## Career (vertical, grouped)
- **C1** — Career is a vertical timeline; oldest role overall (`acm`) is last in `CAREER_ORDER`.
- **C2** — Career contains **no education** nodes (no `uni`, `hanyang`, `mit`).
- **C3** — Every career item has: logo (JPEG), title(en/es), org, date(en/es), notes[], keys[].
- **C4** — Flagship role `lead` is flagged ACTIVE and lives in the `professional` group.
- **C5** — Career is split into 3 sub-sections: `professional`, `complementary`
  (dss, devopsinstitute, ailab), `academic` (nixvoid, gamedevs, acm); group names bilingual.

## Speaking (no scroll)
- **S1** — Exactly 11 talks (the owner's authoritative list). The two newest,
  both 2026, are F13 Code Summit in Lima (`f13-code-summit-2026`,
  “Abstracción en Platform Engineering”, https://www.f13.pe/) and the GitHub
  LATAM broadcast (`github-latam-quack-2026`, “Jueves de Quack: InnerSource con
  Credicorp”, https://www.youtube.com/watch?v=aWz3BWj3d00). Header, stat and
  readout counts say 11.
- **S2** — It is **July 2026**: no talk is "upcoming" (`up` flag absent on all).
- **S3** — Talks render **newest → oldest** (data order preserved, not reversed).
- **S4** — Every talk has: slug, code, year, flag, where, title, desc(en/es), (url optional).
- **S5** — A "DevOps Institute — official ambassador" badge is shown (i18n key `speaking.ambassador`).
- **S5b** — The Speaking header has a bilingual **VIEW SLIDES / VER SLIDES** button
  (i18n key `speaking.viewSlides`) that opens `LINKS.slides` (`https://slides.0vas.com`,
  the owner's slides subdomain) in a new tab. It sits beside the ambassador badge and
  matches the DBH parallelogram styling.
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
  text in the Speaking interface. On the fixed desktop panel the chronology
  scrolls inside the roster and keeps the active event in view without moving
  the page. Appearance indices are zero-padded to two digits (`01 / 11`).
- **S9** — Speaking tracks the selected talk and selected venue independently.
  Exactly one venue uses the active cyan acquisition treatment; clicking any
  marker, including another venue of the already-selected talk, recenters the
  globe, updates the coordinate readout and restarts a short gradient lock-on.
  Reduced-motion keeps the final locked state without rotation or pulses.
  The active name plate, including the wide GLOBAL BROADCAST plate, stays
  clear of the lock-on reticle, and a stacked appearance count sits on the
  opposite side of that plate.

## Projects (source sphere)
- **P1** — Exactly 7 GitHub projects. IDs, names and URLs are unique; every
  project has bilingual tag/description and short name, a language, technologies
  and one unique visual mode. Hyperion (`hyperion`) is the seventh, with its own
  workflow blueprint. Its open link goes to the live canvas at
  https://0vas.github.io/hyperion/. Content is local and never waits for the
  GitHub API.
- **P2** — Projects is one Fibonacci ring of the seven repositories inside the
  route's content well. The headline ("I Build in the Open" / "Construyo en
  abierto") is a sibling of the ring and shares its 0×0 origin: horizontal
  center is `margin-left: calc(var(--hw) / -2)`, vertical center is
  `.inner { transform: translateY(-50%) }`. Each frame the headline transform is
  only `rotateX(-sx) rotateY(-sy) translateZ(R * TITLE_Z)`. `TITLE_Z` is 1.08,
  so the words stay in front of every card. The world transform is
  only `translateZ(camZ) rotateY(sy) rotateX(sx)`. Drag turns the ring around
  the words. While nobody is dragging and no card is open, the ring keeps a
  slow idle yaw (`IDLE_YAW`). A 16% scroll of the projects screen dollies
  forward and never moves the other routes. It does not use a source topology,
  affinity graph, diamond cloud or telemetry dashboard.
- **P3** — A card click opens one lightbox with that repository's blueprint,
  short name, slug, description, language, technologies and real URL. Opening
  does not use `AnimatePresence mode="wait"` or a translated unmount. Escape
  closes the lightbox first, then the grid.
- **P4** — Sphere cards are named buttons with a visible focus ring. Keyboard
  activation opens the same lightbox. The grid toggle exposes `aria-pressed`.
  The open note is announced politely. While the lightbox or the grid is open,
  ArrowLeft/ArrowRight do not change the route.
- **P5** (visual) — The ring uses the page palette. Each card is a theme plate:
  the motif above, and the short name plus index always readable in `--ink` on
  `--panel-solid`. The headline stays `--ink` and does not fade. Depth is a
  light wash that never covers the name. The full name is shown, never clamped,
  in a short band under the motif. The plates sit apart on a wide ring around
  the headline, and the idle turn keeps that spacing.
  The ring is sized so every plate and the full headline stay inside the
  projects stage. The grid shows the same named plates. Reduced motion holds
  the words and the finished motif without momentum or idle yaw. Targets stay
  at least 44px. The ring does not overflow the screen horizontally.
- **P6** — Blueprint drawing and the signal use CSS/SVG only. Reduced motion
  disables them, the headline entrance and the idle yaw. The camera loop still
  follows a drag, and it snaps instead of easing when reduced motion is on.

## Contact (classic direct contact)
- **CT1** — Contact keeps the primary mailto CTA, downloadable CV and direct
  GitHub, LinkedIn and Credly links from `LINKS`; no fake form is introduced.
  Credly keeps visible link text and uses the owner-supplied official mark with
  the built-in monochrome glyph as a load-safe fallback.
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
- **CE10** — ECharts owns the radial motion: the overview paints its finished
  frame immediately (`animationDuration: 0`) and the stable tree uses expansion
  plus animated update duration/easing for drill and roll-up. Sector faces keep
  their diagonal gradient; the CSS deck owns the lift, so the SVG sectors do
  not carry per-cell shadow filters. Reduced-motion keeps the
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
  the category band, separated from the independent inner name orbit by at least
  23% of the measured atlas diameter; hyphenated category names may wrap at the
  hyphen. This keeps Security, Multi-Cloud, Data & AI and DevOps & GitOps clear
  of their diamonds at desktop and compact widths. All focused credential marks
  share the exact midpoint of the credential corona. Both use the same compact
  target and 22px artwork box, with no satellite count bubble or per-item radial
  displacement. Controls stay keyboard accessible, and missing category assets
  leave a deliberate aligned slot instead of a broken image or glyph swap.
- **CE14** (visual) — The desktop composition is atlas-dominant: the contextual
  registry is capped at 380px (335–350px through the compact desktop/tablet
  band), the atlas column is capped at 700px and centred beside it, and the
  inter-panel gap never exceeds 14px (12px through the compact desktop band).
  This removes dead column space so the registry sits visibly closer without
  shrinking the wheel. Certifications inherits the same compact title reserve
  as every other titled route while preserving a clear title-to-content
  boundary. On common 14-inch laptop layouts
  the atlas track is 680px and its shared field is height-aware from 560–650px,
  so the expanded 76% radial face and invariant registry meet the upper rule of
  the fixed navigation without a residual strip at 1440×900 and 1512×982. The redundant atlas readout below
  that field is absent; selection detail remains in the tooltip and synchronized
  registry. Every circular layer
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
- **E2** — The UNI record highlights the Tesis con Impacto prize: best research
  in the faculty and Top 4 at the university, in both languages, as its own
  gold line above the other notes.

## Assets
- **A1** — `public/assets/ASSETS.md` exists and lists the bg/, talks/, certs/,
  orgs/, tech/ and brands/ folders.
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
- **A6** — The browser icon is `assets/favicon.png`: the owner-generated **flat geometric
  violet turtle** (top-down; hexagonal shell scutes with a light/dark-violet split, a
  rounded head, angular flippers), exported **transparent** and downscaled to 256px so
  the tab colour shows through and it reads on light and dark chrome. Linked with
  `type="image/png"` and cache-busted from `index.html`.
- **A7** — The owner-supplied transparent `brands/credly.png` is the single
  official Credly mark reused beside the real outbound Credly links in Profile,
  Contact and Certifications. The visible “Credly” text and monochrome glyph
  fallback remain accessible and load-safe. Because Credly is the verifier, not
  the issuer, the mark never becomes a wheel category, issuer row or credential
  badge.
- **A8** — Ambient background music is optional and opt-in (`useMusic` hook; the
  `<audio>` is mounted at App level so it keeps playing across route/dropdown
  changes). The controls appear **only when an owner audio file exists** at
  `/assets/ambient.(mp3|m4a|ogg|wav)`: a **play/pause icon button beside OPTIONS**,
  and inside the OPTIONS dropdown a **MUSIC row with a volume slider and a credit
  "i" toggle**. It **never autoplays** — sound starts only on the visitor's click;
  the on/off state and the volume persist (localStorage). Play/pause is labelled in
  EN/ES. The bundled track is FiftySounds' "Arcano" (commercial licence,
  **attribution required**), so both Contact's footer and the dropdown "i" credit
  `Music: "Arcano" — FiftySounds` linking to `fiftysounds.com` (`LINKS.music`); if
  the audio ships, that credit ships.
- **A9** — The owner-supplied transparent `brands/linkedin.png` (blue circle, white
  “in”) is the official LinkedIn mark shown beside the outbound LinkedIn links in
  Profile, Contact and the Certifications note. Its `in` counter is composited white
  so it stays on-brand on light and dark chrome; the built-in `linkedin` glyph is the
  load-safe fallback.

## Agent contract (cross-agent consistency)
- **D1** — `AGENTS.md`, `CLAUDE.md`, `CHANGELOG.md`, `SPEC.md` all exist.
- **D2** — `CLAUDE.md` imports the shared contract (`@AGENTS.md`).
- **D3** — Claude and Codex ship identical `page-visual-qa` skills. The skill
  builds the app and captures every screen at desktop and mobile viewports in
  both light and dark themes.
