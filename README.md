# 0vas.com — Personal Page

Personal portfolio of **Oscar Lobaton Salas** — Platform Product Lead, DevSecOps Architect, DevOps Institute Ambassador and international speaker.

Interface concept: a **Detroit: Become Human menu system** in violet — light and dark themes, screen-based navigation (no scroll-page), parallelogram highlights with triangle motifs, corner-bracket selectors, and interactive data visualizations.

## Working with AI agents (Claude Code / Codex / …)

This repo is set up so **any** coding agent produces consistent results:

- **[`AGENTS.md`](./AGENTS.md)** — the shared contract (stack, structure, design
  rules, workflow). Read first. `CLAUDE.md` just imports it.
- **[`SPEC.md`](./SPEC.md)** — acceptance criteria, encoded as tests in
  `src/__tests__/spec.test.js`. Run `npm test` after every change (keep it green).
- **[`CHANGELOG.md`](./CHANGELOG.md)** — iteration history; add an entry per change.
- **[`public/assets/ASSETS.md`](./public/assets/ASSETS.md)** — image drop-in checklist.

## Stack

- **React 18 + Vite** — SPA with hash-based screen routing (`#/career`, `#/certifications`, …)
- **Framer Motion** — screen transitions, staggered reveals, detail-panel swaps
- **Apache ECharts** (SVG renderer) — Profile Capability Directory and the zoomable certification sunburst

## Develop / build

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # outputs dist/
npm run preview    # serve the production build
```

Keyboard: ← → switch screens. Bottom bar: theme toggle (persisted; `?theme=dark` override) and
language toggle EN/ES (persisted; `?lang=es` override; auto-detects browser language).

## Content

All content lives in `src/data/content.js` — translatable fields are `{ en, es }` objects.
Edit that file — no component changes needed.

## Where to drop your images

Everything is picked up automatically by filename; while a file is missing, a designed
placeholder / built-in glyph is shown instead.

| Folder | Filename | Used in | Notes |
|---|---|---|---|
| `public/assets/talks/` | `<slug>.jpg` — e.g. `devopsdays-lima-2025.jpg` | Speaking cards | Slugs = `slug` field of `TALKS` in `content.js`: f13-code-summit-2026, github-latam-quack-2026, devopsdays-medellin-2026, devopsdays-buenosaires-2026, innersource-summit-2025, agile-summit-2025, devopsdays-santiago-2025, devopsdays-lima-2025, devsecopsfest-2024, devopsdays-medellin-2024, github-connect-2024. Landscape ~16:9. |
| `public/assets/certs/` | `<icon>.svg` — e.g. `microsoft.svg`, `redhat.svg` | Certification registry rows | Names = `icon` field in `CERT_CATEGORIES`: microsoft, github, platform, redhat, google, aws, oracle, ibm, hashicorp, codefresh, linuxfoundation, fluidattacks, openbootcamp, mckinsey, harvard, iep, pmi, certiprof, atlassian, samsung, cisco. Unknown issuers fall back to a generic mark. |
| `public/assets/orgs/` | `<slug>.svg` — e.g. `credicorp.svg`, `uni.svg` | Career detail panel (company/institution logo) | Slugs = `logo` field of `CAREER_DETAILS`: credicorp, pacifico, baufest, nocountry, novatronic, freelance, gamedevs, acm, nixvoid, ailab, devopsinstitute, devsecopsspace, uni, hanyang. |
| `public/assets/` | `profile.png` | Hero photo + backdrop portrait | Portrait ~4:5. |
| `public/assets/` | `OscarLobatonS-CV-EN.pdf` | "Download CV" buttons | Replace to update. |

Good SVG sources for issuer logos: the official brand pages, or [simple-icons](https://simpleicons.org/) / [devicon](https://devicon.dev/) (download the `.svg`, rename to the slug above).

## Deploy to 0vas.com (GitHub Pages)

1. Push to GitHub (`main` branch). The included workflow `.github/workflows/deploy.yml` builds and publishes automatically — set repo **Settings → Pages → Source: GitHub Actions**.
2. In **Settings → Pages → Custom domain**, save `0vas.com`. With a GitHub Actions source this setting is authoritative; `public/CNAME` mirrors the intended domain in the built artifact but does not replace the Pages setting.
3. DNS at your registrar:
   - `A` records for apex `0vas.com`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` record for `www` → `0vas.github.io`
4. Wait for the DNS check and **certificate provisioning** to finish, then enable **Enforce HTTPS**. If GitHub reports that the certificate does not exist after 24 hours, remove and re-save the same custom domain to restart provisioning; keep the DNS records above unchanged.
5. Verify that HTTP redirects and that the issued certificate contains `0vas.com`:

   ```bash
   curl -I http://0vas.com
   openssl s_client -connect 0vas.com:443 -servername 0vas.com </dev/null 2>/dev/null \
     | openssl x509 -noout -ext subjectAltName
   ```

## Slides subdomain (`slides.0vas.com`)

The Speaking screen's **VIEW SLIDES** button opens `https://slides.0vas.com`, which
serves the separate **`0vas/slides`** repo (currently at `0vas.github.io/slides/`).
A subdomain can point to a different repo than the apex — set it up once:

1. **In the `0vas/slides` repo** → Settings → Pages → **Custom domain** = `slides.0vas.com`
   (this writes a `CNAME` file containing `slides.0vas.com`). Then enable **Enforce HTTPS**
   once the certificate is provisioned.
2. **DNS at GoDaddy** — add one record: `CNAME`, Name `slides`, Value `0vas.github.io`
   (TTL 1 hour). Do **not** touch the apex `A`/`www` records.
3. **Base path:** if the slides were built for `/slides/` (project-page base), set the
   slides project's base to `/` and rebuild, or assets will 404 at the subdomain root.
4. Verify: `curl -I https://slides.0vas.com` (expect `200`, `server: GitHub.com`).
