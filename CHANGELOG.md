# Changelog

All notable changes to this project are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/);
this project uses loose [Semantic Versioning](https://semver.org/).

> **For agents:** add an entry under `[Unreleased]` in the same iteration as your
> change. Group under `Added / Changed / Fixed / Removed`. When the owner cuts a
> release, move `[Unreleased]` items under a new dated version.

## [Unreleased]

### Added
- **Hyperion joins Projects:** `0vas/hyperion` is the seventh repository, with
  its own workflow blueprint. The open link goes to the live canvas at
  https://0vas.github.io/hyperion/.
- **UNI education highlights the Tesis con Impacto prize:** a gold line on the
  Systems Engineering record states the award for the best faculty research and
  Top 4 at the university, in English and Spanish.
- **Two 2026 talks on Speaking:** F13 Code Summit (Lima, UTEC) — “Abstracción en
  Platform Engineering” — and the GitHub LATAM broadcast “Jueves de Quack:
  InnerSource con Credicorp” (https://www.youtube.com/watch?v=aWz3BWj3d00).
  Both sit ahead of the May and April DevOpsDays dates. The stage photo and the
  official broadcast frame ship with the entries, and the talk count is now 11.

### Changed
- **Certifications paints the finished atlas immediately.** The 62-cell wheel
  no longer plays an intro sweep or attaches an SVG shadow filter to every
  sector; the existing deck still supplies the lift, and drill and roll-up
  keep their expansion. Hover updates without a shadow tween, and the
  ambient glow pulses with opacity instead of a filter.
- **Projects is a source sphere in the site palette:** the seven repositories
  sit on a Fibonacci ring as theme plates, each with its motif and a readable
  name, shown in full in a short band under the motif. "I Build in the Open" stays on that same center, in the
  page ink, and no longer fades out. It stays in front of the cards. The ring
  is sized so every plate and the headline stay inside the stage, with clear
  space between the plates. Left alone
  it turns slowly; drag still takes
  over, and a short scroll of this screen dollies in. A card opens its
  blueprint, note and repository link. The grid is the same named plates.
  Reduced motion holds the words and the finished motif, still.
- **Speaking chronology stays reachable at 11 talks:** the fixed desktop roster
  scrolls inside its panel and brings the active event into view without moving
  the page. Indices use a real two-digit pad, so the counter reads `01 / 11`
  instead of `01 / 011`.
- **Every titled route now shares Certifications' compact title spacing:** Career,
  Speaking, Projects, Education, Certifications and Contact use the same 24px
  desktop chrome inset, 18px rule gap and 150–166px chrome-safe content reserve.
  Speaking top-aligns its command kicker. Projects fills that same boundary
  from the top with the source sphere and no longer has a separate command row.
  Profile's untitled opening remains unchanged, and Contact remains
  viewport-locked without scroll.

### Fixed
- **Globe venue plates no longer cover the lock-on:** the active name plate
  clears the cyan reticle, and a stacked count such as the two GitHub
  broadcasts (`×2`) sits on the opposite side. “GLOBAL BROADCAST” keeps its
  full tracked width inside the plate.

## [v1] - 2026-07-23

First public release of the 0VAS personal page at https://0vas.com.

### Added
- **"View slides" button in Speaking:** a bilingual VIEW SLIDES / VER SLIDES button in
  the Speaking header opens the owner's slides subdomain `https://slides.0vas.com`
  (`LINKS.slides`) in a new tab. Styled as an outlined DBH parallelogram beside the
  ambassador badge. (Requires the `slides.0vas.com` DNS/Pages setup — see README.)
- **Official LinkedIn mark:** the owner's LinkedIn logo (`brands/linkedin.png`, blue
  circle + white “in”, transparent RGBA) now appears beside the LinkedIn links in
  Profile, Contact and the Certifications note, matching the Credly treatment. The
  `in` counter was composited white so it stays on-brand on light and dark; the
  built-in monochrome glyph remains the load fallback.
- **Official Credly verifier mark:** the owner's transparent orange/white asset
  now appears beside the real Credly links in Profile, Contact and the
  Certifications verification note. One shared `brands/credly.png` source keeps
  the mark consistent in light/dark themes, retains visible link text and the
  monochrome load fallback, and intentionally stays out of issuer/category
  badges because Credly verifies rather than issues the credentials.
- **Turtle ambient on Profile (`<ProfileTurtle>`):** replaces the abstract
  ring/orbiting-diamond backdrop. Ships with the owner's generated **tribal/Polynesian
  sea turtle flanked by jellyfish**, per theme: `/assets/turtle-home-light.png` (violet)
  and `/assets/turtle-home-dark.png` (neon violet + cyan). `<ProfileTurtle theme>`
  picks the right one and falls back to `/assets/turtle-home.png`, then a code-native
  line-art turtle. Images were generated on a green screen, exported transparent and
  downscaled to 627px (premultiplied) for clean edges with no white halo. It sits large
  in the right half of the hero, gently drifting/swimming (organic `ptSwim`), never
  overlaps the name text, is hidden on ≤1024px layouts, and freezes under reduced-motion.
  Swapping the artwork is drop-in — no code change.
- **Optional ambient background music (`useMusic` hook):** appears **only when** an
  owner audio file exists at `/assets/ambient.(mp3|m4a|ogg|wav)` (no dead control
  otherwise). A **play/pause icon button sits beside OPTIONS**, while the OPTIONS
  dropdown holds a **MUSIC row with a volume slider and an "i" credit toggle**. The
  `<audio>` is lifted to App level so it keeps playing when the dropdown closes or the
  route changes. It never autoplays — the visitor opts in with a click; on/off state
  and volume persist (localStorage). Now shipping FiftySounds' **"Arcano"**
  (`ambient.mp3`, commercial licence). The licence **requires attribution**, so both
  Contact's footer and the dropdown "i" credit `Music: "Arcano" — FiftySounds`
  linking to `fiftysounds.com` (`LINKS.music`).

### Changed
- **Profile Capabilities is now a minimal vanilla two-pane directory:** the
  ~350-line ECharts custom-series (manual per-pixel rects/diamonds/text) was
  replaced with plain HTML/CSS. A left roster of the six domains selects one at a
  time; the right pane lists that domain's technologies as simple chips with a
  name + count header. It reads cleaner, is far easier to maintain, and drops the
  busy chart backdrop — the owner asked for something more aesthetic, minimalist
  and clean. Counts stay factual text; keyboard (Arrow/Home/End), `role="listbox"`
  semantics, `aria-live`, light/dark, mobile stacking (no horizontal overflow) and
  reduced-motion are all preserved. `CustomChart` was removed from the shared
  ECharts runtime since the sunburst was its only remaining consumer.
- **Favicon is now a flat geometric violet turtle** (`favicon.png`): top-down, hexagonal
  shell scutes with a light/dark-violet split, rounded head and angular flippers, in the
  style of a clean geometric turtle logo. Owner-generated, transparent, downscaled to
  256px; linked as `type="image/png"`, cache-busted (`?v=turtle-geo2`). Replaces the
  earlier tribal-turtle favicon.

### Fixed
- **"Download CV" no longer wraps to two lines in the OPTIONS menu:** the settings
  dropdown rows used the class `.sp-row`, which collided with the Certifications
  registry's `.sp-row` (a `display:flex` rule) and forced the DOCUMENT label and the
  CV button side-by-side, squeezing the button. The dropdown rows were renamed to
  `.opt-row` (restoring the intended label-above-control layout) and the CV button /
  `.btn` got `white-space: nowrap`. Fixes desktop and mobile.
- **Profile portrait is restored and editorial on mobile:** the ≤980px rule no
  longer removes Oscar's photo or compresses the lede beside an avatar-sized
  crop. The existing retouched portrait now becomes one full-width 8:5 dossier
  between the role and lede, with a clean full-face crop and contained brackets;
  the redundant name ribbon is replaced in both layouts by one useful linked
  `GITHUB // @0VAS` signature below the photograph. The lede, CTA and social rows
  regain the full column without overlap, width expansion, a duplicate asset
  request or the hidden mobile turtle returning. The vertical desktop crop is
  unchanged.
- **Capabilities panel is legible over the turtle backdrop:** the two-pane directory
  used a 34%-opacity fill, so the fixed Profile turtle bled through and washed out the
  domain rows and technology chips on scroll. It is now a near-opaque frosted panel
  (`--panel-strong` + 16px backdrop blur + soft shadow) with more solid chips, so the
  content stays readable regardless of what scrolls behind it.
- **The custom domain is being restored to HTTPS-only operation:** GitHub Pages
  reported valid apex/`www` DNS but no custom certificate and
  `https_enforced: false`, so `http://0vas.com` remained unencrypted while TLS
  exposed the incompatible `*.github.io` certificate. Re-saving `0vas.com` in
  the Pages configuration requested a fresh certificate-provisioning check; the deployment
  contract now requires enabling **Enforce HTTPS** as soon as issuance completes
  and verifies both the HTTP redirect and certificate SAN, with a documented
  recovery path if provisioning stalls.
- **Certifications now fits one larger, collision-free laptop workbench:** its
  route-specific title reserve gives a 680px atlas track and a 560–650px
  height-aware field on 1440×900 and 1512×982 layouts. The regular ECharts face
  expands to 76%, while names and category diamonds use separate radial orbits;
  hyphen-aware wrapping keeps Security, Multi-Cloud, Data & AI and DevOps &
  GitOps from touching their marks. The complete focused circle, outside labels
  and registry now meet the fixed navigation's upper rule instead of leaving a
  visible strip above it. Overview and every
  3/4/5/7/8/10-item filter keep the exact same registry height because its 112px
  header always reserves an action lane and only the ledger scrolls with a stable
  gutter; filtering no longer grows, shrinks or shifts either surface.
- **Compact navigation now follows the active section:** the longer Profile label
  no longer leaves Certifications half-visible or Contact outside the mobile
  viewport. Route and language changes centre the active tab inside the bottom
  menu without touching the page's vertical scroll; reduced-motion aligns it
  instantly.
- **Certification context now stays centred and unobstructed:** the registry rail
  is vertically aligned with the complete atlas instead of starting in the
  upper-right corner. ECharts tooltip plates now use a body-level HTML portal,
  confined lateral placement and an explicit top layer, so full credential text
  cannot disappear behind the wheel's centre hub or React-owned icon controls.
- **Scrolling copy no longer collides with fixed section titles:** titled routes
  now use a taller shared stage boundary that clips their scrollport below the
  chrome, including at shorter desktop and mobile heights. Profile keeps its compact
  untitled origin and Contact keeps a dedicated no-scroll-safe boundary.
- **Shared background signals no longer read as two full-height rails:** the
  former 110vh violet beams beside OPTIONS are now finite 1px traces capped at
  104px, with a slow vertical drift and restrained opacity. Mobile shows one
  52px trace, while reduced-motion keeps the same quiet shape static.
- **Featured keyboard navigation stays inside Certifications:** Arrow/Home/End
  now move roving focus across the five highlighted credentials without also
  triggering the app-wide previous/next route shortcut. Global arrow navigation
  ignores interactive controls while the explicit bottom navigation is unchanged.
- **Focused radial names no longer clip at the top of Certifications:** the
  regular ECharts geometry previously left only 1% of its SVG field above a 78%
  corona, so long Red Hat and Azure labels were visibly cut despite the outer
  wrapper allowing overflow. The regular 76% corona and 90% label frame now keep
  their complete names inside the measured field, with its badge orbit,
  isometric deck, hub and neon frames recalibrated to the same centre. The
  compact geometry retains its balanced 70% corona; all nine categories remain
  complete at desktop, compact-desktop and mobile widths.
- **Every Certifications return path now restores the real overview:** ECharts'
  native ancestor annulus used to roll the SVG back while leaving React's focused
  centre, issuer icons and filtered registry behind. The lower-case
  `sunburstroottonode` action event now shares one idempotent reset with both BACK
  controls and Escape, clearing delayed highlights, selection and badges
  before restoring nine category marks/names and all 62 registry rows.
- **Contact is now a true single-scene final view:** its route alone removes the
  global bottom scroll allowance and locks vertical overflow, eliminating the
  unnecessary scrollbar without moving or scaling the restored composition.
  Height-aware spacing now begins at 840px and compacts the final metadata gap,
  while a two-column mobile action row keeps the bilingual title, actions, social
  links and every metadata line visible at 1440×768 and 500×768.
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
- **Certifications deploy is fluid and resize-safe:** the two replace-on-click
  charts and whole-container zoom/fade were replaced by one stable ECharts tree
  with native `rootToNode` expansion and stable node IDs. Badge resolution now
  changes only its DOM overlay, and resize work is frame-batched, so neither can
  restart or strand a radial transition. Reduced-motion preserves both atlas
  states but resolves the same operation instantly. A theme, language, compact
  breakpoint or motion-preference change now resets the chart and contextual
  registry to overview together.
- **Removed the mid-page line on navigation:** the decorative route signal (a
  violet line + node + code that swept across the middle of the page on every
  section change) is gone. Navigation keeps its atomic ~160ms opacity fade only.
- **No more broken-image icon while the wheel loads:** `AssetIcon` now probes its
  candidate URLs off-DOM (`new Image()`) and only mounts an `<img>` once one is
  confirmed to load. Issuers show their built-in fallback meanwhile; category
  controls deliberately keep a clean framed slot until their SVG is supplied.
  Neither case flashes the browser's broken-image placeholder.
- **Dark-mode contrast on accent buttons:** dark theme's accent is a light violet,
  so white text on it (segmented LANGUAGE/THEME toggles, Download CV, active nav,
  drilled BACK) was low-contrast. `--accent-ink` is now dark in dark mode → legible
  dark-on-violet.
- **Certifications no longer redraws while optional badges resolve:** image
  probing is decoupled from the ECharts option, so a confirmed badge can appear
  without rebuilding the wheel or interrupting category focus.
- **Missing certification assets no longer repeat probe cascades:** issuer/category
  candidate sets and optional badge results are cached for the page session, so
  repeated rows, theme/route remounts and returning to a category reuse one
  off-DOM resolution instead of replaying every absent extension.
- **Focused certification names remain legible:** complete outside labels use
  high-contrast ink in light mode and their category signal in dark mode, both
  with a matching surface keyline. Issuer/badge overlays use adaptive neutral
  backplates in both themes.
- **Removed the small ↓ arrow** under the wheel-centre HIGHLIGHTS star (the star and
  its scroll-to-highlights behaviour stay).

### Changed
- **Home is now Profile with one dynamic capability surface:** the first screen
  is canonically `#/profile` and reads Profile/Perfil in the bilingual menu;
  `#/home` remains a normalized compatibility alias. The static six-row fact
  ledger and separate 35-chip registry were removed in favor of one ECharts SVG
  Capability Directory beside the bio. Its overview is now one calm typographic
  list of six equal domains and factual technology counts; selecting a row morphs
  that same ECharts custom series into equal rows for every complete technology
  name. Click/tap, local Arrow/Home/End + Enter navigation, Back/Escape,
  light/dark and reduced-motion all share the same state without isometric plates,
  scan effects, a duplicate rail/readout or fake proficiency encoding.
- **The browser identity is now an unmistakable turtle head:** the compact,
  cache-busted transparent SVG replaces both the mask-like portrait and rejected
  miniature full body with an organic violet profile: domed cranium, lateral
  cyan eye, blunt beak, angled neck and cropped shell collar. Its light halo and
  dark inner contour remain legible on both light and dark browser chrome at
  16px/32px without filters, animation or raster dependencies.
- **Featured Certifications is now a minimal signal rail instead of a second
  table or constellation:** five equal, aligned diamond selectors drive one
  compact live credential plate. Platform Engineering Certified Practitioner is
  the initial verified signal; Arrow/Home/End previews every full credential
  without moving the page, while an explicit Locate in Atlas control preserves
  native drill, highlight and registry selection. The same rail/plate composition
  stacks without horizontal overflow and resolves instantly under reduced motion.
- **Certifications now follows the supplied radial format as a shallow isometric
  instrument:** the stable ECharts atlas reads centre star → broad named category
  sectors → annular gutter → thin 62-cell credential corona. Directionally lit
  SVG faces sit over a displaced multi-step deck, restrained violet/category
  energy rim and relieved 22px icon markers; the active hue propagates through
  that single aligned plane without adding another chart or per-cell filters.
  Desktop uses an expanded 76% face with a reserved outside-name lane while mobile
  reduces tilt and glow. Restrained cell rounding, responsive label wrapping and
  motion-safe ambient light preserve full names, native drill motion and
  light/dark support.
- **Certifications now gives the atlas visual priority:** the desktop registry is
  narrowed from a competing near-half-width column to a bounded 340–380px rail,
  with a safe 335–350px compact-desktop range. The atlas track is capped at the
  wheel's 700px maximum and becomes 680px across common laptop heights, removing
  unused column space; a maximum 14px gap (12px in compact desktop) brings the
  registry visibly closer. A shared height-aware field keeps its decoration,
  ECharts centre and registry aligned without clipping the circle. At 1080px and
  below the atlas and registry stack; complete names, icons, levels, filters and
  scrolling remain.
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
  idle, preserving the original Profile bundle and first-render performance.
- **Exact venue acquisition:** Speaking now tracks the talk and venue
  independently. One location at a time receives a cyan gradient lock-on;
  selecting another venue of the same talk recenters the globe, updates the
  coordinate readout and restarts the acquisition animation. InnerSource Summit
  now correctly follows Berlin → New York → Tokyo instead of San Francisco.
- **Speaking Mission Reel:** the selected photograph is now the dominant left
  surface, with a compact information plate below and a readable vertical
  2026→2024 roster beside it. Mobile stacks photo, information and roster without
  horizontal navigation; mixed image ratios retain ambient-cover + full contain.
- **Certifications wheel — names and icons coexist in category focus:** every
  expanded slice keeps its complete radial name and a visual mark. A confirmed
  badge (`certs/badges/<badge>.<ext>`) is preferred; otherwise the issuer
  asset/glyph remains. Badges are probed off-DOM so missing files never flash a
  broken image. Azure's 8 certifications are wired with `badge` slugs, and the
  wheel-center highlights star is kept.
- **Certifications became a contextual credential atlas:** the overview presents
  nine accessible, named category sectors with aligned 36px diamond controls and
  62 quiet credential cells; selecting a category expands it through ECharts,
  filters the verified registry in place and exposes a clear Back/Escape path.
  Selecting a credential synchronizes its radial emphasis, tooltip and exact
  registry row without moving the page away from the wheel.
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
  first-session boot terminal, atomic 160ms screen fade and lightweight Profile
  title/portrait scan accents. Route content and the portrait are never
  translated, skewed or delayed.
- **Profile role console restored:** bilingual roles type and erase after the full
  primary role is already visible. The longest role reserves the line geometry
  so the effect cannot shift the hero while cycling.
- **Motion accessibility:** reduced-motion now skips the diagnostic, route,
  typing, caret and ambient title effects, and forces shared content reveals to
  their fully visible resting state.
- **Navigation readiness:** non-Profile backgrounds are prefetched during idle time
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
  opacity-only CSS fade; Profile's portrait is preloaded to prevent late collapse.
- **Top chrome simplified:** removed per-screen counters such as “REPOSITORIES 6”;
  only the OPTIONS control remains on the right.
- **Profile transition rebuilt:** Profile no longer requests or renders a section
  photograph, and its content skips staggered Framer entrances. A lightweight
  CSS orbital/diamond composition supplies motion without delaying text or the
  profile card.
- **Certification highlights:** the center star now scrolls to and flashes a
  dedicated full-width highlights section below the registry instead of opening
  an overlay on top of the wheel.
- **Profile responsiveness:** route transitions now mount concurrently in 180ms;
  the top-right certification count and five animated readout counters were
  removed. The primary role renders immediately instead of cycling through a
  type/delete animation that could look partially loaded.
- **Career:** dates moved to the left side of the vertical rail and the section
  photograph shifted farther right. Speaking's backdrop is more visible.
- **Profile portrait:** Profile uses a conservative identity-preserving retouch,
  optimized to a 318KB JPEG; the original `profile.png` remains untouched.
- **Certifications wheel:** retained Apache ECharts, rounded sectors, SVG category
  logos and the complete 62-cert registry inside one stable, theme-aware series;
  the contextual ledger remains legible over both section themes.
- **Faster first paint and navigation:** removed the blocking boot sequence,
  shortened shared reveals/navigation transitions and eliminated Profile's section
  image request.
- **Per-screen background composition:** restored the compact far-right Profile
  portrait treatment; Career and Education shift farther right; Speaking now
  uses higher-contrast translucent reading panels. Projects and Certifications
  received richer custom vector backdrops (repository graph and credential
  matrix) in the established Detroit/violet visual language.
- **Section backgrounds:** photography is now confined to a right-aligned image
  region with centered framing and a shorter left-edge fade, keeping portrait
  subjects visible without washing over the primary content. Projects and
  Certifications use dedicated geometric SVG backgrounds.
- **Career grouped into sub-sections:** *Professional experience*, *Complementary
  activities* (DevSecOps Space, DevOps Institute, AI & Robotics Lab) and *Academic
  activities* (Nixvoid, GameDevs UNI, ACM). Each group is newest→oldest.
- **Org logos are JPEG:** Career and Education now load `orgs/<slug>.jpg` (were
  `.svg`). Tech and certification logos stay SVG; speaking photos stay JPG.
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
- **Redundant Certifications atlas readout:** removed the large “Select a category
  to deploy” strip below the wheel. Tooltip, synchronized registry and an invisible
  live announcement retain the useful selection detail without a duplicate panel.
- **Career II / Parallel Map:** removed the experimental eighth tab and restored
  the original seven-screen navigation after visual comparison.

### Added
- **Certification asset upload pack:** `public/assets/ASSETS.md` now lists the
  exact 30 missing files by priority — four required category marks, 18 issuer
  marks and eight optional Azure badges — plus accepted formats, the 54 badges
  not yet wired and one-file light/dark preparation guidance.
- **Certification highlights:** the sunburst center provides a visual shortcut
  to a curated five-item signal rail and compact live plate below the registry,
  spanning experts, leadership and the featured Platform Engineering practitioner.
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
