import { useEffect, useRef, useState } from "react";
import { SKILLS } from "../data/content.js";
import { L } from "../i18n.js";

const TOTAL_CAPABILITIES = SKILLS.reduce((total, group) => total + group.items.length, 0);
const domainOptionId = (index) => `capability-domain-option-${index}`;
const two = (value) => String(value).padStart(2, "0");

export default function CapabilityMatrix({ lang, copy }) {
  const listRef = useRef(null);
  const [activeDomain, setActiveDomain] = useState(0);

  // Reset to the first domain when the language flips so the panes stay in sync.
  useEffect(() => { setActiveDomain(0); }, [lang]);

  const move = (next) => setActiveDomain((next + SKILLS.length) % SKILLS.length);

  const onDirectoryKeyDown = (event) => {
    const keyTargets = {
      ArrowDown: activeDomain + 1,
      ArrowRight: activeDomain + 1,
      ArrowUp: activeDomain - 1,
      ArrowLeft: activeDomain - 1,
      Home: 0,
      End: SKILLS.length - 1,
    };
    if (event.key in keyTargets) {
      event.preventDefault();
      event.stopPropagation();
      move(keyTargets[event.key]);
    }
  };

  const group = SKILLS[activeDomain];
  const domainName = L(group.name, lang);
  const count = group.items.length;

  return (
    <section className="capability-matrix brk" aria-labelledby="capability-matrix-title">
      <header className="capability-head">
        <p className="capability-kicker">{copy.matrixKicker}</p>
        <h2 id="capability-matrix-title">{copy.matrixOverview}</h2>
        <p className="capability-head-meta">{copy.matrixHint}</p>
      </header>

      <div className="capability-panes">
        <div
          ref={listRef}
          className="capability-domains"
          role="listbox"
          tabIndex={0}
          aria-label={copy.matrixHint}
          aria-activedescendant={domainOptionId(activeDomain)}
          onKeyDown={onDirectoryKeyDown}
        >
          {SKILLS.map((item, index) => {
            const selected = index === activeDomain;
            return (
              <div
                key={L(item.name, "en")}
                id={domainOptionId(index)}
                role="option"
                aria-selected={selected}
                className={`capability-domain${selected ? " is-active" : ""}`}
                onClick={() => { setActiveDomain(index); listRef.current?.focus(); }}
              >
                <span className="capability-domain-index">{two(index + 1)}</span>
                <span className="capability-domain-mark" aria-hidden="true" />
                <span className="capability-domain-name">{L(item.name, lang)}</span>
                <span className="capability-domain-count">{two(item.items.length)}</span>
                <span className="capability-domain-caret" aria-hidden="true">›</span>
              </div>
            );
          })}
        </div>

        <div className="capability-detail" key={activeDomain}>
          <div className="capability-detail-head">
            <h3 className="capability-detail-name">{domainName}</h3>
            <span className="capability-detail-count">{two(count)} {copy.matrixTechnologies}</span>
          </div>
          <ul className="capability-chips">
            {group.items.map((tech, index) => (
              <li className="capability-chip" key={tech.s}>
                <span className="capability-chip-index" aria-hidden="true">{two(index + 1)}</span>
                {tech.n}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">{domainName}. {count} {copy.matrixTechnologies}.</p>
      <ul className="sr-only">
        {SKILLS.flatMap((item) => item.items.map((tech) => (
          <li key={`${L(item.name, "en")}-${tech.n}`}>{L(item.name, lang)}: {tech.n}</li>
        )))}
      </ul>
    </section>
  );
}
