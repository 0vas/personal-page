import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "./components/Icons.jsx";
import ProfileTurtle from "./components/ProfileTurtle.jsx";
import { useMusic } from "./hooks/useMusic.js";
import { LINKS } from "./data/content.js";
import { STRINGS, detectLang } from "./i18n.js";
import Profile from "./screens/Profile.jsx";
import Career from "./screens/Career.jsx";
import Speaking from "./screens/Speaking.jsx";
import Projects from "./screens/Projects.jsx";
import Education from "./screens/Education.jsx";
import Certs from "./screens/Certs.jsx";
import Contact from "./screens/Contact.jsx";

const SCREEN_IDS = ["profile", "career", "speaking", "projects", "education", "certifications", "contact"];
const ROUTE_ALIASES = { home: "profile" };
const COMPONENTS = { profile: Profile, career: Career, speaking: Speaking, projects: Projects, education: Education, certifications: Certs, contact: Contact };
const BG_PREFETCH = [
  "/assets/bg/career.jpg", "/assets/bg/speaking.jpg", "/assets/bg/projects.svg",
  "/assets/bg/education.jpg", "/assets/bg/certifications.svg", "/assets/bg/contact.jpg",
];

function screenFromHash() {
  const rawId = window.location.hash.replace(/^#\/?/, "");
  const id = ROUTE_ALIASES[rawId] || rawId;
  const i = SCREEN_IDS.indexOf(id);
  return i >= 0 ? i : 0;
}

const BG_EXTS = ["jpg", "jpeg", "png", "webp", "svg"];
function SceneBg({ screen, theme }) {
  // Per-section background: /assets/bg/<screen>.<ext> — probes several
  // extensions, falls back to the clean gradient when none exist. The image
  // lives in a right-hand region so centered portrait subjects stay visible.
  const isGraphic = screen === "projects" || screen === "certifications";
  const extensions = isGraphic ? ["svg", "webp", "png", "jpg", "jpeg"] : BG_EXTS;
  const target = screen === "speaking"
    ? (theme === "dark" ? 0.28 : 0.36)
    : isGraphic
      ? (theme === "dark" ? 0.24 : 0.28)
      : (theme === "dark" ? 0.12 : 0.15);
  const [i, setI] = useState(0);
  useEffect(() => { setI(0); }, [screen]);
  return (
    i < extensions.length ? (
      <img
        key={`${screen}-${i}`}
        className={`bd-scene bd-scene-enter bd-scene-${screen}`}
        style={{ "--scene-opacity": target }}
        src={`/assets/bg/${screen}.${extensions[i]}`}
        alt=""
        loading="eager"
        onError={() => setI((n) => n + 1)}
      />
    ) : null
  );
}

// NieR: Automata-style boot terminal — a monospace log that types itself out
// line by line, then reports the system green and dismisses. Runs once per
// session, never captures input, and is skipped entirely under reduced-motion.
// Total wall time ≈ 2.8s (owner-requested 2–3s), timer-driven for exact control.
const INTRO_STEP_MS = 240;   // cadence between boot-log lines
const INTRO_HOLD_MS = 620;   // dwell on the completed log before leaving
const INTRO_FADE_MS = 460;   // opacity fade-out once leaving

function OpeningSequence({ copy }) {
  const [visible, setVisible] = useState(() => {
    try {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
      return !sessionStorage.getItem("ovas-intro-v4");
    } catch {
      return false;
    }
  });
  const [step, setStep] = useState(0);
  const [leaving, setLeaving] = useState(false);

  const finish = useCallback(() => {
    try { sessionStorage.setItem("ovas-intro-v4", "1"); } catch {}
    setVisible(false);
  }, []);

  const total = copy.lines.length + 1; // boot lines + the "all green" footer

  useEffect(() => {
    if (!visible) return undefined;
    const tick = window.setInterval(() => {
      setStep((s) => {
        const next = s + 1;
        if (next >= total) window.clearInterval(tick);
        return next;
      });
    }, INTRO_STEP_MS);
    const revealDone = INTRO_STEP_MS * total;
    const leaveTimer = window.setTimeout(() => setLeaving(true), revealDone + INTRO_HOLD_MS);
    const doneTimer = window.setTimeout(finish, revealDone + INTRO_HOLD_MS + INTRO_FADE_MS);
    return () => {
      window.clearInterval(tick);
      window.clearTimeout(leaveTimer);
      window.clearTimeout(doneTimer);
    };
  }, [finish, total, visible]);

  if (!visible) return null;
  return (
    <div className={`opening-sequence ${leaving ? "leaving" : ""}`} aria-hidden="true">
      <div className="boot-grid" />
      <div className="boot-scan" />
      <div className="boot-terminal mono brk">
        <div className="boot-head">
          <strong>0VAS</strong>
          <span>{copy.system}</span>
        </div>
        <div className="boot-log">
          {copy.lines.map((line, index) => (
            <p key={line.label} className={`boot-line ${step > index ? "in" : ""}`}>
              <span className="bl-label">{line.label}</span>
              <span className="bl-dots" aria-hidden="true" />
              <b className="bl-ok">{line.value}</b>
            </p>
          ))}
        </div>
        <div className={`boot-foot ${step >= total ? "in" : ""}`}>
          <span className="boot-green"><i />{copy.allGreen}</span>
          <span className="boot-ready">▸ {copy.ready}<b className="boot-cursor" /></span>
        </div>
        <div className="boot-progress"><span /></div>
      </div>
    </div>
  );
}

function Backdrop({ screen, theme }) {
  return (
    <div className={`backdrop backdrop-${screen}`} aria-hidden="true">
      <div className="bd-band-2" />
      <div className="bd-band" />
      {screen !== "profile" && <SceneBg screen={screen} theme={theme} />}
      {screen === "profile" && <ProfileTurtle theme={theme} />}
      <div className="bd-beam b1" />
      <div className="bd-beam b2" />
      <div className="bd-tris" />
      <div className="bd-diamond d1" />
      <div className="bd-diamond d2" />
      <div className="bd-diamond d3" />
      <div className="bd-diamond d4" />
      <div className="bd-diamond d5" />
      <div className="bd-sheen" />
    </div>
  );
}

function Settings({ S, lang, setLang, theme, setTheme, music }) {
  const [open, setOpen] = useState(false);
  const [credit, setCredit] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const onEsc = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onEsc);
    return () => { document.removeEventListener("mousedown", onDoc); document.removeEventListener("keydown", onEsc); };
  }, [open]);

  return (
    <div className="settings" ref={ref}>
      <button className={`settings-btn ${open ? "open" : ""}`} onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        <Icon id="settings" size={14} />
        <span>{S.options}</span>
        <Icon id="chevron" size={12} className="chev" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            className="settings-panel brk"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <div className="opt-row">
              <span className="sp-lab">{S.optLanguage}</span>
              <div className="seg">
                <button className={lang === "en" ? "on" : ""} onClick={() => setLang("en")}>EN</button>
                <button className={lang === "es" ? "on" : ""} onClick={() => setLang("es")}>ES</button>
              </div>
            </div>
            <div className="opt-row">
              <span className="sp-lab">{S.optTheme}</span>
              <div className="seg">
                <button className={theme === "light" ? "on" : ""} onClick={() => setTheme("light")}>
                  <Icon id="sun" size={12} /> {S.themeLight}
                </button>
                <button className={theme === "dark" ? "on" : ""} onClick={() => setTheme("dark")}>
                  <Icon id="moon" size={12} /> {S.themeDark}
                </button>
              </div>
            </div>
            <div className="opt-row">
              <span className="sp-lab">{S.optDoc}</span>
              <a className="sp-cv" href={LINKS.cv} download>
                <Icon id="download" size={13} /> {S.downloadCV}
              </a>
            </div>
            {music?.available && (
              <div className="opt-row">
                <span className="sp-lab">
                  {S.optMusic}
                  <button
                    type="button"
                    className={`opt-info ${credit ? "on" : ""}`}
                    onClick={() => setCredit((v) => !v)}
                    aria-label={S.musicInfo}
                    aria-expanded={credit}
                    title={S.musicInfo}
                  >i</button>
                </span>
                <div className="sp-vol">
                  <Icon id="music-off" size={12} />
                  <input
                    type="range" min="0" max="100" step="1"
                    value={Math.round(music.volume * 100)}
                    onChange={(e) => music.setVolume(Number(e.target.value) / 100)}
                    aria-label={S.optMusic}
                    style={{ "--vol": `${Math.round(music.volume * 100)}%` }}
                  />
                  <Icon id="music" size={12} />
                </div>
                {credit && (
                  <p className="opt-credit">
                    {S.contact.musicBy}{" "}
                    <a href={LINKS.music} target="_blank" rel="noopener noreferrer">FiftySounds</a>
                  </p>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  const [idx, setIdx] = useState(screenFromHash);
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || "light");
  const [lang, setLang] = useState(detectLang);
  const navMenuRef = useRef(null);
  const music = useMusic();

  const S = STRINGS[lang];

  const go = useCallback((i) => {
    const n = (i + SCREEN_IDS.length) % SCREEN_IDS.length;
    setIdx(n);
    window.history.replaceState(null, "", `#/${SCREEN_IDS[n]}`);
  }, []);

  useEffect(() => {
    const onHash = () => {
      setIdx(screenFromHash());
      if (window.location.hash.replace(/^#\/?/, "") === "home") {
        window.history.replaceState(null, "", "#/profile");
      }
    };
    onHash();
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.defaultPrevented || e.target.closest?.('input, textarea, select, button, [role="tab"], a')) return;
      if (e.key === "ArrowRight") go(idx + 1);
      if (e.key === "ArrowLeft") go(idx - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [idx, go]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem("ovas-theme", theme); } catch {}
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = lang;
    try { localStorage.setItem("ovas-lang", lang); } catch {}
  }, [lang]);

  useEffect(() => {
    const menu = navMenuRef.current;
    const active = menu?.querySelector('[aria-current="page"]');
    if (!menu || !active) return undefined;

    const frame = window.requestAnimationFrame(() => {
      const maxLeft = Math.max(0, menu.scrollWidth - menu.clientWidth);
      const centred = active.offsetLeft - ((menu.clientWidth - active.offsetWidth) / 2);
      const nextLeft = Math.min(maxLeft, Math.max(0, centred));
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      menu.scrollTo({ left: nextLeft, behavior: reduced ? "auto" : "smooth" });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [idx, lang]);

  useEffect(() => {
    const preload = () => {
      BG_PREFETCH.forEach((src) => { const image = new Image(); image.src = src; });
      import("./components/TourGlobe.jsx").catch(() => {});
    };
    if ("requestIdleCallback" in window) {
      const handle = window.requestIdleCallback(preload, { timeout: 1400 });
      return () => window.cancelIdleCallback(handle);
    }
    const handle = window.setTimeout(preload, 300);
    return () => window.clearTimeout(handle);
  }, []);

  const id = SCREEN_IDS[idx];
  const Screen = COMPONENTS[id];
  const title = S[id].title;
  const key = `${id}-${lang}`;

  return (
    <>
      <Backdrop screen={id} theme={theme} />

      {/* top chrome */}
      <header className="chrome-top" data-screen={id}>
        <div className="ct-left">
          <div className="rule" />
          <p className="ct-eyebrow">{S.eyebrow}</p>
          {title && <h1 key={key} className="ct-title ct-title-enter" data-text={title}>{title}</h1>}
        </div>
        <div className="ct-right">
          {music.available && (
            <button
              type="button"
              className={`music-toggle ${music.playing ? "on" : ""}`}
              onClick={music.toggle}
              aria-pressed={music.playing}
              aria-label={music.playing ? S.musicPause : S.musicPlay}
              title={music.playing ? S.musicPause : S.musicPlay}
            >
              <Icon id={music.playing ? "music" : "music-off"} size={15} />
            </button>
          )}
          <Settings S={S} lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} music={music} />
        </div>
      </header>
      {music.src && <audio ref={music.audioRef} src={music.src} loop preload="none" />}

      {/* stage */}
      <main className={`stage ${title ? "stage-titled" : ""}`} data-screen={id}>
        <section key={key} className="screen screen-enter" data-screen={id}>
          <Screen theme={theme} lang={lang} />
        </section>
      </main>

      {/* bottom chrome */}
      <nav className="chrome-bottom" aria-label="Sections">
        <span className="cb-index">N° <b>{idx + 1}</b> / {SCREEN_IDS.length}</span>
        <div className="cb-menu" ref={navMenuRef}>
          {SCREEN_IDS.map((sid, i) => (
            <button
              key={sid}
              className={`cb-item ${i === idx ? "on brk" : ""}`}
              onClick={() => go(i)}
              aria-current={i === idx ? "page" : undefined}
            >
              {i === idx && <span className="bar dbar" />}
              {S[sid].label}
            </button>
          ))}
        </div>
        <span className="hint" aria-hidden="true">
          <span className="key">◄►</span><span className="lab">{S.navigate}</span>
        </span>
      </nav>

      <OpeningSequence copy={S.intro} />

    </>
  );
}
