import { createContext, useContext, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { Icon } from "../components/Icons.jsx";
import { PROJECTS, LINKS } from "../data/content.js";
import { L, STRINGS } from "../i18n.js";

const BlueprintFit = createContext("xMidYMid meet");

function BlueprintFrame({ children, label }) {
  const fit = useContext(BlueprintFit);
  const gid = `bp${useId().replace(/:/g, "")}`;
  return (
    <svg className="project-blueprint" viewBox="0 0 720 280" role="img" aria-label={label} preserveAspectRatio={fit}>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--accent)" />
          <stop offset=".62" stopColor="var(--geo-active)" />
          <stop offset="1" stopColor="var(--accent-2)" />
        </linearGradient>
      </defs>
      {children}
    </svg>
  );
}

function ProjectBlueprint({ type, label, fit = "xMidYMid meet" }) {
  return (
    <BlueprintFit.Provider value={fit}>
      <BlueprintSwitch type={type} label={label} />
    </BlueprintFit.Provider>
  );
}

function BlueprintSwitch({ type, label }) {
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

  if (type === "workflow") return <WorkflowBlueprint label={label} />;

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

function WorkflowBlueprint({ label }) {
  return (
    <BlueprintFrame label={label}>
      <g className="blueprint-enter">
        <circle className="blueprint-node" cx="108" cy="140" r="14" />
        <rect className="blueprint-surface" x="164" y="100" width="132" height="80" rx="3" />
        <path className="blueprint-muted" d="M184 128H274M184 150H250" />
        <rect className="blueprint-core" x="342" y="122" width="36" height="36" transform="rotate(45 360 140)" />
        <rect className="blueprint-surface active" x="430" y="100" width="146" height="80" rx="3" />
        <path className="blueprint-muted" d="M452 128H552M452 150H526" />
        <circle className="blueprint-node" cx="624" cy="140" r="14" />
        <path className="blueprint-line" d="M122 140H164M296 140H334M386 140H430M576 140H610" />
        <path className="blueprint-signal" d="M122 140H610" />
        <text x="188" y="84">PLAN</text>
        <text x="328" y="84">DECIDE</text>
        <text x="454" y="84">EVIDENCE</text>
      </g>
    </BlueprintFrame>
  );
}

function ProjectName({ project, index, lang }) {
  return (
    <span className="sphere-name">
      <span className="mono">{String(index + 1).padStart(2, "0")}</span>
      <strong>{L(project.shortName, lang)}</strong>
    </span>
  );
}

const GA = Math.PI * (3 - Math.sqrt(5));
const IDLE_YAW = 6;
const TITLE_Z = 1.08;

function spherePoint(i, n) {
  const y = n === 1 ? 0 : 1 - (i / (n - 1)) * 2;
  const rad = Math.sqrt(Math.max(0, 1 - y * y));
  const theta = i * GA;
  return { x: Math.cos(theta) * rad, y, z: Math.sin(theta) * rad };
}

export default function Projects({ lang }) {
  const S = STRINGS[lang].projects;
  const words = S.sphere;
  const fitRef = useRef(null);
  const stageRef = useRef(null);
  const worldRef = useRef(null);
  const headlineRef = useRef(null);
  const plateRef = useRef(null);
  const stateRef = useRef(null);
  const flipRef = useRef(null);
  const closeToken = useRef(0);
  const closeRef = useRef(() => {});
  const [lit, setLit] = useState(-1);
  const [grid, setGrid] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const litProject = lit >= 0 ? PROJECTS[lit] : null;

  const openFrom = (index, el) => {
    closeToken.current += 1;
    const st = stateRef.current;
    if (st) st.lit = index;
    flipRef.current = { rect: el.getBoundingClientRect() };
    setLit(index);
  };

  const closeLit = () => {
    const plate = plateRef.current;
    const stage = stageRef.current;
    const st = stateRef.current;
    const index = lit;
    const token = closeToken.current + 1;
    closeToken.current = token;
    if (st) st.lit = -1;
    const source = stage?.querySelector(grid ? `.sphere-tile[data-idx="${index}"]` : `.sphere-card[data-idx="${index}"]`);
    if (!plate || !source) {
      setLit(-1);
      return;
    }
    const rect = source.getBoundingClientRect();
    const dest = plate.getBoundingClientRect();
    const dx = rect.left + rect.width / 2 - (dest.left + dest.width / 2);
    const dy = rect.top + rect.height / 2 - (dest.top + dest.height / 2);
    const scale = Math.max(0.04, rect.width / Math.max(dest.width, 1));
    plate.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;
    plate.style.opacity = "0";
    window.setTimeout(() => {
      if (closeToken.current !== token) return;
      if (plate.isConnected) {
        plate.style.transition = "none";
        plate.style.transform = "";
        plate.style.opacity = "";
      }
      setLit(-1);
    }, 640);
  };
  closeRef.current = closeLit;

  useEffect(() => { setRevealed(true); }, []);

  useEffect(() => {
    const st = stateRef.current;
    if (st) st.lit = lit;
  }, [lit]);

  useEffect(() => {
    const fit = fitRef.current;
    const stage = stageRef.current;
    const world = worldRef.current;
    const headline = headlineRef.current;
    const scroller = fit?.closest(".screen");
    if (!fit || !stage || !world || !headline || !scroller) return;

    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const cards = [...stage.querySelectorAll(".sphere-card")];
    const points = cards.map((_, i) => spherePoint(i, cards.length));
    const angles = points.map((_, i) => -Math.PI / 2 + (i / points.length) * Math.PI * 2);
    const st = {
      spin: 0, tilt: -4, camZ: 0, camZTarget: 0,
      dragX: 0, dragY: 0, velX: 0, velY: 0,
      dragging: false, p: 0, lit: -1, R: 200, rx: 320, ry: 180, persp: 1150,
      reduced: reducedQuery.matches,
    };
    stateRef.current = st;

    let lastW = 0;
    let lastH = 0;
    const layout = (force) => {
      const w = scroller.clientWidth;
      const h = scroller.clientHeight;
      if (w < 40 || h < 40) return;
      if (!force && Math.abs(w - lastW) < 20 && Math.abs(h - lastH) < 20) return;
      lastW = w;
      lastH = h;
      fit.style.height = `${Math.round(h * 1.16)}px`;
      stage.style.height = `${h}px`;
      const persp = w <= 380 ? 620 : w <= 640 ? 760 : w <= 900 ? 920 : 1150;
      const nameBand = 36;
      const pad = 28;
      const minCard = w <= 640 ? 108 : 142;
      let cw = Math.round(Math.max(minCard, Math.min(160, Math.min(w, h) * 0.18)));
      const place = (cardW) => {
        const cardH = cardW / 1.5 + nameBand;
        return {
          rx: Math.max(96, (w / 2 - pad - cardW * 0.55) * 0.94),
          ry: Math.max(84, (h / 2 - pad - cardH * 0.55) * 0.9),
          cardH,
        };
      };
      let spot = place(cw);
      for (let guard = 0; guard < 6; guard += 1) {
        const step = Math.PI * 2 / angles.length;
        let chord = Infinity;
        for (let i = 0; i < angles.length; i += 1) {
          const a1 = -Math.PI / 2 + i * step;
          const a2 = a1 + step;
          const dx = spot.rx * (Math.cos(a2) - Math.cos(a1));
          const dy = spot.ry * (Math.sin(a2) - Math.sin(a1));
          chord = Math.min(chord, Math.hypot(dx, dy));
        }
        const need = Math.max(cw, spot.cardH) + 22;
        if (chord >= need || cw <= minCard) break;
        cw = Math.max(minCard, Math.round(cw - (need - chord) * 0.55));
        spot = place(cw);
      }
      st.rx = spot.rx;
      st.ry = spot.ry;
      st.R = Math.min(220, Math.min(st.rx, st.ry) * 0.62);
      st.persp = persp;
      fit.style.setProperty("--cw", `${cw}px`);
      fit.style.setProperty("--persp", `${persp}px`);
      const mag = persp / Math.max(220, persp - st.R * TITLE_Z);
      const maxFont = w <= 380 ? 20 : w <= 640 ? 22 : 32;
      const font = Math.min(maxFont, Math.max(16, (w * 0.58) / (11 * mag)));
      headline.style.fontSize = `${font}px`;
      fit.style.setProperty("--hw", `${Math.ceil(font * 11 + 12)}px`);
      cards.forEach((card, i) => {
        const a = angles[i];
        card.dataset.x = String(Math.cos(a));
        card.dataset.y = String(Math.sin(a));
        card.dataset.z = String(Math.cos(a));
        card.style.transform = `translate3d(${Math.cos(a) * st.rx}px, ${Math.sin(a) * st.ry}px, 0px)`;
      });
      st.camZTarget = st.p * Math.min(64, st.R * 0.12);
    };

    const readScroll = () => {
      const max = scroller.clientHeight * 0.16;
      if (scroller.scrollTop > max) scroller.scrollTop = max;
      const p = max > 0 ? Math.min(1, Math.max(0, scroller.scrollTop / max)) : 0;
      st.p = p;
      st.camZTarget = p * Math.min(64, st.R * 0.12);
      fit.dataset.deep = p > 0.08 ? "1" : "";
    };

    let raf = 0;
    let last = performance.now();
    const frame = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (st.reduced) {
        st.velX = 0;
        st.velY = 0;
        st.camZ = st.camZTarget;
      } else if (!st.dragging && st.lit < 0) {
        st.dragX += st.velX;
        st.dragY += st.velY;
        st.velX *= 0.94;
        st.velY *= 0.94;
        if (Math.abs(st.velX) < 0.002) st.velX = 0;
        if (Math.abs(st.velY) < 0.002) st.velY = 0;
        if (st.velX === 0 && st.velY === 0) st.spin += IDLE_YAW * dt;
      }
      const pitch = Math.max(-32, Math.min(32, st.tilt + st.dragY));
      st.dragY = pitch - st.tilt;
      if (!st.reduced) st.camZ += (st.camZTarget - st.camZ) * 0.075;
      const sx = st.tilt + st.dragY;
      const sy = st.spin + st.dragX;
      world.style.transform = `translateZ(${st.camZ}px) rotateY(${sy}deg) rotateX(${sx}deg)`;
      // Rightmost function runs first, so the title moves forward, then stays square to the camera.
      headline.style.transform = `rotateX(${-sx}deg) rotateY(${-sy}deg) translateZ(${st.R * TITLE_Z}px)`;
      headline.style.opacity = "1";

      const rad = sy * Math.PI / 180;
      const invX = -sx * Math.PI / 180;
      const invY = -rad;
      const cix = Math.cos(invX);
      const six = Math.sin(invX);
      const ciy = Math.cos(invY);
      const siy = Math.sin(invY);
      cards.forEach((card, i) => {
        const a = angles[i] + rad;
        const ex = Math.cos(a) * st.rx;
        const ey = Math.sin(a) * st.ry;
        const ez = Math.cos(a) * 24;
        const x1 = ex * ciy + ez * siy;
        const z1 = -ex * siy + ez * ciy;
        const y2 = ey * cix - z1 * six;
        const z2 = ey * six + z1 * cix;
        const depth = (Math.cos(a) + 1) / 2;
        let dim = (1 - depth) * 0.16;
        if (st.lit >= 0) dim = Math.min(0.55, dim + 0.18);
        const fade = st.lit === i ? 0 : 1;
        const nextD = dim.toFixed(3);
        const nextO = fade.toFixed(3);
        if (card.dataset.d !== nextD) {
          card.dataset.d = nextD;
          card.style.setProperty("--d", nextD);
        }
        if (card.dataset.o !== nextO) {
          card.dataset.o = nextO;
          card.style.opacity = nextO;
        }
        card.dataset.x = String(Math.cos(a));
        card.dataset.y = String(Math.sin(a));
        card.dataset.z = String(Math.cos(a));
        card.style.transform = `translate3d(${x1}px, ${y2}px, ${z2}px) rotateX(${-sx}deg) rotateY(${-sy}deg)`;
        card.style.zIndex = String(Math.round(depth * 100));
      });

      raf = requestAnimationFrame(frame);
    };

    layout(true);
    readScroll();
    raf = requestAnimationFrame(frame);

    let origin = null;
    let startX = 0;
    let startY = 0;
    let lastX = 0;
    let lastY = 0;
    let moved = 0;
    let pid = 0;
    let captured = false;
    let active = false;

    const down = (e) => {
      if (st.lit >= 0 || e.button > 0) return;
      if (e.target.closest(".sphere-chrome, .sphere-grid, .sphere-lit")) return;
      origin = e.target.closest(".sphere-card");
      active = true;
      st.dragging = e.pointerType !== "touch";
      st.velX = 0;
      st.velY = 0;
      startX = lastX = e.clientX;
      startY = lastY = e.clientY;
      moved = 0;
      pid = e.pointerId;
      captured = false;
      if (e.pointerType !== "touch") {
        stage.setPointerCapture(pid);
        captured = true;
      }
    };
    const move = (e) => {
      if (!active || e.pointerId !== pid) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      moved = Math.hypot(e.clientX - startX, e.clientY - startY);
      if (e.pointerType === "touch" && !captured) {
        if (moved < 10) return;
        if (Math.abs(e.clientY - startY) > Math.abs(e.clientX - startX) * 1.15) {
          active = false;
          st.dragging = false;
          return;
        }
        stage.setPointerCapture(pid);
        captured = true;
        st.dragging = true;
      }
      if (!st.dragging) return;
      st.dragX += dx * 0.13;
      st.dragY += dy * 0.13;
      st.velX = dx * 0.13;
      st.velY = dy * 0.13;
    };
    const up = (e) => {
      if (!active || e.pointerId !== pid) return;
      active = false;
      st.dragging = false;
      const slop = e.pointerType === "touch" ? 14 : 6;
      if (origin && moved <= slop) openFrom(+origin.dataset.idx, origin);
      origin = null;
    };
    const onResize = () => layout(false);
    const onOrient = () => window.setTimeout(() => layout(true), 220);
    const onVisual = () => layout(true);
    const onReduce = () => { st.reduced = reducedQuery.matches; };

    stage.addEventListener("pointerdown", down);
    stage.addEventListener("pointermove", move);
    stage.addEventListener("pointerup", up);
    stage.addEventListener("pointercancel", up);
    scroller.addEventListener("scroll", readScroll, { passive: true });
    const observer = new ResizeObserver(() => layout(false));
    observer.observe(scroller);
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onOrient);
    window.visualViewport?.addEventListener("resize", onVisual);
    window.visualViewport?.addEventListener("scroll", onVisual);
    reducedQuery.addEventListener("change", onReduce);

    return () => {
      cancelAnimationFrame(raf);
      stage.removeEventListener("pointerdown", down);
      stage.removeEventListener("pointermove", move);
      stage.removeEventListener("pointerup", up);
      stage.removeEventListener("pointercancel", up);
      scroller.removeEventListener("scroll", readScroll);
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onOrient);
      window.visualViewport?.removeEventListener("resize", onVisual);
      window.visualViewport?.removeEventListener("scroll", onVisual);
      reducedQuery.removeEventListener("change", onReduce);
      scroller.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const scroller = fitRef.current?.closest(".screen");
    if (!scroller) return undefined;
    scroller.style.overflow = grid || lit >= 0 ? "hidden" : "";
    return () => { scroller.style.overflow = ""; };
  }, [grid, lit]);

  useLayoutEffect(() => {
    const plate = plateRef.current;
    const flip = flipRef.current;
    if (!plate || !flip || lit < 0) return;
    const dest = plate.getBoundingClientRect();
    if (!dest.width) return;
    const rect = flip.rect;
    const dx = rect.left + rect.width / 2 - (dest.left + dest.width / 2);
    const dy = rect.top + rect.height / 2 - (dest.top + dest.height / 2);
    const scale = Math.max(0.04, rect.width / dest.width);
    plate.style.transition = "none";
    plate.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;
    plate.style.opacity = "0";
    plate.getBoundingClientRect();
    plate.style.transition = "";
    plate.style.transform = "";
    plate.style.opacity = "";
    flipRef.current = null;
  }, [lit]);

  useEffect(() => {
    const onKey = (event) => {
      if (lit < 0 && !grid) return;
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") event.stopPropagation();
      if (event.key !== "Escape") return;
      event.preventDefault();
      event.stopPropagation();
      if (lit >= 0) closeRef.current();
      else setGrid(false);
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [lit, grid]);

  return (
    <div
      className={`screen-inner projects-fit${revealed ? " revealed" : ""}${grid ? " gridview" : ""}${lit >= 0 ? " lit" : ""}`}
      ref={fitRef}
    >
      <div className="projects-stage" ref={stageRef}>
        <div className="projects-scene">
        <div className="sphere-world" ref={worldRef}>
          <div className="sphere-orb" aria-hidden={grid || undefined}>
            {PROJECTS.map((project, i) => (
              <button
                className="sphere-card"
                type="button"
                data-idx={i}
                key={project.id}
                aria-label={L(project.shortName, lang)}
                onClick={(event) => {
                  if (event.detail !== 0) return;
                  openFrom(i, event.currentTarget);
                }}
              >
                <figure>
                  <ProjectBlueprint type={project.visual} label={L(project.shortName, lang)} fit="xMidYMid meet" />
                </figure>
                <ProjectName project={project} index={i} lang={lang} />
              </button>
            ))}
          </div>
          <h2 id="headline" className="sphere-headline" ref={headlineRef}>
            <span className="inner">
              {words.flatMap((word, i) => [
                i > 0 ? " " : null,
                <span className="sphere-word" style={{ "--i": i }} key={i}>{word}</span>,
              ])}
              <span className="sphere-hint">{S.drag}</span>
            </span>
          </h2>
        </div>
        </div>
        <div className="sphere-vig" />

        <div className="sphere-grid" aria-hidden={grid ? undefined : true}>
          <div className="sphere-rows">
            {PROJECTS.map((project, i) => (
              <button
                className="sphere-tile"
                type="button"
                data-idx={i}
                key={project.id}
                onClick={(event) => openFrom(i, event.currentTarget)}
              >
                <figure>
                  <ProjectBlueprint type={project.visual} label={L(project.shortName, lang)} fit="xMidYMid meet" />
                </figure>
                <ProjectName project={project} index={i} lang={lang} />
              </button>
            ))}
          </div>
        </div>

        <a className="sphere-repos sphere-chrome tlink" href={`${LINKS.github}?tab=repositories`} target="_blank" rel="noopener noreferrer">
          {S.all} <Icon id="ext" size={11} />
        </a>
        <button
          className="sphere-gridbtn sphere-chrome"
          type="button"
          aria-pressed={grid}
          aria-label={S.grid}
          onClick={() => setGrid((value) => !value)}
        >
          <b /><b /><b /><b />
        </button>
        <p className="sphere-colophon sphere-chrome">{String(PROJECTS.length).padStart(2, "0")} · {S.field}</p>

        {litProject && (
          <div className="sphere-lit" role="dialog" aria-modal="true" aria-labelledby="litTitle">
            <button className="sphere-scrim" type="button" aria-label={S.close} onClick={closeLit} />
            <div className="sphere-plate" ref={plateRef}>
              <div className="sphere-shot">
                <ProjectBlueprint type={litProject.visual} label={L(litProject.shortName, lang)} />
                <button className="sphere-close" type="button" onClick={closeLit}>{S.close}</button>
              </div>
              <div className="sphere-meta" aria-live="polite" aria-atomic="true">
                <div>
                  <h3 id="litTitle">{L(litProject.shortName, lang)}</h3>
                  <p className="sphere-where">{litProject.id} · {litProject.lang} · {L(litProject.tag, lang)}</p>
                  <p className="project-slug mono">{litProject.name}</p>
                </div>
                <div>
                  <p className="project-lead">{L(litProject.desc, lang)}</p>
                  <p className="project-tech mono">{litProject.tech.join(" · ")}</p>
                  <a className="project-open tlink" href={litProject.url} target="_blank" rel="noopener noreferrer">
                    {S.view} <Icon id="ext" size={11} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
