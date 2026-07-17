/* ============================================================
   0VAS — i18n: L() resolves {en,es} fields; STRINGS holds UI copy
   ============================================================ */

export const L = (v, lang) =>
  v && typeof v === "object" && ("en" in v || "es" in v) ? (v[lang] ?? v.en) : v;

export const STRINGS = {
  en: {
    eyebrow: "0VAS // PERSONNEL INTERFACE",
    intro: {
      system: "PERSONNEL OS · v3.0",
      lines: [
        { label: "BOOTING SYSTEM", value: "OK" },
        { label: "LOADING PERSONNEL FILE", value: "OK" },
        { label: "VERIFYING CREDENTIAL MATRIX", value: "62/62" },
        { label: "SYNCING SERVICE RECORD", value: "OK" },
        { label: "CALIBRATING INTERFACE", value: "OK" },
        { label: "ESTABLISHING SECURE CHANNEL", value: "OK" },
      ],
      allGreen: "SYSTEM ALL GREEN",
      ready: "OPERATIVE ONLINE",
    },
    navigate: "Navigate",
    cv: "CV",
    themeDark: "Dark",
    themeLight: "Light",
    lang: "Español",
    downloadCV: "Download CV",
    contactBtn: "Contact",
    options: "OPTIONS",
    optLanguage: "LANGUAGE",
    optTheme: "THEME",
    optDoc: "DOCUMENT",
    home: {
      label: "Home", title: "",
      fileKicker: "// PERSONAL FILE",
      caption: "SYSTEM DIAGNOSTIC — CAPABILITY PROFILE",
    },
    career: { label: "Career", title: "CAREER", kicker: "01 // SERVICE RECORD", hint: "TIMELINE — SELECT A ROLE TO EXPAND · NEWEST FIRST" },
    speaking: { label: "Speaking", title: "SPEAKING", kicker: "02 // GLOBAL SPEAKING TOUR", ambassador: "OFFICIAL DEVOPS AMBASSADOR — DEVOPS INSTITUTE", meta: ["9 TALKS", "6+ COUNTRIES", "3 CONTINENTS", "1 OFFICIAL GITHUB BROADCAST"], event: "EVENT", channel: "CHANNEL", globeMode: "GEOSPATIAL TOUR INTERFACE / ONLINE", route: "ACTIVE ROUTE", selectedMission: "SELECTED APPEARANCE", selectEvent: "Select a conference", selectLocation: "Select location", locationLocked: "POSITION LOCKED", globeAria: "Interactive world tour centered on", timeline: "FLIGHT LOG / CHRONOLOGY", globeControl: "DRAG TO ROTATE · SELECT A LOCATION" },
    projects: {
      label: "Projects", title: "PROJECTS", kicker: "03 // OPEN SOURCE CONTROL ROOM",
      index: "SOURCE INDEX", blueprint: "LIVE BLUEPRINT", selected: "SELECTED SOURCE",
      technologies: "TECHNOLOGIES", mode: "VISUAL MODE",
      hint: "SELECT A SOURCE · ↑↓ HOME END", all: "ALL REPOSITORIES", view: "OPEN REPOSITORY",
    },
    education: { label: "Education", title: "EDUCATION", kicker: "04 // ACADEMIC RECORD" },
    certifications: {
      label: "Certifications", title: "CERTIFICATIONS",
      kicker: "05 // ACCREDITATION — 62 CERTIFICATIONS · 9 CATEGORIES",
      note: "Click a category on the wheel to zoom into its certifications — the registry follows. Verifiable on",
      noteDrill: "Showing one category — click the center to zoom back out. Verifiable on",
      center: "CERTIFICATIONS", centerUnit: "CERTS", back: "BACK", clickHint: "click to zoom",
      featured: "HIGHLIGHTS", featuredHint: "Featured certifications",
      featuredIntro: "A focused selection of high-impact platform, architecture, DevOps and leadership credentials.",
    },
    contact: {
      label: "Contact", title: "CONTACT", kicker: "END OF FILE // CHANNEL OPEN",
      heading1: "LET'S BUILD", heading2: "WHAT'S NEXT.",
      sub: "Platform engineering, applied AI, or a stage to share — the channel is open.",
      meta: ["© 2026 OSCAR LOBATON — 0VAS.COM", "BASE · LIMA, PERU · 12°02′S 77°01′W", "CIP N° 386940 — REGISTERED ENGINEER"],
    },
    stats: {
      home: ["CERTIFICATIONS", "62"],
      career: ["YEARS EXPERIENCE", "5+"], speaking: ["CONFERENCE TALKS", "9"],
      projects: ["REPOSITORIES", "6"], education: ["ACADEMIC PROGRAMS", "3"],
      certifications: ["VERIFIED", "62"], contact: ["STATUS", "OPEN"],
    },
  },
  es: {
    eyebrow: "0VAS // INTERFAZ DE PERSONAL",
    intro: {
      system: "OS DE PERSONAL · v3.0",
      lines: [
        { label: "INICIANDO SISTEMA", value: "OK" },
        { label: "CARGANDO EXPEDIENTE PERSONAL", value: "OK" },
        { label: "VERIFICANDO MATRIZ DE CREDENCIALES", value: "62/62" },
        { label: "SINCRONIZANDO HISTORIAL PROFESIONAL", value: "OK" },
        { label: "CALIBRANDO INTERFAZ", value: "OK" },
        { label: "ESTABLECIENDO CANAL SEGURO", value: "OK" },
      ],
      allGreen: "TODOS LOS SISTEMAS EN VERDE",
      ready: "OPERATIVO EN LÍNEA",
    },
    navigate: "Navegar",
    cv: "CV",
    themeDark: "Oscuro",
    themeLight: "Claro",
    lang: "English",
    downloadCV: "Descargar CV",
    contactBtn: "Contacto",
    options: "OPCIONES",
    optLanguage: "IDIOMA",
    optTheme: "TEMA",
    optDoc: "DOCUMENTO",
    home: {
      label: "Inicio", title: "",
      fileKicker: "// EXPEDIENTE PERSONAL",
      caption: "DIAGNÓSTICO DEL SISTEMA — PERFIL DE CAPACIDADES",
    },
    career: { label: "Carrera", title: "CARRERA", kicker: "01 // HOJA DE SERVICIO", hint: "LÍNEA DE TIEMPO — SELECCIONA UN ROL PARA EXPANDIR · MÁS RECIENTE PRIMERO" },
    speaking: { label: "Ponencias", title: "PONENCIAS", kicker: "02 // GIRA GLOBAL DE CONFERENCIAS", ambassador: "EMBAJADOR OFICIAL DEVOPS — DEVOPS INSTITUTE", meta: ["9 CHARLAS", "6+ PAÍSES", "3 CONTINENTES", "1 TRANSMISIÓN OFICIAL DE GITHUB"], event: "EVENTO", channel: "CANAL", globeMode: "INTERFAZ GEOESPACIAL / EN LÍNEA", route: "RUTA ACTIVA", selectedMission: "APARICIÓN SELECCIONADA", selectEvent: "Selecciona una conferencia", selectLocation: "Seleccionar ubicación", locationLocked: "POSICIÓN FIJADA", globeAria: "Gira mundial interactiva centrada en", timeline: "BITÁCORA / CRONOLOGÍA", globeControl: "ARRASTRA PARA GIRAR · SELECCIONA UNA UBICACIÓN" },
    projects: {
      label: "Proyectos", title: "PROYECTOS", kicker: "03 // SALA DE CONTROL OPEN SOURCE",
      index: "ÍNDICE DE FUENTES", blueprint: "PLANO EN VIVO", selected: "FUENTE SELECCIONADA",
      technologies: "TECNOLOGÍAS", mode: "MODO VISUAL",
      hint: "SELECCIONA UNA FUENTE · ↑↓ INICIO FIN", all: "TODOS LOS REPOSITORIOS", view: "ABRIR REPOSITORIO",
    },
    education: { label: "Educación", title: "EDUCACIÓN", kicker: "04 // EXPEDIENTE ACADÉMICO" },
    certifications: {
      label: "Certificaciones", title: "CERTIFICACIONES",
      kicker: "05 // ACREDITACIÓN — 62 CERTIFICACIONES · 9 CATEGORÍAS",
      note: "Haz clic en una categoría de la rueda para hacer zoom en sus certificaciones — el registro te sigue. Verificable en",
      noteDrill: "Mostrando una categoría — haz clic en el centro para volver. Verificable en",
      center: "CERTIFICACIONES", centerUnit: "CERTS", back: "VOLVER", clickHint: "clic para ampliar",
      featured: "DESTACADAS", featuredHint: "Certificaciones destacadas",
      featuredIntro: "Una selección de credenciales de alto impacto en plataforma, arquitectura, DevOps y liderazgo.",
    },
    contact: {
      label: "Contacto", title: "CONTACTO", kicker: "FIN DEL EXPEDIENTE // CANAL ABIERTO",
      heading1: "CONSTRUYAMOS", heading2: "LO QUE SIGUE.",
      sub: "Ingeniería de plataformas, IA aplicada o un escenario que compartir — el canal está abierto.",
      meta: ["© 2026 OSCAR LOBATON — 0VAS.COM", "BASE · LIMA, PERÚ · 12°02′S 77°01′O", "CIP N° 386940 — INGENIERO COLEGIADO"],
    },
    stats: {
      home: ["CERTIFICACIONES", "62"],
      career: ["AÑOS DE EXPERIENCIA", "5+"], speaking: ["CHARLAS", "9"],
      projects: ["REPOSITORIOS", "6"], education: ["PROGRAMAS ACADÉMICOS", "3"],
      certifications: ["VERIFICADAS", "62"], contact: ["ESTADO", "ABIERTO"],
    },
  },
};

export function detectLang() {
  try {
    const q = new URLSearchParams(window.location.search).get("lang");
    if (q === "es" || q === "en") return q;
    const stored = localStorage.getItem("ovas-lang");
    if (stored === "es" || stored === "en") return stored;
    return (navigator.language || "en").toLowerCase().startsWith("es") ? "es" : "en";
  } catch {
    return "en";
  }
}
