import { useEffect, useState } from "react";

// Profile ambient motif. Prefers an owner-supplied illustration, per theme:
//   /assets/turtle-home-light.png  (light chrome)
//   /assets/turtle-home-dark.png   (dark chrome — neon line version)
// then a shared /assets/turtle-home.png, then a code-native line-art fallback.
// Lives in the right half of the hero; never overlaps the name; frozen by
// reduced-motion. Images are chroma-keyed from a solid-green source (clean edges).
export default function ProfileTurtle({ theme }) {
  const variant = theme === "dark" ? "dark" : "light";
  const sources = [`/assets/turtle-home-${variant}.png`, "/assets/turtle-home.png"];
  const [idx, setIdx] = useState(0);

  // Re-try the theme-specific source whenever the theme flips.
  useEffect(() => { setIdx(0); }, [variant]);

  return (
    <div className="bd-profile-turtle" aria-hidden="true">
      {idx < sources.length ? (
        <img
          key={sources[idx]}
          className="pt-img"
          src={sources[idx]}
          alt=""
          onError={() => setIdx((i) => i + 1)}
        />
      ) : (
        <svg className="pt-svg" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* rear flippers */}
          <path className="pt-limb pt-lr" d="M92 162C80 174 66 188 60 200 57 205 64 207 69 203 82 193 92 180 98 170 101 166 95 158 92 162Z" />
          <path className="pt-limb pt-rr" d="M128 162C140 174 154 188 160 200 163 205 156 207 151 203 138 193 128 180 122 170 119 166 125 158 128 162Z" />
          <path className="pt-detail" d="M78 176C84 182 90 186 96 188M142 176C136 182 130 186 124 188" />
          {/* tail */}
          <path className="pt-limb pt-tail" d="M104 178 110 196 116 178Z" />

          {/* front flippers (each grouped with its inner vein so they flap together) */}
          <g className="pt-flap pt-lf">
            <path className="pt-limb" d="M74 96C56 80 40 66 22 58 16 55 12 62 16 68 28 86 50 100 72 106 78 108 80 100 74 96Z" />
            <path className="pt-detail" d="M28 66C44 78 60 92 72 100" />
          </g>
          <g className="pt-flap pt-rf">
            <path className="pt-limb" d="M146 96C164 80 180 66 198 58 204 55 208 62 204 68 192 86 170 100 148 106 142 108 140 100 146 96Z" />
            <path className="pt-detail" d="M192 66C176 78 160 92 148 100" />
          </g>

          {/* head + neck */}
          <path className="pt-limb pt-neck" d="M100 58 120 58 118 48 102 48Z" />
          <ellipse className="pt-limb pt-head" cx="110" cy="44" rx="13" ry="15" />
          <path className="pt-detail" d="M101 40C105 37 115 37 119 40" />
          <circle className="pt-eye" cx="104" cy="41" r="2" />
          <circle className="pt-eye" cx="116" cy="41" r="2" />

          {/* carapace: outline, dashed marginal rim, scute grid and tribal swirls */}
          <path className="pt-shell" d="M110 56C138 58 158 84 158 116 158 150 136 174 110 180 84 174 62 150 62 116 62 84 82 58 110 56Z" />
          <path className="pt-rim" d="M110 64C134 66 150 88 150 116 150 146 132 166 110 172 88 166 70 146 70 116 70 88 86 66 110 64Z" />
          <path className="pt-facet" d="M104 66C102 90 102 142 108 172M116 66C118 90 118 142 112 172M103 92 117 92M102 116 118 116M103 140 117 140M104 78 74 92M102 104 68 116M103 130 72 148M108 158 86 168M116 78 148 92M118 104 152 116M117 130 148 148M112 158 134 168" />
          <path className="pt-swirl" d="M92 98C86 98 84 105 89 108 93 110 98 106 95 101M128 98C134 98 136 105 131 108 127 110 122 106 125 101M110 120C115 120 118 125 114 129 110 132 104 130 105 125" />
        </svg>
      )}
    </div>
  );
}
