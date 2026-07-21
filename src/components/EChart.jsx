import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import * as echarts from "echarts/core";
import { CustomChart, SunburstChart } from "echarts/charts";
import { AriaComponent, TooltipComponent, GraphicComponent } from "echarts/components";
import { SVGRenderer } from "echarts/renderers";

// The certifications atlas and Profile capability signal deck share one lightweight
// SVG ECharts runtime.
echarts.use([SunburstChart, CustomChart, TooltipComponent, GraphicComponent, AriaComponent, SVGRenderer]);

const EChart = forwardRef(function EChart({ option, onEvents, style, className, notMerge = true }, forwardedRef) {
  const domRef = useRef(null);
  const chartRef = useRef(null);

  useImperativeHandle(forwardedRef, () => ({
    dispatchAction(payload) {
      chartRef.current?.dispatchAction(payload);
    },
    rootToNode(seriesId, targetNodeId) {
      chartRef.current?.dispatchAction({ type: "sunburstRootToNode", seriesId, targetNodeId });
    },
    rootToTop(seriesId) {
      const chart = chartRef.current;
      const series = chart?.getModel().queryComponents({ mainType: "series", id: seriesId })[0];
      const targetNode = series?.getData().tree.root;
      if (chart && targetNode) chart.dispatchAction({ type: "sunburstRootToNode", seriesId, targetNode });
    },
  }), []);

  useEffect(() => {
    const chart = echarts.init(domRef.current, null, { renderer: "svg" });
    chartRef.current = chart;
    // Guard against no-op resizes (sub-pixel / scrollbar jitter) that would
    // otherwise re-render the chart needlessly during a transition.
    let lastW = 0, lastH = 0;
    let resizeFrame = 0;
    const ro = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      if (Math.abs(width - lastW) < 1 && Math.abs(height - lastH) < 1) return;
      lastW = width; lastH = height;
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(() => chart.resize());
    });
    ro.observe(domRef.current);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(resizeFrame);
      chart.dispose();
      chartRef.current = null;
    };
  }, []);

  useEffect(() => {
    // Certs keeps one stable option while drilling, so native root-to-node
    // actions can animate without React replacing the series mid-transition.
    // A full option replacement is reserved for real configuration changes
    // such as theme, language or reduced-motion preference.
    if (chartRef.current && option) chartRef.current.setOption(option, { notMerge, lazyUpdate: true });
  }, [notMerge, option]);

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart || !onEvents) return;
    const entries = Object.entries(onEvents);
    entries.forEach(([evt, fn]) => chart.on(evt, fn));
    return () => entries.forEach(([evt, fn]) => chart.off(evt, fn));
  }, [onEvents]);

  return <div ref={domRef} style={style} className={className} />;
});

export default EChart;
