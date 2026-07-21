import { Micro, useTyped } from "../components/bits.jsx";
import { Icon } from "../components/Icons.jsx";
import CapabilityMatrix from "../components/CapabilityMatrix.jsx";
import { ROLES, LINKS, PROFILE, BIO } from "../data/content.js";
import { L, STRINGS } from "../i18n.js";

function ProfileBlock({ children, className, style }) {
  return <div className={className} style={style}>{children}</div>;
}

export default function Profile({ lang, theme }) {
  const S = STRINGS[lang];
  const roles = ROLES[lang] || ROLES.en;
  const primaryRole = roles[0];
  const typedRole = useTyped(roles);
  const roleReserve = roles.reduce((longest, role) => role.length > longest.length ? role : longest, primaryRole);

  return (
    <div className="screen-inner profile">
      <div>
        <ProfileBlock><p className="kicker">{L(PROFILE.kicker, lang)}</p></ProfileBlock>
        <ProfileBlock>
          <h1 className="profile-name">
            <span className="n1">OSCAR</span><span className="n2" data-text="LOBATON">LOBATON</span><span className="n3">SALAS</span>
          </h1>
        </ProfileBlock>
        <ProfileBlock>
          <p className="profile-role" aria-label={primaryRole}>
            <span className="role-reserve" aria-hidden="true">{roleReserve}<span className="caret" /></span>
            <span className="role-live" aria-hidden="true">{typedRole}<span className="caret" /></span>
          </p>
        </ProfileBlock>
        <ProfileBlock>
          <p className="lede profile-lede">{L(PROFILE.lede, lang)}</p>
        </ProfileBlock>
        <ProfileBlock>
          <div className="profile-cta">
            <a className="btn btn-solid dbar" href={LINKS.cv} download>
              <Icon id="download" /> {S.downloadCV}
            </a>
            <a className="btn" href="#/contact">{S.contactBtn}</a>
          </div>
        </ProfileBlock>
        <ProfileBlock>
          <ul className="net profile-net" style={{ listStyle: "none" }}>
            <li><a href={LINKS.github} target="_blank" rel="noopener noreferrer"><Icon id="github" />GitHub</a></li>
            <li><a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer"><Icon id="linkedin" />LinkedIn</a></li>
            <li><a href={LINKS.credly} target="_blank" rel="noopener noreferrer"><Icon id="credly" />Credly</a></li>
            <li><a href={LINKS.email}><Icon id="mail" />Email</a></li>
          </ul>
        </ProfileBlock>
      </div>

      <ProfileBlock className="profile-photo">
        <Micro text="TRHS / 8.3" style={{ top: -18, right: "12%" }} />
        <Micro text="D BKN / 2.6" style={{ bottom: -20, left: "20%" }} />
        <div className="ph">
          <img src="/assets/profile-retouched.jpg" alt="Oscar Lobaton Salas" fetchPriority="high" />
        </div>
        <span className="brk ph-frame" aria-hidden="true" />
        <span className="tag dbar"><span>OSCAR LOBATON SALAS</span></span>
      </ProfileBlock>

      <div className="profile-file">
        <div className="profile-bio">
          <ProfileBlock><p className="kicker">{S.profile.fileKicker}</p></ProfileBlock>
          {BIO.map((paragraph, index) => (
            <ProfileBlock key={index}><p className="p">{L(paragraph, lang)}</p></ProfileBlock>
          ))}
        </div>
        <ProfileBlock className="profile-capabilities">
          <CapabilityMatrix lang={lang} theme={theme} copy={S.profile} />
        </ProfileBlock>
      </div>
    </div>
  );
}
