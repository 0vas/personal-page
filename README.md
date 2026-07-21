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
| `public/assets/talks/` | `<slug>.jpg` — e.g. `devopsdays-lima-2025.jpg` | Speaking cards | Slugs = `slug` field of `TALKS` in `content.js`: devopsdays-medellin-2026, devopsdays-buenosaires-2026, innersource-summit-2025, agile-summit-2025, devopsdays-santiago-2025, devopsdays-lima-2025, devsecopsfest-2024, devopsdays-medellin-2024, github-connect-2024, githubweek-2024. Landscape ~16:9. |
| `public/assets/certs/` | `<icon>.svg` — e.g. `microsoft.svg`, `redhat.svg` | Certification registry rows | Names = `icon` field in `CERT_CATEGORIES`: microsoft, github, platform, redhat, google, aws, oracle, ibm, hashicorp, codefresh, linuxfoundation, fluidattacks, openbootcamp, mckinsey, harvard, iep, pmi, certiprof, atlassian, samsung, cisco. Unknown issuers fall back to a generic mark. |
| `public/assets/orgs/` | `<slug>.svg` — e.g. `credicorp.svg`, `uni.svg` | Career detail panel (company/institution logo) | Slugs = `logo` field of `CAREER_DETAILS`: credicorp, pacifico, baufest, nocountry, novatronic, freelance, gamedevs, acm, nixvoid, ailab, devopsinstitute, devsecopsspace, uni, hanyang. |
| `public/assets/` | `profile.png` | Hero photo + backdrop portrait | Portrait ~4:5. |
| `public/assets/` | `OscarLobatonS-CV-EN.pdf` | "Download CV" buttons | Replace to update. |

Good SVG sources for issuer logos: the official brand pages, or [simple-icons](https://simpleicons.org/) / [devicon](https://devicon.dev/) (download the `.svg`, rename to the slug above).

## Deploy to 0vas.com (GitHub Pages)

1. Push to GitHub (`main` branch). The included workflow `.github/workflows/deploy.yml` builds and publishes automatically — set repo **Settings → Pages → Source: GitHub Actions**.
2. Add the custom domain: create `public/CNAME` containing `0vas.com` (it gets copied into the build), or set it in Settings → Pages.
3. DNS at your registrar:
   - `A` records for apex `0vas.com`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` record for `www` → `0vas.github.io`
4. Enable **Enforce HTTPS**.
