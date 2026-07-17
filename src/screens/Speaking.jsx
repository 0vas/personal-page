import { lazy, Suspense, useState } from "react";
import { Icon, Photo } from "../components/Icons.jsx";
import CountryFlag from "../components/CountryFlag.jsx";
import { TALKS } from "../data/content.js";
import { L, STRINGS } from "../i18n.js";

const TourGlobe = lazy(() => import("../components/TourGlobe.jsx"));

export default function Speaking({ lang }) {
  const S = STRINGS[lang].speaking;
  const [selection, setSelection] = useState({ talkIndex: 0, geoIndex: 0, activationKey: 0 });
  const { talkIndex: sel, geoIndex, activationKey } = selection;
  const talk = TALKS[sel];
  const years = [...new Set(TALKS.map((event) => event.year))];
  const selectMission = (talkIndex, nextGeoIndex = 0) => {
    setSelection((current) => ({
      talkIndex,
      geoIndex: nextGeoIndex,
      activationKey: current.activationKey + 1,
    }));
  };

  return (
    <div className="screen-inner speaking-v tour-console">
      <header className="tour-command">
        <div>
          <p className="kicker">{S.kicker}</p>
          <p className="tour-system mono"><span /> {S.globeMode}</p>
        </div>
        <a className="amb-badge" href="https://www.linkedin.com/in/oscarlobatons/" target="_blank" rel="noopener noreferrer">
          <span className="amb-mark" aria-hidden="true">◆</span>
          <span className="amb-text">{S.ambassador}</span>
          <Icon id="ext" size={11} className="amb-ext" />
        </a>
        <div className="tour-meta">
          {S.meta.slice(0, 3).map((item, index) => <span key={item}>{item}{index < 2 && <i> ▲</i>}</span>)}
        </div>
      </header>

      <div className="tour-layout">
        <section className="mission-panel mission-reel brk">
          <div className="mission-focus">
            <div className="mission-media mission-media-enter" key={talk.slug}>
              <Photo base={`/assets/talks/${talk.slug}`} className="mission-photo-ambient" />
              <div className="mission-photo-stage">
                <Photo base={`/assets/talks/${talk.slug}`} className="mission-photo-primary" />
              </div>
              <div className="mission-photo-shade" />
              <span className="mission-code mono">{talk.code}</span>
              <span className="mission-position mono">
                <span className="country-flags">{talk.countryCodes.map((code) => <CountryFlag key={code} code={code} />)}</span>
                {L(talk.where, lang)}
              </span>
            </div>

            <div className="mission-copy" key={`${talk.slug}-${lang}`}>
              <div className="mission-eyebrow mono"><span>{S.selectedMission}</span><b>{talk.year}</b></div>
              <h2>{talk.name}</h2>
              <h3>“{talk.title}”</h3>
              <p>{L(talk.desc, lang)}</p>
              {talk.url && (
                <a className="mission-link mono" href={talk.url} target="_blank" rel="noopener noreferrer">
                  {talk.broadcast ? S.channel : S.event} <Icon id="ext" size={11} />
                </a>
              )}
            </div>
          </div>

          <nav className="tour-timeline mission-roster" aria-label={S.selectEvent}>
            <div className="timeline-heading mono"><span>{S.timeline}</span><b>2026 → 2024</b></div>
            {years.map((year) => (
              <div className="timeline-year" key={year}>
                <strong className="timeline-year-label mono">{year}</strong>
                <div className="timeline-events">
                  {TALKS.map((event, index) => ({ event, index })).filter(({ event }) => event.year === year).map(({ event, index }) => (
                    <button
                      key={event.slug}
                      className={index === sel ? "active" : ""}
                      onClick={() => selectMission(index)}
                      aria-pressed={index === sel}
                      title={event.name}
                    >
                      <span className="event-node" aria-hidden="true" />
                      <span className="event-copy">
                        <strong>{event.name}</strong>
                        <small className="mono"><span>{event.code} / 0{index + 1}</span><span className="country-flags">{event.countryCodes.map((code) => <CountryFlag key={code} code={code} />)}</span></small>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </section>

        <section className="globe-panel brk">
          <div className="globe-panel-head mono">
            <span>0{sel + 1} / 0{TALKS.length}</span>
            <b>{S.route}</b>
            <span>{talk.year}</span>
          </div>
          <Suspense fallback={<div className="globe-loading" aria-hidden="true"><i /></div>}>
            <TourGlobe
              talks={TALKS}
              selected={sel}
              focusedGeo={geoIndex}
              activationKey={activationKey}
              onSelect={selectMission}
              selectLabel={S.selectLocation}
              statusLabel={S.locationLocked}
              ariaPrefix={S.globeAria}
            />
          </Suspense>
          <div className="globe-instruction mono">{S.globeControl}</div>
          <div className="tour-cities mono">
            {talk.geo.map((point, index) => (
              <button key={point.label} className={index === geoIndex ? "active" : ""} onClick={() => selectMission(sel, index)} aria-pressed={index === geoIndex}>
                <i />{point.label}
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
