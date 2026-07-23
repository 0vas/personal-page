# Drop-in assets checklist

Everything is picked up automatically by filename. Most missing files use a
designed placeholder / built-in glyph / clean gradient, so they can be replaced
gradually. Certification category marks are the documented exception: their
logo slots remain empty until the required asset is supplied. All paths are
under `public/assets/`.

## 0. Site identity — code-managed

- [x] `favicon.png` — the browser icon: the owner-generated **flat geometric violet
  turtle** (top-down, hexagonal shell with a light/dark-violet split, angular flippers),
  transparent, downscaled to 256px so it reads on light and dark tabs. Linked +
  cache-busted from `index.html`. Drop another transparent PNG here to replace it.
- [x] `turtle-home-light.png` / `turtle-home-dark.png` — Profile hero ambient
  illustration, **per theme**: a tribal/Polynesian sea turtle flanked by jellyfish
  (light = violet; dark = neon violet + cyan). Transparent PNGs, ~627px. Loaded by
  `<ProfileTurtle theme>`, which falls back to `turtle-home.png`, then a code-native
  line-art turtle. Generate on a solid green screen and export transparent (avoids
  white halos); drop replacements here — no code change.
- [x] `turtle-home.png` — shared/legacy fallback used when a per-theme file is missing.
- [x] `ambient.mp3` (or `.m4a`/`.ogg`/`.wav`) — background music. When present, a music
  toggle appears left of OPTIONS (icon-only, off by default, loops at low volume, never
  autoplays). Currently **FiftySounds "Arcano"** (commercial licence). ⚠️ The licence
  **requires attribution** — the credit `Music: "Arcano" — FiftySounds` (link to
  `fiftysounds.com`) is rendered in Contact's footer. If you swap the track, update that
  credit to match the new source's licence.

## 1. Section backgrounds — `bg/` (NEW)

Washed-out, per-section background image (like the Detroit menus). Landscape,
ideally 2000×1200+. Missing → clean violet gradient (no photo).

- [x] `bg/home.jpg` — legacy file retained but unused; Profile uses code-native animation and has no `bg/profile.*`
- [ ] `bg/career.jpg`
- [ ] `bg/speaking.jpg`
- [x] `bg/projects.svg` — generated geometric repository/network artwork
- [ ] `bg/education.jpg`
- [x] `bg/certifications.svg` — generated radial credential artwork
- [ ] `bg/contact.jpg`

## 2. Profile photo — root

- [ ] `profile.png` — hero ID card (portrait ~4:5). Already present; replace to update.
- [x] `profile-retouched.jpg` — conservative retouch used by Profile; original preserved.

## 3. Speaking photos — `talks/` (JPG/JPEG; mixed ratios supported)

- [x] `talks/devopsdays-medellin-2026.jpeg`
- [x] `talks/devopsdays-buenosaires-2026.jpeg`
- [x] `talks/agile-summit-2025.jpeg`
- [x] `talks/innersource-summit-2025.jpeg`
- [x] `talks/devopsdays-santiago-2025.jpeg`
- [x] `talks/devopsdays-lima-2025.jpeg`
- [x] `talks/devsecopsfest-2024.jpeg`
- [x] `talks/devopsdays-medellin-2024.jpeg`
- [x] `talks/github-connect-2024.jpeg`

## 4. Certifications — prioritized upload pack (30 missing files)

Use the exact lowercase basename shown below. Logos accept `.svg`, `.png`,
`.jpg`, `.jpeg` or `.webp` (in that lookup order); **SVG is preferred**. Badges
accept `.png`, `.webp`, `.jpg`, `.jpeg` or `.svg` (in that lookup order);
**transparent PNG is preferred**.

### P0 — required category marks (4 missing)

These appear on the wheel, drilled center and ledger headers. They are
asset-only and have no glyph fallback, so the slot stays empty while missing.
`platform` also supplies the issuer mark for its four certification rows.
These four files are the only mandatory uploads needed to complete all nine
category diamonds; every P1–P3 item below has a working fallback or is optional.

- [ ] `certs/platform.svg`
- [ ] `certs/cloud.svg` — representative multi-cloud mark
- [ ] `certs/data.svg` — representative Data & AI mark
- [ ] `certs/security.svg` — representative security mark

Already present: `certs/azure.svg`, `certs/github.svg`, `certs/redhat.svg`,
`certs/devops.svg` and `certs/leadership.svg`.

### P1 — high-impact issuer marks (7 missing)

Issuer marks appear in ledger rows, the featured signal rail and its live plate.
A missing file uses a built-in or generic glyph, so these can follow the category
marks. Ordered by the number of certification rows improved:

- [ ] `certs/microsoft.svg` — 8 rows
- [ ] `certs/ibm.svg` — 7 rows
- [ ] `certs/google.svg` — 5 rows
- [ ] `certs/oracle.svg` — 4 rows
- [ ] `certs/pmi.svg` — 3 rows
- [ ] `certs/certiprof.svg` — 3 rows
- [ ] `certs/cisco.svg` — 2 rows

### P2 — remaining issuer marks (11 missing)

Each improves one certification row:

- [ ] `certs/aws.svg`
- [ ] `certs/hashicorp.svg`
- [ ] `certs/codefresh.svg`
- [ ] `certs/linuxfoundation.svg`
- [ ] `certs/fluidattacks.svg`
- [ ] `certs/openbootcamp.svg`
- [ ] `certs/mckinsey.svg`
- [ ] `certs/harvard.svg`
- [ ] `certs/iep.svg`
- [ ] `certs/atlassian.svg`
- [ ] `certs/samsung.svg`

`github` and `redhat` issuer marks reuse their already-present category files;
`platform` is counted once in P0. This leaves exactly 22 unique missing logos:
4 category marks + 18 additional issuer marks.

### P3 — optional Azure slice badges (8 missing)

Create `certs/badges/` and use the exact `badge` slug from
`src/data/content.js`. These are shown only after drilling into Azure; while a
file is missing, its slice keeps the complete certification name plus the
issuer asset/glyph, so these files are optional visual upgrades.

- [ ] `certs/badges/azure-solutions-architect.png`
- [ ] `certs/badges/azure-devops-engineer.png`
- [ ] `certs/badges/azure-developer.png`
- [ ] `certs/badges/azure-ai-engineer.png`
- [ ] `certs/badges/azure-administrator.png`
- [ ] `certs/badges/azure-fundamentals.png`
- [ ] `certs/badges/azure-data-fundamentals.png`
- [ ] `certs/badges/azure-ai-fundamentals.png`

The other **54 certifications do not yet define a `badge` slug**. Do not upload
badges for them yet: an unregistered filename will not be discovered or shown
until that certification is wired in `src/data/content.js`.

### Theme-safe requirement (light + dark)

Every certification asset must be **theme-safe**: use a transparent background,
a tight square `viewBox`/canvas, no external fonts, and artwork that remains
legible over both near-white and near-black panels. Avoid pure-black-only and
pure-white-only artwork; prefer the official brand colors plus a subtle
contrasting keyline when necessary. The current loader uses the **same file** in
light and dark mode and does not recognize `-light` / `-dark` variants, so one
uploaded asset must work in both themes. For badges, use a transparent square
PNG of 256–512 px (or a clean SVG); the UI scales it into a compact radial mark.

## 5. Company / institution logos — `orgs/` (**JPEG**)

> Career and Education use **`.jpg`** here (not SVG). Square-ish images work best.

**Career → Professional experience**
- [ ] `orgs/credicorp.jpg`   (used for Platform Product Lead + Corporate Architect)
- [ ] `orgs/pacifico.jpg`
- [ ] `orgs/baufest.jpg`
- [ ] `orgs/nocountry.jpg`
- [ ] `orgs/novatronic.jpg`
- [ ] `orgs/freelance.jpg`   (optional)

**Career → Complementary activities**
- [ ] `orgs/devsecopsspace.jpg`
- [ ] `orgs/devopsinstitute.jpg`
- [ ] `orgs/ailab.jpg`

**Career → Academic activities**
- [ ] `orgs/nixvoid.jpg`
- [ ] `orgs/gamedevs.jpg`
- [ ] `orgs/acm.jpg`

**Education**
- [ ] `orgs/uni.jpg`
- [ ] `orgs/mit.jpg`
- [ ] `orgs/hanyang.svg`

## 6. Reserved technology identifiers — `tech/`

**No upload is currently required.** Profile's minimal ECharts Capability
Directory is deliberately text-first and does not render technology logos. The
folder and slugs remain documented only as stable content identifiers for a
possible future owner-approved use:
`azure, googlecloud, aws, oraclecloud, githubactions, jenkins, azuredevops,
terraform, docker, kubernetes, openshift, gitops, langchain, agents, mcp, rag,
finetuning, prompt, python, bash, cpp, csharp, java, javascript, togaf, c4,
bpmn, uml, cmmi, oracledb, postgresql, mongodb, powerbi, unity, ar`

Reserved pattern: `tech/<slug>.svg`.

## 7. Brand / verifier marks — `brands/`

- [x] `brands/credly.png` — owner-supplied official Credly mark, transparent
  RGBA. Reused beside the outbound Credly links in Profile, Contact and the
  Certifications verification note. Keep it here rather than under `certs/`:
  Credly verifies the registry but is not the issuer of its credentials. The
  built-in monochrome glyph remains the graceful load fallback.
- [x] `brands/linkedin.png` — owner-supplied official LinkedIn mark (blue circle,
  white “in”), transparent RGBA. The `in` counter was composited white so it stays
  on-brand on both light and dark chrome. Shown beside the LinkedIn links in Profile,
  Contact and the Certifications note; falls back to the built-in `linkedin` glyph.

---

Required certification category marks cannot be left to a built-in glyph.
