---
name: page-visual-qa
description: Build, capture, and visually inspect every screen of the 0VAS React portfolio at desktop and mobile sizes. Use after UI, CSS, background, chart, responsive, theme, animation, or content-layout changes; when the user reports contrast, clipping, positioning, overflow, or visual regressions; and before declaring a visual change ready.
---

# Page Visual QA

Validate the rendered application, not only its source or test suite.

## Capture

From the repository root, run:

```bash
bash .codex/skills/page-visual-qa/scripts/capture-pages.sh
```

Claude may use the identical script under `.claude/skills/page-visual-qa/`.
Pass an output directory and port when needed:

```bash
bash <skill-path>/scripts/capture-pages.sh .artifacts/visual-qa 4179
```

The script builds the app, starts a temporary production server, and captures all seven routes at 1440×900 and 500×900 in both light and dark themes. It stops its own server on exit.

## Inspect

Open every PNG with the available image-viewing tool. Compare screens as a set, then inspect each at full detail.

Check:

- content contrast against the section background in light and dark themes;
- subject placement, cropping, and fade on photo backgrounds;
- clipped text, overlapping controls, and horizontal overflow;
- navigation, headings, panels, logos, ECharts, and responsive stacking;
- visual hierarchy and consistency with the Detroit/violet design contract;
- empty, broken, fallback, or visibly late-loading assets.

Do not infer visual success from `npm test` or `npm run build`. Inspect the screenshots.

## Fix and repeat

For requested implementation work, fix issues in scope and rerun the capture script until the screenshots satisfy the criteria. Preserve unrelated user changes.

Report:

- viewports and routes inspected;
- defects fixed;
- automated checks run;
- anything not visually verified.

Do not commit screenshots. The default output lives under the ignored `.artifacts/` directory.
