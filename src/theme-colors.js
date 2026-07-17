/* JS mirror of the CSS theme tokens, for ECharts options */

export function chartColors(theme) {
  const dark = theme === "dark";
  return {
    mono: "'IBM Plex Mono', monospace",
    ui: "'Jost', sans-serif",
    ink: dark ? "#ece9f7" : "#2b2836",
    dim: dark ? "#b8b1cc" : "#746e89",
    faint: dark ? "#8b84a3" : "#a9a3bd",
    accent: dark ? "#9d7bff" : "#6f4bf2",
    accentSoft: dark ? "rgba(157,123,255,0.16)" : "rgba(111,75,242,0.13)",
    line: dark ? "rgba(236,233,247,0.42)" : "rgba(43,40,54,0.28)",
    lineSoft: dark ? "rgba(236,233,247,0.18)" : "rgba(43,40,54,0.14)",
    bg: dark ? "#0d0a17" : "#f7f5fc",
    panel: dark ? "#141020" : "#ffffff",
    gold: dark ? "#d4b46a" : "#a8842e",
    /* violet ramp for multi-series (sunburst) */
    ramp: dark
      ? ["#9d7bff", "#7c5cf0", "#b79dff", "#6247c4", "#8a72e0", "#cbb8ff", "#54409e", "#a58cff"]
      : ["#6f4bf2", "#9f86ff", "#5636c9", "#8a6cf7", "#b7a4f0", "#4529a8", "#7c5cf0", "#a58cff"],
  };
}
