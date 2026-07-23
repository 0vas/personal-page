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
    musicPlay: "Play ambient music",
    musicPause: "Pause music",
    options: "OPTIONS",
    optLanguage: "LANGUAGE",
    optTheme: "THEME",
    optDoc: "DOCUMENT",
    optMusic: "MUSIC",
    musicInfo: "Music credit",
    profile: {
      label: "Profile", title: "",
      fileKicker: "// PROFILE CORE",
      matrixKicker: "06 // 6 DOMAINS · 35 TECHNOLOGIES",
      matrixOverview: "CAPABILITIES",
      matrixHint: "Select a domain to view its technologies.",
      matrixTechnologies: "TECHNOLOGIES",
      matrixAria: "Interactive capability directory with six domains and thirty-five technologies.",
    },
    career: { label: "Career", title: "CAREER", kicker: "01 // SERVICE RECORD", hint: "TIMELINE — SELECT A ROLE TO EXPAND · NEWEST FIRST" },
    speaking: { label: "Speaking", title: "SPEAKING", kicker: "02 // GLOBAL SPEAKING TOUR", ambassador: "OFFICIAL DEVOPS AMBASSADOR — DEVOPS INSTITUTE", meta: ["9 TALKS", "6+ COUNTRIES", "3 CONTINENTS", "1 OFFICIAL GITHUB BROADCAST"], event: "EVENT", channel: "CHANNEL", viewSlides: "VIEW SLIDES", globeMode: "GEOSPATIAL TOUR INTERFACE / ONLINE", route: "ACTIVE ROUTE", selectedMission: "SELECTED APPEARANCE", selectEvent: "Select a conference", selectLocation: "Select location", locationLocked: "POSITION LOCKED", globeAria: "Interactive world tour centered on", timeline: "FLIGHT LOG / CHRONOLOGY", globeControl: "DRAG TO ROTATE · SELECT A LOCATION" },
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
      note: "Select a category to deploy its certifications; choose a credential to locate it in the registry. Verifiable on",
      noteDrill: "Category acquired — select any credential, or use Back to restore the complete atlas. Verifiable on",
      center: "CERTIFICATIONS", centerUnit: "CERTS", back: "BACK", clickHint: "click to deploy",
      overview: "ALL CATEGORIES", registry: "VERIFIED REGISTRY",
      registryHint: "SELECT A CATEGORY ON THE ATLAS",
      allCategories: "ALL CATEGORIES",
      chartAria: "Interactive sunburst atlas of 62 certifications grouped into nine categories.",
      featured: "HIGHLIGHTS", featuredHint: "Featured certifications",
      featuredIntro: "A focused selection of high-impact platform, architecture, DevOps and leadership credentials.",
      featuredSignal: "VERIFIED SIGNAL", featuredVerified: "CURATED CREDENTIAL",
      featuredLocate: "LOCATE IN ATLAS",
    },
    contact: {
      label: "Contact", title: "CONTACT", kicker: "END OF FILE // CHANNEL OPEN",
      heading1: "LET'S BUILD", heading2: "WHAT'S NEXT.",
      sub: "Platform engineering, applied AI, or a stage to share — the channel is open.",
      meta: ["© 2026 OSCAR LOBATON — 0VAS.COM", "BASE · LIMA, PERU · 12°02′S 77°01′W", "CIP N° 386940 — REGISTERED ENGINEER"],
      musicBy: "Music: “Arcano” —",
    },
    stats: {
      profile: ["CERTIFICATIONS", "62"],
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
    musicPlay: "Reproducir música ambiental",
    musicPause: "Pausar música",
    options: "OPCIONES",
    optLanguage: "IDIOMA",
    optTheme: "TEMA",
    optDoc: "DOCUMENTO",
    optMusic: "MÚSICA",
    musicInfo: "Crédito de la música",
    profile: {
      label: "Perfil", title: "",
      fileKicker: "// NÚCLEO DEL PERFIL",
      matrixKicker: "06 // 6 DOMINIOS · 35 TECNOLOGÍAS",
      matrixOverview: "CAPACIDADES",
      matrixHint: "Selecciona un dominio para ver sus tecnologías.",
      matrixTechnologies: "TECNOLOGÍAS",
      matrixAria: "Directorio interactivo de capacidades con seis dominios y treinta y cinco tecnologías.",
    },
    career: { label: "Carrera", title: "CARRERA", kicker: "01 // HOJA DE SERVICIO", hint: "LÍNEA DE TIEMPO — SELECCIONA UN ROL PARA EXPANDIR · MÁS RECIENTE PRIMERO" },
    speaking: { label: "Ponencias", title: "PONENCIAS", kicker: "02 // GIRA GLOBAL DE CONFERENCIAS", ambassador: "EMBAJADOR OFICIAL DEVOPS — DEVOPS INSTITUTE", meta: ["9 CHARLAS", "6+ PAÍSES", "3 CONTINENTES", "1 TRANSMISIÓN OFICIAL DE GITHUB"], event: "EVENTO", channel: "CANAL", viewSlides: "VER SLIDES", globeMode: "INTERFAZ GEOESPACIAL / EN LÍNEA", route: "RUTA ACTIVA", selectedMission: "APARICIÓN SELECCIONADA", selectEvent: "Selecciona una conferencia", selectLocation: "Seleccionar ubicación", locationLocked: "POSICIÓN FIJADA", globeAria: "Gira mundial interactiva centrada en", timeline: "BITÁCORA / CRONOLOGÍA", globeControl: "ARRASTRA PARA GIRAR · SELECCIONA UNA UBICACIÓN" },
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
      note: "Selecciona una categoría para desplegar sus certificaciones; elige una credencial para ubicarla en el registro. Verificable en",
      noteDrill: "Categoría adquirida — selecciona una credencial o usa Volver para restaurar el atlas completo. Verificable en",
      center: "CERTIFICACIONES", centerUnit: "CERTS", back: "VOLVER", clickHint: "clic para desplegar",
      overview: "TODAS LAS CATEGORÍAS", registry: "REGISTRO VERIFICADO",
      registryHint: "SELECCIONA UNA CATEGORÍA EN EL ATLAS",
      allCategories: "TODAS LAS CATEGORÍAS",
      chartAria: "Atlas sunburst interactivo de 62 certificaciones agrupadas en nueve categorías.",
      featured: "DESTACADAS", featuredHint: "Certificaciones destacadas",
      featuredIntro: "Una selección de credenciales de alto impacto en plataforma, arquitectura, DevOps y liderazgo.",
      featuredSignal: "SEÑAL VERIFICADA", featuredVerified: "CREDENCIAL SELECCIONADA",
      featuredLocate: "UBICAR EN EL ATLAS",
    },
    contact: {
      label: "Contacto", title: "CONTACTO", kicker: "FIN DEL EXPEDIENTE // CANAL ABIERTO",
      heading1: "CONSTRUYAMOS", heading2: "LO QUE SIGUE.",
      sub: "Ingeniería de plataformas, IA aplicada o un escenario que compartir — el canal está abierto.",
      meta: ["© 2026 OSCAR LOBATON — 0VAS.COM", "BASE · LIMA, PERÚ · 12°02′S 77°01′O", "CIP N° 386940 — INGENIERO COLEGIADO"],
      musicBy: "Música: «Arcano» —",
    },
    stats: {
      profile: ["CERTIFICACIONES", "62"],
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
