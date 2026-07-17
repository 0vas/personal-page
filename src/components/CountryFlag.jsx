const NAMES = {
  AR: "Argentina",
  CL: "Chile",
  CO: "Colombia",
  DE: "Germany",
  JP: "Japan",
  PE: "Peru",
  US: "United States",
  GLOBAL: "Global broadcast",
};

function FlagGeometry({ code }) {
  switch (code) {
    case "AR":
      return <><rect width="18" height="12" fill="#75aadb" /><rect y="4" width="18" height="4" fill="#f7f5ee" /><circle cx="9" cy="6" r="1.15" fill="#c99628" /></>;
    case "CL":
      return <><rect width="18" height="12" fill="#f8f7f2" /><rect y="6" width="18" height="6" fill="#c83642" /><rect width="6.5" height="6" fill="#244b91" /><path d="m3.25 1.2.62 1.25 1.38.2-1 1 .24 1.38-1.24-.65-1.24.65.24-1.38-1-1 1.38-.2Z" fill="#fff" /></>;
    case "CO":
      return <><rect width="18" height="12" fill="#f1cf3a" /><rect y="6" width="18" height="3" fill="#244b91" /><rect y="9" width="18" height="3" fill="#c83642" /></>;
    case "DE":
      return <><rect width="18" height="4" fill="#242127" /><rect y="4" width="18" height="4" fill="#bb2f3a" /><rect y="8" width="18" height="4" fill="#d3a72e" /></>;
    case "JP":
      return <><rect width="18" height="12" fill="#f8f7f2" /><circle cx="9" cy="6" r="2.8" fill="#bc3041" /></>;
    case "PE":
      return <><rect width="18" height="12" fill="#c83543" /><rect x="6" width="6" height="12" fill="#f8f7f2" /></>;
    case "US":
      return <><rect width="18" height="12" fill="#f7f5ee" />{[0, 2, 4, 6, 8, 10].map((y) => <rect key={y} y={y} width="18" height="1" fill="#bd3947" />)}<rect width="8" height="6.5" fill="#304b83" /><circle cx="2" cy="2" r=".45" fill="#fff" /><circle cx="4" cy="2" r=".45" fill="#fff" /><circle cx="6" cy="2" r=".45" fill="#fff" /><circle cx="3" cy="4.2" r=".45" fill="#fff" /><circle cx="5" cy="4.2" r=".45" fill="#fff" /></>;
    default:
      return <><circle cx="9" cy="6" r="4.6" fill="none" stroke="currentColor" strokeWidth=".8" /><path d="M4.4 6h9.2M9 1.4c2.4 2.5 2.4 6.7 0 9.2M9 1.4c-2.4 2.5-2.4 6.7 0 9.2" fill="none" stroke="currentColor" strokeWidth=".65" /></>;
  }
}

export default function CountryFlag({ code, className = "" }) {
  const label = NAMES[code] || NAMES.GLOBAL;
  return (
    <span className={`country-flag ${className}`}>
      <svg viewBox="0 0 18 12" role="img" aria-label={label}>
        <title>{label}</title>
        <FlagGeometry code={code} />
      </svg>
    </span>
  );
}
