/* Monochrome issuer glyphs + UI icons — all currentColor, no external deps */
import { useEffect, useState } from "react";

const F = { fill: "currentColor", stroke: "none" };
const S = (w = 2) => ({ fill: "none", stroke: "currentColor", strokeWidth: w });

const ISSUERS = {
  microsoft: (
    <g {...F}>
      <rect x="3" y="3" width="8.5" height="8.5" /><rect x="12.5" y="3" width="8.5" height="8.5" />
      <rect x="3" y="12.5" width="8.5" height="8.5" /><rect x="12.5" y="12.5" width="8.5" height="8.5" />
    </g>
  ),
  github: (
    <path {...F} d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.54-3.87-1.54-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.35.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.78 1.05.78 2.12v3.14c0 .31.2.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" />
  ),
  google: (
    <g>
      <path {...S(2.4)} d="M20.5 12.2A8.6 8.6 0 1 1 18 6.1" />
      <path {...F} d="M12.6 10.8h8v2.8h-8z" />
    </g>
  ),
  ibm: (
    <g {...F}>
      <rect x="3" y="5" width="18" height="2.4" /><rect x="3" y="10.8" width="18" height="2.4" /><rect x="3" y="16.6" width="18" height="2.4" />
    </g>
  ),
  pmi: <path {...S(2)} d="M12 4 21 19H3z" />,
  cisco: (
    <g {...F}>
      <rect x="3" y="12" width="2.4" height="7" /><rect x="7.4" y="8" width="2.4" height="11" />
      <rect x="11.8" y="12" width="2.4" height="7" /><rect x="16.2" y="8" width="2.4" height="11" />
      <rect x="20.6" y="12" width="2.4" height="7" />
    </g>
  ),
  redhat: (
    <path {...F} d="M4 13.5c0-1 .6-2.6 1.4-3.4L8 5.5c.5-.8 1.5-1 2.4-.7l4.7 1.7c.6.2 1.3.2 1.9 0l1.4-.5c.4-.1.8.2.7.6l-.9 3.9c1.6.6 2.8 1.4 2.8 2.5 0 2-4 3.5-8.5 3.5S4 15.4 4 13.5Z" />
  ),
  oracle: <ellipse cx="12" cy="12" rx="9" ry="5.5" {...S(2.4)} />,
  hashicorp: (
    <g>
      <path {...S(2)} d="M12 2.5 20 7v10l-8 4.5L4 17V7z" />
      <path {...F} d="M9 7.5h2.2v3.3h1.6V7.5H15v9h-2.2v-3.3h-1.6v3.3H9z" />
    </g>
  ),
  aws: (
    <g {...S(2)}>
      <path d="M7 17a4 4 0 0 1-.5-7.97A5.5 5.5 0 0 1 17.3 8.6 3.8 3.8 0 0 1 17 16.2" />
      <path d="M6.5 20c3.5 1.6 7.5 1.6 11-.5" />
    </g>
  ),
  peoplecert: (
    <g {...S(2)}>
      <path d="M12 2.8 20 6v6c0 4.4-3.2 7.8-8 9.2C7.2 19.8 4 16.4 4 12V6z" />
      <path strokeWidth="2.2" d="m8.4 12 2.4 2.4 4.8-4.8" />
    </g>
  ),
  platform: (
    <g {...S(2)}>
      <path d="M12 3 21 7.5 12 12 3 7.5 12 3Z" />
      <path d="M3 12l9 4.5L21 12" />
      <path d="M3 16.5 12 21l9-4.5" />
    </g>
  ),
  certiprof: (
    <g {...S(2.2)}>
      <circle cx="12" cy="9.5" r="5.5" />
      <path d="m8.8 14-1.8 7 5-3 5 3-1.8-7" />
    </g>
  ),
  atlassian: (
    <path {...F} d="M8.5 10.5c2 2.2 2.6 5.8 1.6 9.5H3.4c-1-6 1.6-9.5 5.1-9.5ZM12.5 4c3.6 4.6 4.4 10.4 2.9 16h6.2c1.4-8-3-14.4-9.1-16Z" />
  ),
  codefresh: (
    <g {...S(2.2)}>
      <path d="M12 12c-2-3.5-5-5-8.5-5C4 11 6.5 14 12 14c5.5 0 8-3 8.5-7-3.5 0-6.5 1.5-8.5 5Z" />
      <path d="M12 14v5.5" />
    </g>
  ),
  /* certification category marks (fallbacks for the sunburst) */
  azure: <path {...F} d="M11.4 4.2h4.1l4.6 13.1-3.3 2.5H6.1l-.6-2.6 7.9-1 .3-.1-3.5-8.6-3.9 9.4-2.4-.1L11.4 4.2Z" />,
  cloud: <path {...S(2)} d="M7 18h10a4 4 0 0 0 .5-7.97A5.5 5.5 0 0 0 6.5 9 4 4 0 0 0 7 18Z" />,
  devops: (
    <g {...S(2)}>
      <circle cx="8" cy="12" r="3.4" />
      <circle cx="16" cy="12" r="3.4" />
    </g>
  ),
  leadership: <path {...F} d="M12 3.4l2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4L4.2 9.1l5.4-.8z" />,
  data: (
    <g {...S(2)}>
      <ellipse cx="12" cy="6" rx="7" ry="2.6" />
      <path d="M5 6v12c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6V6" />
      <path d="M5 12c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6" />
    </g>
  ),
  security: <path {...S(2)} d="M12 2.8 20 6v6c0 4.4-3.2 7.8-8 9.2C7.2 19.8 4 16.4 4 12V6z" />,
};

const UI = {
  linkedin: (
    <path {...F} d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.55V9h3.57v11.45Z" />
  ),
  credly: (
    <g {...S(2)}>
      <circle cx="12" cy="9" r="6" />
      <path d="M8.5 14 7 22l5-3 5 3-1.5-8" />
    </g>
  ),
  mail: (
    <g {...S(2)}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 10 7L22 7" />
    </g>
  ),
  ext: <path {...S(2)} d="M14 4h6v6M20 4 10.5 13.5M18 13v6H4V5h6" />,
  download: <path {...S(2)} d="M12 3v12m0 0 4.5-4.5M12 15 7.5 10.5M4 19h16" />,
  sun: (
    <g {...S(2)}>
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.5v2.4M12 19.1v2.4M2.5 12h2.4M19.1 12h2.4M5 5l1.7 1.7M17.3 17.3 19 19M19 5l-1.7 1.7M6.7 17.3 5 19" />
    </g>
  ),
  moon: <path {...S(2)} d="M20 13.5A8.5 8.5 0 0 1 10.5 4 8.5 8.5 0 1 0 20 13.5Z" />,
  settings: (
    <g {...S(2)}>
      <path d="M4 7h9M17.5 7H20" /><circle cx="15" cy="7" r="2.2" />
      <path d="M4 17h2.5M11 17h9" /><circle cx="8.5" cy="17" r="2.2" />
    </g>
  ),
  chevron: <path {...S(2)} d="M6 9l6 6 6-6" />,
  /* generic organization mark — fallback for issuers without a dedicated glyph */
  org: (
    <g>
      <path {...S(1.8)} d="M12 2.8 21.2 12 12 21.2 2.8 12z" />
      <path {...F} d="M12 9.2 14.8 12 12 14.8 9.2 12z" />
    </g>
  ),
};

export function Icon({ id, size = 16, className }) {
  const glyph = ISSUERS[id] || UI[id] || UI.org;
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
      {glyph}
    </svg>
  );
}

/* Prefers a user-provided image, trying several extensions, and falls back to a
   built-in glyph (or nothing). Pass either `base` (path without extension) so it
   probes `exts`, or a full `src`. */
const LOGO_EXTS = ["svg", "png", "jpg", "jpeg", "webp"];
const PHOTO_EXTS = ["jpeg", "jpg", "png", "webp"];

function useCandidates(base, src, exts) {
  const list = src ? [src] : (base ? exts.map((e) => `${base}.${e}`) : []);
  const [i, setI] = useState(0);
  const key = list[0] || "";
  useEffect(() => { setI(0); }, [key]);
  return [list[i], () => setI((n) => n + 1), i >= list.length];
}

export function AssetIcon({ base, src, exts = LOGO_EXTS, fallbackId, size = 16, className }) {
  // Probe candidate URLs OFF-DOM: only mount an <img> once one is confirmed to
  // load, so a missing file never flashes the browser's broken-image icon. While
  // probing (and if all fail) we show the built-in glyph — never an empty box.
  const key = (src ? [src] : base ? exts.map((e) => `${base}.${e}`) : []).join("|");
  const [resolved, setResolved] = useState(null);
  useEffect(() => {
    setResolved(null);
    const urls = key ? key.split("|") : [];
    if (!urls.length) return undefined;
    let cancelled = false;
    const tryAt = (i) => {
      if (cancelled || i >= urls.length) return;
      const probe = new Image();
      probe.onload = () => { if (!cancelled) setResolved(urls[i]); };
      probe.onerror = () => tryAt(i + 1);
      probe.src = urls[i];
    };
    tryAt(0);
    return () => { cancelled = true; };
  }, [key]);

  if (resolved) {
    return (
      <img
        src={resolved} width={size} height={size} className={className}
        style={{ objectFit: "contain", display: "inline-block" }}
        alt="" aria-hidden="true"
      />
    );
  }
  return fallbackId ? <Icon id={fallbackId} size={size} className={className} /> : null;
}

/* Full-bleed photo (talks, backgrounds). Renders nothing once all extensions
   fail, letting the underlying placeholder/gradient show. */
export function Photo({ base, src, exts = PHOTO_EXTS, className, style }) {
  const [url, next, exhausted] = useCandidates(base, src, exts);
  if (exhausted) return null;
  return <img src={url} className={className} style={style} onError={next} loading="lazy" alt="" aria-hidden="true" />;
}
