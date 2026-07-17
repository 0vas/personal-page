import { Micro, useTyped } from "../components/bits.jsx";
import { Icon, AssetIcon } from "../components/Icons.jsx";
import { ROLES, LINKS, HOME, BIO, FACTS, SKILLS } from "../data/content.js";
import { L, STRINGS } from "../i18n.js";

function HomeBlock({ children, className, style }) {
  return <div className={className} style={style}>{children}</div>;
}

export default function Home({ lang }) {
  const S = STRINGS[lang];
  const roles = ROLES[lang] || ROLES.en;
  const primaryRole = roles[0];
  const typedRole = useTyped(roles);
  const roleReserve = roles.reduce((longest, role) => role.length > longest.length ? role : longest, primaryRole);

  return (
    <div className="screen-inner home">
      <div>
        <HomeBlock><p className="kicker">{L(HOME.kicker, lang)}</p></HomeBlock>
        <HomeBlock>
          <h1 className="home-name">
            <span className="n1">OSCAR</span><span className="n2" data-text="LOBATON">LOBATON</span><span className="n3">SALAS</span>
          </h1>
        </HomeBlock>
        <HomeBlock>
          <p className="home-role" aria-label={primaryRole}>
            <span className="role-reserve" aria-hidden="true">{roleReserve}<span className="caret" /></span>
            <span className="role-live" aria-hidden="true">{typedRole}<span className="caret" /></span>
          </p>
        </HomeBlock>
        <HomeBlock>
          <p className="lede home-lede">{L(HOME.lede, lang)}</p>
        </HomeBlock>
        <HomeBlock>
          <div className="home-cta">
            <a className="btn btn-solid dbar" href={LINKS.cv} download>
              <Icon id="download" /> {S.downloadCV}
            </a>
            <a className="btn" href="#/contact">{S.contactBtn}</a>
          </div>
        </HomeBlock>
        <HomeBlock>
          <ul className="net home-net" style={{ listStyle: "none" }}>
            <li><a href={LINKS.github} target="_blank" rel="noopener noreferrer"><Icon id="github" />GitHub</a></li>
            <li><a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer"><Icon id="linkedin" />LinkedIn</a></li>
            <li><a href={LINKS.credly} target="_blank" rel="noopener noreferrer"><Icon id="credly" />Credly</a></li>
            <li><a href={LINKS.email}><Icon id="mail" />Email</a></li>
          </ul>
        </HomeBlock>
      </div>

      <HomeBlock className="home-photo">
        <Micro text="TRHS / 8.3" style={{ top: -18, right: "12%" }} />
        <Micro text="D BKN / 2.6" style={{ bottom: -20, left: "20%" }} />
        <div className="ph">
          <img src="/assets/profile-retouched.jpg" alt="Oscar Lobaton Salas" fetchPriority="high" />
        </div>
        <span className="brk ph-frame" aria-hidden="true" />
        <span className="tag dbar"><span>OSCAR LOBATON SALAS</span></span>
      </HomeBlock>

      {/* merged personal file */}
      <div className="home-file">
        <div>
          <HomeBlock><p className="kicker">{S.home.fileKicker}</p></HomeBlock>
          {BIO.map((p, i) => (
            <HomeBlock key={i}><p className="p">{L(p, lang)}</p></HomeBlock>
          ))}
        </div>
        <HomeBlock>
          <div className="facts">
            {FACTS.map((f, i) => (
              <div className="fact" key={i}>
                <span className="k">{L(f.k, lang)}</span>
                <span>{L(f.v, lang)}</span>
              </div>
            ))}
          </div>
        </HomeBlock>
      </div>

      <HomeBlock className="skgrid">
        {SKILLS.map((s, i) => (
          <div className="skg" key={i}>
            <h4>{L(s.name, lang)}</h4>
            <div className="skg-items">
              {s.items.map((it) => (
                <span key={it.n}>
                  <i>
                    <AssetIcon base={`/assets/tech/${it.s}`} size={13} className="skg-ico" />
                    {it.n}
                  </i>
                </span>
              ))}
            </div>
          </div>
        ))}
      </HomeBlock>
    </div>
  );
}
