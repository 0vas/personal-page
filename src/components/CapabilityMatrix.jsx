import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import EChart from "./EChart.jsx";
import { SKILLS } from "../data/content.js";
import { L } from "../i18n.js";
import { chartColors } from "../theme-colors.js";

const SERIES_ID = "profile-capability-directory";
const TOTAL_CAPABILITIES = SKILLS.reduce((total, group) => total + group.items.length, 0);
const domainId = (index) => `capability-domain-${index}`;

function renderCapabilityRow(params, api, context) {
  const {
    activeDomain, colors, compact, copy, cursorDomain, items,
  } = context;
  const item = items[params.dataIndexInside];
  if (!item) return null;

  const width = api.getWidth();
  const height = api.getHeight();
  const columns = activeDomain < 0 ? 1 : compact ? 1 : 2;
  const rows = Math.ceil(items.length / columns);
  const insetX = compact ? 2 : 4;
  const gapX = activeDomain < 0 || compact ? 0 : 22;
  const cellWidth = (width - insetX * 2 - gapX * (columns - 1)) / columns;
  const maxRowHeight = compact ? 41 : activeDomain < 0 ? 43 : 49;
  const rowHeight = Math.min(maxRowHeight, (height - 8) / rows);
  const contentHeight = rowHeight * rows;
  const top = Math.max(4, (height - contentHeight) / 2);
  const column = params.dataIndexInside % columns;
  const row = Math.floor(params.dataIndexInside / columns);
  const x = insetX + column * (cellWidth + gapX);
  const y = top + row * rowHeight;
  const centerY = y + rowHeight / 2;
  const isDomain = item.kind === "domain";
  const active = isDomain && item.domainIndex === cursorDomain;
  const indexLabel = String((isDomain ? item.domainIndex : item.skillIndex) + 1).padStart(2, "0");
  const markerX = x + (compact ? 39 : 43);
  const titleX = x + (compact ? 57 : 63);

  return {
    type: "group",
    focus: "self",
    children: [
      {
        type: "rect",
        shape: { x, y: y + 1, width: cellWidth, height: rowHeight - 2 },
        style: { fill: active ? colors.accentSoft : "transparent" },
        emphasis: { style: { fill: colors.accentSoft } },
        transition: ["shape", "style"],
      },
      {
        type: "rect",
        shape: { x, y: y + 7, width: 2, height: Math.max(12, rowHeight - 14) },
        style: { fill: active ? colors.accent : "transparent" },
        emphasis: { style: { fill: colors.accent } },
        transition: ["shape", "style"],
      },
      {
        type: "line",
        shape: { x1: x, y1: y + rowHeight - 1, x2: x + cellWidth, y2: y + rowHeight - 1 },
        style: { stroke: colors.lineSoft, lineWidth: 1 },
      },
      {
        type: "rect",
        shape: { x: markerX - 3.5, y: centerY - 3.5, width: 7, height: 7 },
        rotation: Math.PI / 4,
        originX: markerX,
        originY: centerY,
        style: {
          fill: active ? colors.accent : "transparent",
          stroke: active ? colors.accent : colors.line,
          lineWidth: 1,
        },
        emphasis: { style: { fill: colors.accent, stroke: colors.accent } },
      },
      {
        type: "text",
        style: {
          x: x + 9,
          y: centerY,
          text: indexLabel,
          fill: active ? colors.accent : colors.faint,
          font: api.font({ fontFamily: colors.mono, fontSize: compact ? 7 : 7.5, fontWeight: 500 }),
          textVerticalAlign: "middle",
        },
        emphasis: { style: { fill: colors.accent } },
      },
      {
        type: "text",
        style: {
          x: titleX,
          y: centerY,
          text: item.name,
          fill: colors.ink,
          font: api.font({ fontFamily: colors.ui, fontSize: compact ? 10.5 : 11.5, fontWeight: 500 }),
          textVerticalAlign: "middle",
          width: Math.max(60, cellWidth - (isDomain ? 188 : 76)),
          overflow: "break",
        },
        emphasis: { style: { fill: colors.accent } },
      },
      ...(isDomain ? [{
        type: "text",
        style: {
          x: x + cellWidth - 12,
          y: centerY,
          text: `${String(item.count).padStart(2, "0")} ${copy.matrixTechnologies}`,
          fill: active ? colors.accent : colors.dim,
          font: api.font({ fontFamily: colors.mono, fontSize: compact ? 6.5 : 7, fontWeight: 500 }),
          textAlign: "right",
          textVerticalAlign: "middle",
        },
        emphasis: { style: { fill: colors.accent } },
      }] : []),
    ],
  };
}

function capabilityOption({ activeDomain, copy, cursorDomain, lang, reduceMotion, theme }) {
  const colors = chartColors(theme);
  const groups = SKILLS.map((group, domainIndex) => {
    const category = {
      id: domainId(domainIndex),
      groupId: domainId(domainIndex),
      name: L(group.name, lang),
      value: [domainIndex, group.items.length],
      count: group.items.length,
      kind: "domain",
      domainIndex,
    };
    const skills = group.items.map((item, skillIndex) => ({
      id: `capability-${domainIndex}-${item.s}`,
      groupId: domainId(domainIndex),
      name: item.n,
      value: [skillIndex, 1],
      count: 1,
      kind: "skill",
      domainIndex,
      skillIndex,
      group: L(group.name, lang),
    }));
    return { category, skills };
  });
  const data = activeDomain < 0
    ? groups.map(({ category }) => category)
    : groups[activeDomain].skills;
  const compact = typeof window !== "undefined" && window.innerWidth <= 720;

  return {
    backgroundColor: "transparent",
    animation: !reduceMotion,
    animationDuration: reduceMotion ? 0 : 260,
    animationDurationUpdate: reduceMotion ? 0 : 360,
    animationEasing: "cubicOut",
    animationEasingUpdate: "cubicInOut",
    aria: {
      enabled: true,
      description: copy.matrixAria,
      decal: { show: false },
    },
    tooltip: {
      show: true,
      renderMode: "html",
      appendTo: "body",
      className: "capability-tooltip",
      confine: true,
      enterable: false,
      formatter: ({ data: item }) => item?.kind === "skill"
        ? `<strong>${item.name}</strong><small>${item.group}</small>`
        : `<strong>${item?.name || copy.matrixOverview}</strong><small>${item?.count || TOTAL_CAPABILITIES} ${copy.matrixTechnologies}</small>`,
      backgroundColor: colors.panel,
      borderColor: colors.line,
      borderWidth: 1,
      padding: [9, 12],
      textStyle: { color: colors.ink, fontFamily: colors.ui, fontSize: 12 },
      extraCssText: "z-index: 75; pointer-events: none;",
    },
    series: [{
      id: SERIES_ID,
      type: "custom",
      coordinateSystem: "none",
      data,
      renderItem: (params, api) => renderCapabilityRow(params, api, {
        activeDomain,
        colors,
        compact,
        copy,
        cursorDomain,
        items: data,
      }),
      universalTransition: reduceMotion ? false : { enabled: true, divideShape: "clone" },
      silent: false,
      clip: false,
    }],
  };
}

export default function CapabilityMatrix({ lang, theme, copy }) {
  const chartRef = useRef(null);
  const reduceMotion = Boolean(useReducedMotion());
  const [activeDomain, setActiveDomain] = useState(-1);
  const [cursorDomain, setCursorDomain] = useState(0);

  const resetMatrix = useCallback(() => {
    setActiveDomain(-1);
  }, []);

  const selectDomain = useCallback((index) => {
    setCursorDomain(index);
    setActiveDomain(index);
  }, []);

  const option = useMemo(
    () => capabilityOption({
      activeDomain,
      copy,
      cursorDomain,
      lang,
      reduceMotion,
      theme,
    }),
    [activeDomain, copy, cursorDomain, lang, reduceMotion, theme],
  );

  useEffect(() => {
    setActiveDomain(-1);
    setCursorDomain(0);
  }, [lang, theme]);

  useEffect(() => {
    const onEscape = (event) => {
      if (event.key !== "Escape" || activeDomain < 0) return;
      event.preventDefault();
      resetMatrix();
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [activeDomain, resetMatrix]);

  const onEvents = useMemo(() => ({
    click: ({ data: item }) => {
      if (item?.kind === "domain") selectDomain(item.domainIndex);
    },
    mouseover: ({ data: item }) => {
      if (activeDomain < 0 && item?.kind === "domain") setCursorDomain(item.domainIndex);
    },
  }), [activeDomain, selectDomain]);

  const onDirectoryKeyDown = (event) => {
    if (event.key === "Escape" && activeDomain >= 0) {
      event.preventDefault();
      event.stopPropagation();
      resetMatrix();
      return;
    }
    if (activeDomain >= 0) return;
    const keyTargets = {
      ArrowDown: (cursorDomain + 1) % SKILLS.length,
      ArrowRight: (cursorDomain + 1) % SKILLS.length,
      ArrowUp: (cursorDomain - 1 + SKILLS.length) % SKILLS.length,
      ArrowLeft: (cursorDomain - 1 + SKILLS.length) % SKILLS.length,
      Home: 0,
      End: SKILLS.length - 1,
    };
    if (event.key in keyTargets) {
      event.preventDefault();
      event.stopPropagation();
      setCursorDomain(keyTargets[event.key]);
      return;
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();
      selectDomain(cursorDomain);
    }
  };

  const selectedGroup = activeDomain >= 0 ? SKILLS[activeDomain] : null;
  const selectedName = selectedGroup ? L(selectedGroup.name, lang) : copy.matrixOverview;
  const selectedCount = selectedGroup?.items.length ?? TOTAL_CAPABILITIES;
  const liveCopy = selectedGroup
    ? `${selectedName}. ${selectedCount} ${copy.matrixTechnologies}.`
    : `${copy.matrixOverview}. ${copy.matrixHint}`;

  return (
    <section className="capability-matrix brk" aria-labelledby="capability-matrix-title">
      <header className="capability-head">
        <div>
          <p className="capability-kicker">{copy.matrixKicker}</p>
          <h2 id="capability-matrix-title">{selectedName}</h2>
          <p className="capability-head-meta">
            {selectedGroup ? `${selectedCount} ${copy.matrixTechnologies}` : copy.matrixHint}
          </p>
        </div>
        <button
          type="button"
          className="capability-back"
          onClick={resetMatrix}
          disabled={activeDomain < 0}
          aria-hidden={activeDomain < 0}
          tabIndex={activeDomain < 0 ? -1 : 0}
        >
          <span aria-hidden="true">‹</span> {copy.matrixBack}
        </button>
      </header>

      <div
        className="capability-chart-shell"
        role="listbox"
        tabIndex={0}
        aria-label={copy.matrixHint}
        aria-activedescendant={activeDomain < 0 ? `capability-domain-option-${cursorDomain}` : undefined}
        onKeyDown={onDirectoryKeyDown}
      >
        <div className="sr-only">
          {activeDomain < 0 && SKILLS.map((group, index) => (
            <span
              key={L(group.name, "en")}
              id={`capability-domain-option-${index}`}
              role="option"
              aria-selected={cursorDomain === index}
            >
              {L(group.name, lang)}. {group.items.length} {copy.matrixTechnologies}.
            </span>
          ))}
        </div>
        <EChart
          ref={chartRef}
          className="capability-chart"
          style={{ width: "100%", height: "100%" }}
          option={option}
          onEvents={onEvents}
          notMerge={false}
        />
      </div>

      <p className="sr-only" aria-live="polite">{liveCopy}</p>
      <ul className="sr-only">
        {SKILLS.flatMap((group) => group.items.map((item) => (
          <li key={`${L(group.name, "en")}-${item.n}`}>{L(group.name, lang)}: {item.n}</li>
        )))}
      </ul>
    </section>
  );
}
