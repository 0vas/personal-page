import { Micro, useTyped } from "../components/bits.jsx";
import { AssetIcon, Icon } from "../components/Icons.jsx";
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
      <div className="profile-hero">
        <ProfileBlock className="profile-kicker-block"><p className="kicker">{L(PROFILE.kicker, lang)}</p></ProfileBlock>
        <ProfileBlock className="profile-name-block">
          <h1 className="profile-name">
            <span className="n1">OSCAR</span><span className="n2" data-text="LOBATON">LOBATON</span><span className="n3">SALAS</span>
          </h1>
        </ProfileBlock>
        <ProfileBlock className="profile-role-block">
          <p className="profile-role" aria-label={primaryRole}>
            <span className="role-reserve" aria-hidden="true">{roleReserve}<span className="caret" /></span>
            <span className="role-live" aria-hidden="true">{typedRole}<span className="caret" /></span>
          </p>
        </ProfileBlock>
        <ProfileBlock className="profile-lede-block">
          <p className="lede profile-lede">{L(PROFILE.lede, lang)}</p>
        </ProfileBlock>
        <ProfileBlock className="profile-cta-block">
          <div className="profile-cta">
            <a className="btn btn-solid dbar" href={LINKS.cv} download>
              <Icon id="download" /> {S.downloadCV}
            </a>
            <a className="btn" href="#/contact">{S.contactBtn}</a>
          </div>
        </ProfileBlock>
        <ProfileBlock className="profile-net-block">
          <ul className="net profile-net" style={{ listStyle: "none" }}>
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
            <li><a href={LINKS.email}><Icon id="mail" />Email</a></li>
          </ul>
        </ProfileBlock>
      </div>

      <ProfileBlock className="profile-photo">
        <Micro text="TRHS / 8.3" style={{ top: -18, right: "12%" }} />
        <div className="profile-photo-frame">
          <div className="ph">
            <img src="/assets/profile-retouched.jpg" alt="Oscar Lobaton Salas" fetchPriority="high" />
          </div>
          <span className="brk ph-frame" aria-hidden="true" />
        </div>
        <a
          className="profile-photo-channel dbar"
          href={LINKS.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub — @0vas"
        >
          <span className="profile-photo-channel-inner"><Icon id="github" /> GITHUB // @0VAS</span>
        </a>
      </ProfileBlock>

      <div className="profile-file">
        <div className="profile-bio">
          <ProfileBlock><p className="kicker">{S.profile.fileKicker}</p></ProfileBlock>
          {BIO.map((paragraph, index) => (
            <ProfileBlock key={index}><p className="p">{L(paragraph, lang)}</p></ProfileBlock>
          ))}
        </div>
        <ProfileBlock className="profile-capabilities">
          <CapabilityMatrix lang={lang} copy={S.profile} />
        </ProfileBlock>
      </div>
    </div>
  );
}
