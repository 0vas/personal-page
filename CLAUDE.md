# CLAUDE.md

The agent instructions for this project are **shared with Codex and any other
agent** in [`AGENTS.md`](./AGENTS.md) — single source of truth so every agent
produces the same result. Read it, plus `SPEC.md` (acceptance criteria) and
`CHANGELOG.md` (history), before making changes.

@AGENTS.md

## Claude Code quick reference

- Dev: `npm run dev` · Build: `npm run build` · **Tests: `npm test` (keep green)**.
- All content is in `src/data/content.js` (`{ en, es }` fields); UI copy in `src/i18n.js`.
- After any behavior change: update `SPEC.md` + its test, add a `CHANGELOG.md` entry.
- Verify visually with headless Chrome (mobile: use `--window-size=500,900`; see AGENTS.md §9).
- Don't regress the design decisions in AGENTS.md §7. Don't commit/push unless asked.
