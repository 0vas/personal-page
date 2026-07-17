import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/* stagger presets */
export const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, ease: [0.22, 0.68, 0.3, 1] },
};

export function Reveal({ children, delay = 0, className, style }) {
  return (
    <motion.div
      className={["reveal", className].filter(Boolean).join(" ")}
      style={style}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(delay, 0.1), ease: [0.22, 0.68, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* typing rotation */
export function useTyped(words, { type = 46, erase = 22, hold = 2200, gap = 420 } = {}) {
  const [text, setText] = useState(() => words[0] || "");
  useEffect(() => {
    const first = words[0] || "";
    setText(first);
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches || words.length < 2) return undefined;

    let wi = 0, ci = first.length, del = true, t;
    const step = () => {
      const w = words[wi];
      let d;
      if (!del) {
        ci += 1; setText(w.slice(0, ci)); d = type + Math.random() * 24;
        if (ci > w.length) { del = true; d = hold; }
      } else {
        ci -= 1; setText(w.slice(0, Math.max(0, ci))); d = erase;
        if (ci === 0) { del = false; wi = (wi + 1) % words.length; d = gap; }
      }
      t = setTimeout(step, d);
    };
    t = setTimeout(step, hold);
    return () => clearTimeout(t);
  }, [words, type, erase, hold, gap]);
  return text;
}

/* animated counter */
export function Counter({ value, prefix = "", suffix = "", duration = 1400 }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let raf;
    const t0 = performance.now();
    const frame = (t) => {
      const p = Math.min((t - t0) / duration, 1);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);
  return <>{prefix}{n}{suffix}</>;
}

/* decorative micro label */
export function Micro({ text, style }) {
  return <span className="micro" style={style} aria-hidden="true">{text}</span>;
}
