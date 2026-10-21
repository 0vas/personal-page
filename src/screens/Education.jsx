import { Reveal } from "../components/bits.jsx";
import { AssetIcon } from "../components/Icons.jsx";
import { EDUCATION } from "../data/content.js";
import { L, STRINGS } from "../i18n.js";

export default function Education({ lang }) {
  const S = STRINGS[lang].education;
  return (
    <div className="screen-inner">
      <Reveal><p className="kicker">{S.kicker}</p></Reveal>
      <div className="edu-list">
        {EDUCATION.map((e, i) => (
          <Reveal key={e.idx} delay={0.08 + i * 0.1}>
            <article className="edu">
              <span className="edu-logo">
                <AssetIcon base={`/assets/orgs/${e.logo}`} exts={["jpg","jpeg","png","svg","webp"]} fallbackId="org" size={30} />
                <span className="edu-idx">{e.idx}</span>
              </span>
              <div>
                <h3>
                  {L(e.title, lang)}
                  <span className="org">{L(e.org, lang)}</span>
                </h3>
                <p className={`meta ${e.gold ? "gold" : ""}`}>{L(e.meta, lang)}</p>
                {e.award && <p className="edu-award">{L(e.award, lang)}</p>}
                <ul>
                  {e.notes.map((n, j) => <li key={j}>{L(n, lang)}</li>)}
                </ul>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
