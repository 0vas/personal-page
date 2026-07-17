# Drop-in assets checklist

Everything is picked up automatically by filename. While a file is missing, a
designed placeholder / built-in glyph / clean gradient is shown instead — so you
can replace these gradually. All paths are under `public/assets/`.

## 1. Section backgrounds — `bg/` (NEW)

Washed-out, per-section background image (like the Detroit menus). Landscape,
ideally 2000×1200+. Missing → clean violet gradient (no photo).

- [x] `bg/home.jpg` — retained but unused; Home now uses code-native animation
- [ ] `bg/career.jpg`
- [ ] `bg/speaking.jpg`
- [x] `bg/projects.svg` — generated geometric repository/network artwork
- [ ] `bg/education.jpg`
- [x] `bg/certifications.svg` — generated radial credential artwork
- [ ] `bg/contact.jpg`

## 2. Profile photo — root

- [ ] `profile.png` — hero ID card (portrait ~4:5). Already present; replace to update.
- [x] `profile-retouched.jpg` — conservative retouch used by Home; original preserved.

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

## 4. Certification logos — `certs/` (SVG preferred)

Category marks (wheel + drilled center + ledger headers). **Required &
asset-only:** these render the file you supply or stay blank — there is no
built-in glyph fallback here, so a missing file shows an empty logo slot.
- [x] `certs/azure.svg`
- [x] `certs/github.svg`
- [ ] `certs/platform.svg`  ← missing (shows blank until supplied)
- [x] `certs/redhat.svg`
- [ ] `certs/cloud.svg`  ← missing (multi-cloud mark)
- [x] `certs/devops.svg`
- [x] `certs/leadership.svg`
- [ ] `certs/data.svg`  ← missing
- [ ] `certs/security.svg`  ← missing

Issuer marks (shown on each ledger row):
- [ ] `certs/microsoft.svg`
- [ ] `certs/google.svg`
- [ ] `certs/aws.svg`
- [ ] `certs/oracle.svg`
- [ ] `certs/ibm.svg`
- [ ] `certs/hashicorp.svg`
- [ ] `certs/codefresh.svg`
- [ ] `certs/linuxfoundation.svg`
- [ ] `certs/fluidattacks.svg`
- [ ] `certs/openbootcamp.svg`
- [ ] `certs/mckinsey.svg`
- [ ] `certs/harvard.svg`
- [ ] `certs/iep.svg`
- [ ] `certs/pmi.svg`
- [ ] `certs/certiprof.svg`
- [ ] `certs/atlassian.svg`
- [ ] `certs/samsung.svg`
- [ ] `certs/cisco.svg`

Certification badges — `certs/badges/` (**PNG preferred**, jpg/webp/svg ok):
shown on each slice when you drill into a category. If a file is missing the
slice falls back to the certification name as text, so these are all optional.
The filename must match the `badge` slug in `src/data/content.js`.
- [ ] `certs/badges/azure-solutions-architect.png`
- [ ] `certs/badges/azure-devops-engineer.png`
- [ ] `certs/badges/azure-developer.png`
- [ ] `certs/badges/azure-ai-engineer.png`
- [ ] `certs/badges/azure-administrator.png`
- [ ] `certs/badges/azure-fundamentals.png`
- [ ] `certs/badges/azure-data-fundamentals.png`
- [ ] `certs/badges/azure-ai-fundamentals.png`

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

## 6. Technology logos — `tech/` (SVG)

Skill chips on Home. Slugs:
`azure, googlecloud, aws, oraclecloud, githubactions, jenkins, azuredevops,
terraform, docker, kubernetes, openshift, gitops, langchain, agents, mcp, rag,
finetuning, prompt, python, bash, cpp, csharp, java, javascript, togaf, c4,
bpmn, uml, cmmi, oracledb, postgresql, mongodb, powerbi, unity, ar`

→ `tech/<slug>.svg` for each.

---

**Tip:** grab SVGs from [simpleicons.org](https://simpleicons.org) or
[devicon.dev](https://devicon.dev), rename to the slug above. Representative
category marks (cloud / devops / leadership / data / security) have no single
brand — use any clean icon or leave the built-in glyph.
