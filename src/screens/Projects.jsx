import { useRef, useState } from "react";
import { Icon } from "../components/Icons.jsx";
import { PROJECTS, LINKS } from "../data/content.js";
import { L, STRINGS } from "../i18n.js";

function BlueprintFrame({ children, label }) {
  return (
    <svg className="project-blueprint" viewBox="0 0 720 280" role="img" aria-label={label}>
      <defs>
        <linearGradient id="blueprint-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--accent)" />
          <stop offset=".62" stopColor="var(--geo-active)" />
          <stop offset="1" stopColor="var(--accent-2)" />
        </linearGradient>
        <pattern id="blueprint-grid" width="28" height="28" patternUnits="userSpaceOnUse">
          <path d="M28 0H0V28" className="blueprint-grid-line" />
        </pattern>
      </defs>
      <rect width="720" height="280" fill="url(#blueprint-grid)" />
      <path className="blueprint-axis" d="M26 24H84M26 24V82M694 256H636M694 256V198" />
      {children}
    </svg>
  );
}

function ProjectBlueprint({ type, label }) {
  if (type === "quadrant") {
    return (
      <BlueprintFrame label={label}>
        <g className="blueprint-enter">
          <rect className="blueprint-line blueprint-surface" x="170" y="30" width="380" height="220" rx="4" />
          <path className="blueprint-line" d="M360 30V250M170 140H550" />
          <path className="blueprint-muted" d="M202 64H276M444 64H518M202 216H276M444 216H518" />
          <circle className="blueprint-node" cx="230" cy="84" r="8" />
          <circle className="blueprint-node" cx="490" cy="84" r="8" />
          <circle className="blueprint-node" cx="230" cy="196" r="8" />
          <circle className="blueprint-node" cx="490" cy="196" r="8" />
          <path className="blueprint-signal" d="M230 84C282 84 303 140 360 140S438 196 490 196" />
          <rect className="blueprint-core" x="351" y="131" width="18" height="18" transform="rotate(45 360 140)" />
          <text x="188" y="53">Q1</text><text x="518" y="53">Q2</text>
          <text x="188" y="238">Q3</text><text x="518" y="238">Q4</text>
        </g>
      </BlueprintFrame>
    );
  }

  if (type === "wiki-flow") {
    return (
      <BlueprintFrame label={label}>
        <g className="blueprint-enter">
          <path className="blueprint-line" d="M150 52V228M150 76H238M150 126H238M150 176H238M150 226H238M482 52V228M482 76H570M482 126H570M482 176H570M482 226H570" />
          {[76, 126, 176, 226].map((y, i) => <rect className="blueprint-surface" x="180" y={y - 16} width={58 + i * 9} height="32" rx="2" key={`l-${y}`} />)}
          {[76, 126, 176, 226].map((y, i) => <rect className="blueprint-surface active" x="510" y={y - 16} width={82 - i * 7} height="32" rx="2" key={`r-${y}`} />)}
          <path className="blueprint-line" d="M276 140H444M422 122L444 140L422 158" />
          <rect className="blueprint-packet blueprint-packet-horizontal" x="290" y="132" width="16" height="16" />
          <text x="142" y="34">AZURE WIKI</text><text x="474" y="34">GITHUB WIKI</text>
        </g>
      </BlueprintFrame>
    );
  }

  if (type === "bridge") {
    return (
      <BlueprintFrame label={label}>
        <g className="blueprint-enter">
          <rect className="blueprint-surface" x="98" y="88" width="156" height="104" rx="3" />
          <rect className="blueprint-surface active" x="466" y="88" width="156" height="104" rx="3" />
          <path className="blueprint-muted" d="M124 118H224M124 140H204M124 162H218M492 118H592M492 140H572M492 162H586" />
          <path className="blueprint-line blueprint-bridge" d="M254 168C310 70 410 70 466 168M254 168H466" />
          <path className="blueprint-signal" d="M270 151C318 83 402 83 450 151" />
          <rect className="blueprint-packet blueprint-packet-bridge" x="348" y="91" width="20" height="20" transform="rotate(45 358 101)" />
          <text x="118" y="214">SOURCE ORG</text><text x="486" y="214">TARGET ORG</text>
        </g>
      </BlueprintFrame>
    );
  }

  if (type === "migration") {
    return (
      <BlueprintFrame label={label}>
        <g className="blueprint-enter">
          {[56, 140, 224].map((y, i) => (
            <g key={y}>
              <rect className="blueprint-surface" x="96" y={y - 25} width="142" height="50" rx="3" />
              <path className="blueprint-muted" d={`M120 ${y - 8}H210M120 ${y + 8}H190`} />
              <text x="108" y={y - 34}>{["GITLAB", "BITBUCKET", "GITHUB"][i]}</text>
            </g>
          ))}
          <path className="blueprint-line" d="M238 56C318 56 305 140 372 140M238 140H372M238 224C318 224 305 140 372 140M372 140H484" />
          <path className="blueprint-signal" d="M238 56C318 56 305 140 372 140H484" />
          <rect className="blueprint-surface active" x="484" y="88" width="142" height="104" rx="3" />
          <path className="blueprint-muted" d="M510 120H600M510 140H580M510 160H594" />
          <rect className="blueprint-core" x="363" y="131" width="18" height="18" transform="rotate(45 372 140)" />
          <text x="504" y="214">GITHUB ORG</text>
        </g>
      </BlueprintFrame>
    );
  }

  if (type === "sync") {
    return (
      <BlueprintFrame label={label}>
        <g className="blueprint-enter">
          {[78, 116, 154, 192].map((y) => <rect className="blueprint-surface" x="132" y={y} width="150" height="24" rx="2" key={`a-${y}`} />)}
          {[78, 116, 154, 192].map((y) => <rect className="blueprint-surface active" x="438" y={y} width="150" height="24" rx="2" key={`b-${y}`} />)}
          <path className="blueprint-line" d="M300 102C350 50 414 50 464 102M420 78L464 102L439 144M420 202C370 244 306 244 256 202M300 226L256 202L282 160" />
          <path className="blueprint-signal" d="M300 102C350 50 414 50 464 102" />
          <circle className="blueprint-pulse" cx="360" cy="65" r="8" />
          <text x="132" y="56">ORIGIN</text><text x="438" y="56">MIRROR</text>
        </g>
      </BlueprintFrame>
    );
  }

  return (
    <BlueprintFrame label={label}>
      <g className="blueprint-enter">
        <rect className="blueprint-surface" x="164" y="54" width="280" height="158" rx="4" />
        <rect className="blueprint-surface" x="190" y="40" width="280" height="158" rx="4" />
        <rect className="blueprint-surface active" x="216" y="26" width="340" height="190" rx="4" />
        <path className="blueprint-muted" d="M248 64H524M248 92H444M248 120H504M248 148H466" />
        <rect className="blueprint-core" x="244" y="176" width="18" height="18" transform="rotate(45 253 185)" />
        <path className="blueprint-line" d="M282 185H516M496 168L516 185L496 202" />
        <path className="blueprint-signal" d="M282 185H516" />
        <path className="blueprint-slide-scan" d="M232 42V200" />
        <text x="216" y="246">DECK / BUILD / PUBLISH</text>
      </g>
    </BlueprintFrame>
  );
}

export default function Projects({ lang }) {
  const S = STRINGS[lang].projects;
  const [idx, setIdx] = useState(0);
  const [signalKey, setSignalKey] = useState(0);
  const itemRefs = useRef([]);
  const project = PROJECTS[idx];

  const selectProject = (next) => {
    setIdx(next);
    setSignalKey((value) => value + 1);
  };

  const onIndexKeyDown = (event, index) => {
    const nextByKey = {
      ArrowDown: Math.min(index + 1, PROJECTS.length - 1),
      ArrowUp: Math.max(index - 1, 0),
      Home: 0,
      End: PROJECTS.length - 1,
    };
    const next = nextByKey[event.key];
    if (next === undefined) return;
    event.preventDefault();
    event.stopPropagation();
    selectProject(next);
    itemRefs.current[next]?.focus();
  };

  return (
    <div className="screen-inner projects projects-source-index">
      <header className="project-command">
        <div>
          <p className="kicker">{S.kicker}</p>
          <p className="project-system mono"><span /> {S.index} · {String(PROJECTS.length).padStart(2, "0")} / ONLINE</p>
        </div>
        <p className="project-hint mono">{S.hint}</p>
        <a className="tlink" href={`${LINKS.github}?tab=repositories`} target="_blank" rel="noopener noreferrer">
          {S.all} <Icon id="ext" size={11} />
        </a>
      </header>

      <div className="project-showcase">
        <nav className="project-index brk" aria-label={S.index} style={{ "--active-index": idx }}>
          <header className="project-index-head mono">
            <span>{S.index}</span>
            <b>{String(idx + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}</b>
          </header>
          <i className="project-index-cursor" aria-hidden="true" />
          <div className="project-index-list">
            {PROJECTS.map((item, i) => (
              <button
                ref={(node) => { itemRefs.current[i] = node; }}
                className={`project-index-item ${i === idx ? "active" : ""}`}
                type="button"
                onClick={() => selectProject(i)}
                onMouseEnter={() => selectProject(i)}
                onFocus={() => selectProject(i)}
                onKeyDown={(event) => onIndexKeyDown(event, i)}
                aria-pressed={i === idx}
                aria-controls="project-presentation"
                key={item.id}
              >
                <span className="project-index-number mono">{String(i + 1).padStart(2, "0")}</span>
                <span className="project-index-copy">
                  <strong>{L(item.shortName, lang)}</strong>
                  <small className="mono">{L(item.tag, lang)} · {item.lang}</small>
                </span>
                <i aria-hidden="true" />
              </button>
            ))}
          </div>
          <footer className="project-index-foot mono">0VAS / SOURCE LIBRARY / 2026</footer>
        </nav>

        <article className="project-presentation brk" id="project-presentation">
          <header className="project-presentation-head mono">
            <span>{S.blueprint}</span>
            <b>{project.id} · {project.visual.toUpperCase()}</b>
          </header>

          <div className="project-visual" key={`${project.id}-${signalKey}`}>
            <ProjectBlueprint type={project.visual} label={`${L(project.shortName, lang)} — ${S.blueprint}`} />
            <i className="project-calibration" aria-hidden="true" />
            <span className="project-visual-index mono" aria-hidden="true">{String(idx + 1).padStart(2, "0")}</span>
          </div>

          <div className="project-presentation-copy" aria-live="polite" aria-atomic="true">
            <p className="project-selected mono">{S.selected} · {project.id}</p>
            <h2>{project.name}</h2>
            <p>{L(project.desc, lang)}</p>
          </div>

          <footer className="project-presentation-foot">
            <div className="project-tech">
              <span className="mono">{S.technologies}</span>
              <div>{project.tech.map((tech) => <i key={tech}>{tech}</i>)}</div>
            </div>
            <a className="project-open tlink" href={project.url} target="_blank" rel="noopener noreferrer">
              {S.view} <Icon id="ext" size={11} />
            </a>
          </footer>
        </article>
      </div>
    </div>
  );
}
