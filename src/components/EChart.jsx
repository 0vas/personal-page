import { useEffect, useRef } from "react";
import * as echarts from "echarts/core";
import { SunburstChart } from "echarts/charts";
import { TooltipComponent, GraphicComponent } from "echarts/components";
import { SVGRenderer } from "echarts/renderers";

// Only the certifications sunburst uses ECharts now (radar/tree were removed).
echarts.use([SunburstChart, TooltipComponent, GraphicComponent, SVGRenderer]);

export default function EChart({ option, onEvents, style, className }) {
  const ref = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = echarts.init(ref.current, null, { renderer: "svg" });
    chartRef.current = chart;
    // Guard against no-op resizes (sub-pixel / scrollbar jitter) that would
    // otherwise re-render the chart needlessly during a transition.
    let lastW = 0, lastH = 0;
    const ro = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      if (Math.abs(width - lastW) < 1 && Math.abs(height - lastH) < 1) return;
      lastW = width; lastH = height;
      chart.resize();
    });
    ro.observe(ref.current);
    return () => {
      ro.disconnect();
      chart.dispose();
      chartRef.current = null;
    };
  }, []);

  useEffect(() => {
    // The sunburst itself renders instantly (option carries `animation: false`);
    // Certs plays the level-change "deploy" as a robust container animation.
    if (chartRef.current && option) chartRef.current.setOption(option, { notMerge: true, lazyUpdate: true });
  }, [option]);

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart || !onEvents) return;
    const entries = Object.entries(onEvents);
    entries.forEach(([evt, fn]) => chart.on(evt, fn));
    return () => entries.forEach(([evt, fn]) => chart.off(evt, fn));
  }, [onEvents]);

  return <div ref={ref} style={style} className={className} />;
}
