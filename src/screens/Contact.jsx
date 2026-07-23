import { Reveal } from "../components/bits.jsx";
import { AssetIcon, Icon } from "../components/Icons.jsx";
import { LINKS } from "../data/content.js";
import { STRINGS } from "../i18n.js";

export default function Contact({ lang }) {
  const S = STRINGS[lang].contact;
  const G = STRINGS[lang];
  return (
    <div className="screen-inner contact">
      <Reveal><p className="kicker">{S.kicker}</p></Reveal>
      <Reveal delay={0.08}>
        <h2 className="contact-title">{S.heading1}<br /><b>{S.heading2}</b></h2>
      </Reveal>
      <Reveal delay={0.16}>
        <p className="lede contact-sub">{S.sub}</p>
      </Reveal>
      <Reveal delay={0.24}>
        <div className="contact-cta">
          <a className="btn btn-solid dbar" href={LINKS.email}>{LINKS.emailText}</a>
          <a className="btn" href={LINKS.cv} download><Icon id="download" /> {G.downloadCV}</a>
        </div>
      </Reveal>
      <Reveal delay={0.32}>
        <ul className="net contact-net" style={{ listStyle: "none" }}>
          <li><a href={LINKS.github} target="_blank" rel="noopener noreferrer"><Icon id="github" />GitHub</a></li>
          <li>
            <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">
              <AssetIcon base="/assets/brands/linkedin" fallbackId="linkedin" size={20} className="brand-mark-linkedin" />
              LinkedIn
            </a>
          </li>
          <li>
            <a href={LINKS.credly} target="_blank" rel="noopener noreferrer">
              <AssetIcon base="/assets/brands/credly" fallbackId="credly" size={20} className="brand-mark-credly" />
              Credly
            </a>
          </li>
        </ul>
      </Reveal>
      <Reveal delay={0.4}>
        <div className="contact-meta">
          {S.meta.map((m) => <span key={m}>{m}</span>)}
          <span className="contact-credit">
            {S.musicBy}{" "}
            <a href={LINKS.music} target="_blank" rel="noopener noreferrer">FiftySounds</a>
          </span>
        </div>
      </Reveal>
    </div>
  );
}
