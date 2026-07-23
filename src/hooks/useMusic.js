import { useCallback, useEffect, useRef, useState } from "react";

// Ambient background-music state, lifted to App so the <audio> element stays
// mounted (and keeps playing) regardless of the OPTIONS dropdown opening or
// closing. Play/pause is a button beside OPTIONS; volume + the credit "i" live
// inside the dropdown. It never starts on its own (browsers block sound without
// a gesture, and it would be intrusive): the visitor opts in. The on/off state
// and volume are remembered.
const SOURCES = [
  "/assets/ambient.mp3",
  "/assets/ambient.m4a",
  "/assets/ambient.ogg",
  "/assets/ambient.wav",
];
const KEY = "ovas-music-on";
const VOL_KEY = "ovas-music-vol";

function storedVolume() {
  try {
    const v = parseFloat(localStorage.getItem(VOL_KEY));
    return Number.isFinite(v) ? Math.min(1, Math.max(0, v)) : 0.35;
  } catch {
    return 0.35;
  }
}

export function useMusic() {
  const audioRef = useRef(null);
  const [src, setSrc] = useState(null); // first existing source, else null (control hidden)
  const [playing, setPlaying] = useState(false);
  const [volume, setVolumeState] = useState(storedVolume);
  const volumeRef = useRef(volume);

  // Probe candidates off-DOM; a missing asset simply leaves the control hidden.
  useEffect(() => {
    let cancelled = false;
    const tryAt = (i) => {
      if (cancelled || i >= SOURCES.length) return;
      const probe = new Audio();
      probe.preload = "metadata";
      const ok = () => { cleanup(); if (!cancelled) setSrc(SOURCES[i]); };
      const fail = () => { cleanup(); tryAt(i + 1); };
      const cleanup = () => {
        probe.removeEventListener("loadedmetadata", ok);
        probe.removeEventListener("error", fail);
      };
      probe.addEventListener("loadedmetadata", ok);
      probe.addEventListener("error", fail);
      probe.src = SOURCES[i];
    };
    tryAt(0);
    return () => { cancelled = true; };
  }, []);

  const setVolume = useCallback((next) => {
    const vol = Math.min(1, Math.max(0, next));
    volumeRef.current = vol;
    setVolumeState(vol);
    if (audioRef.current) audioRef.current.volume = vol;
    try { localStorage.setItem(VOL_KEY, String(vol)); } catch { /* ignore */ }
  }, []);

  const toggle = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;
    if (!el.paused) {
      el.pause();
      setPlaying(false);
      try { localStorage.setItem(KEY, "0"); } catch { /* ignore */ }
    } else {
      el.volume = volumeRef.current;
      el.play()
        .then(() => { setPlaying(true); try { localStorage.setItem(KEY, "1"); } catch { /* ignore */ } })
        .catch(() => setPlaying(false)); // gesture/format issue → stay paused
    }
  }, []);

  return { audioRef, src, available: Boolean(src), playing, toggle, volume, setVolume };
}
