import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "../components/bits.jsx";
import { AssetIcon, Icon } from "../components/Icons.jsx";
import { CAREER_GROUPS, CAREER_DETAILS, CAREER_KIND } from "../data/content.js";
import { L, STRINGS } from "../i18n.js";

function Role({ did, lang, open, setOpen }) {
  const d = CAREER_DETAILS[did];
  const isOpen = open === did;
  const active = !!d.status;
  return (
    <li className={`tl-item ${isOpen ? "open" : ""} ${active ? "active" : ""}`}>
      <div className="tl-date-col"><span className="tl-date mono">{L(d.date, lang)}</span></div>
      <div className="tl-rail" aria-hidden="true"><span className="tl-node" /></div>
      <div className="tl-body">
        <button className="tl-head" onClick={() => setOpen(isOpen ? null : did)} aria-expanded={isOpen}>
          <span className="tl-logo">
            <AssetIcon base={`/assets/orgs/${d.logo}`} exts={["jpg","jpeg","png","svg","webp"]} fallbackId="org" size={26} />
          </span>
          <span className="tl-meta">
            <span className="tl-role">{L(d.title, lang)}</span>
            <span className="tl-org">{L(d.org, lang)}</span>
          </span>
          <span className="tl-right">
            <span className="tl-kind mono">{L(CAREER_KIND[did], lang)}</span>
            {active && <span className="tl-live mono">● {L(d.status, lang)}</span>}
          </span>
          <Icon id="chevron" size={14} className="tl-chev" />
        </button>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              className="tl-detail"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 0.68, 0.3, 1] }}
            >
              <div className="tl-detail-in">
                <ul className="tl-notes">
                  {d.notes.map((n, j) => <li key={j}>{L(n, lang)}</li>)}
                </ul>
                <div className="tl-keys">
                  {d.keys.map((k, j) => <em key={j}><span>{L(k, lang)}</span></em>)}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </li>
  );
}

export default function Career({ lang }) {
  const S = STRINGS[lang].career;
  const [open, setOpen] = useState("lead"); // flagship role expanded by default

  return (
    <div className="screen-inner career-v">
      <Reveal>
        <p className="kicker">{S.kicker}</p>
        <p className="career-hint">{S.hint}</p>
      </Reveal>

      {CAREER_GROUPS.map((g, gi) => (
        <Reveal key={g.id} delay={0.06 + gi * 0.06} className="tl-group">
          <h3 className="tl-group-head">{L(g.name, lang)}</h3>
          <ol className="tl">
            {g.dids.map((did) => (
              <Role key={did} did={did} lang={lang} open={open} setOpen={setOpen} />
            ))}
          </ol>
        </Reveal>
      ))}
    </div>
  );
}
