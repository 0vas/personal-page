/* ============================================================
   0VAS — content model (single source of truth)
   Translatable fields are { en, es } — resolved with L() from i18n.
   Drop-in image folders (see README):
     public/assets/talks/<slug>.jpg   — speaking photos
     public/assets/certs/<icon>.svg   — issuer logos (fallback: built-in glyph)
     public/assets/tech/<slug>.svg    — optional Profile capability marks
     public/assets/orgs/<slug>.svg    — company / institution logos (career)
   ============================================================ */

export const LINKS = {
  email: "mailto:oscarlobatons@outlook.com",
  emailText: "oscarlobatons@outlook.com",
  github: "https://github.com/0vas",
  linkedin: "https://www.linkedin.com/in/oscarlobatons/",
  credly: "https://www.credly.com/users/oscar-andres-lobaton-salas/badges",
  cv: "/assets/OscarLobatonS-CV-EN.pdf",
};

export const ROLES = {
  en: [
    "PLATFORM PRODUCT LEAD — CREDICORP",
    "DEVSECOPS ARCHITECT",
    "INTERNATIONAL SPEAKER",
    "DEVOPS INSTITUTE AMBASSADOR",
    "AI & ROBOTICS RESEARCHER",
  ],
  es: [
    "PLATFORM PRODUCT LEAD — CREDICORP",
    "ARQUITECTO DEVSECOPS",
    "SPEAKER INTERNACIONAL",
    "EMBAJADOR DEL DEVOPS INSTITUTE",
    "INVESTIGADOR EN IA Y ROBÓTICA",
  ],
};

export const READOUTS = [
  { value: 5, suffix: "+", label: { en: "YEARS EXPERIENCE", es: "AÑOS DE EXPERIENCIA" } },
  { value: 62, suffix: "", label: { en: "CERTIFICATIONS", es: "CERTIFICACIONES" } },
  { value: 9, suffix: "", label: { en: "CONFERENCE TALKS", es: "CHARLAS" } },
  { value: 8000, suffix: "+", label: { en: "DEVELOPERS REACHED", es: "DESARROLLADORES ALCANZADOS" } },
  { value: 1, prefix: "$", suffix: "M+", label: { en: "DOCUMENTED SAVINGS", es: "AHORROS DOCUMENTADOS" } },
];

export const PROFILE = {
  kicker: {
    en: "MODEL 0VAS — REGISTERED OPERATIVE · LIMA, PERU · CIP 386940",
    es: "MODELO 0VAS — OPERATIVO REGISTRADO · LIMA, PERÚ · CIP 386940",
  },
  lede: {
    en: "Systems Engineer — top of class, GPA 4.0 — leading platform strategy, DevSecOps and Generative AI adoption at Credicorp, the largest financial group in Peru. DevOps Institute Ambassador with talks across Latin America, Europe, the US and Asia.",
    es: "Ingeniero de Sistemas — primer puesto, GPA 4.0 — lidera la estrategia de plataformas, DevSecOps y la adopción de IA Generativa en Credicorp, el grupo financiero más grande del Perú. Embajador del DevOps Institute con charlas en Latinoamérica, Europa, EE. UU. y Asia.",
  },
};

export const BIO = [
  {
    en: "I lead the platform strategy of Credicorp, defining golden paths and self-service capabilities for engineering teams across the group. My work sits at the intersection of platform engineering, DevSecOps and Generative AI — making thousands of engineers faster, safer and measurably more productive.",
    es: "Lidero la estrategia de plataformas de Credicorp, definiendo golden paths y capacidades de autoservicio para los equipos de ingeniería del grupo. Mi trabajo une la ingeniería de plataformas, DevSecOps e IA Generativa — haciendo a miles de ingenieros más rápidos, seguros y medibles en su productividad.",
  },
  {
    en: "The record includes a Generative AI adoption program that increased delivery speed by 22%, an InnerSource initiative connecting 15 companies and 8,000+ developers, and technical governance of DevSecOps at corporate scale.",
    es: "El expediente incluye un programa de adopción de IA Generativa que aumentó la velocidad de entrega en 22%, una iniciativa InnerSource que conecta 15 empresas y más de 8,000 desarrolladores, y la gobernanza técnica de DevSecOps a escala corporativa.",
  },
  {
    en: "Outside the enterprise: research on AI applied to humanoid robotics, university teaching from 2020 to 2024, and a background in video game development — the origin of this interface.",
    es: "Fuera de la empresa: investigación en IA aplicada a robótica humanoide, docencia universitaria de 2020 a 2024 y un origen en el desarrollo de videojuegos — de ahí nace esta interfaz.",
  },
];

/* ---------- career (tree + details) ----------
   Org logo: public/assets/orgs/<logo>.svg */

export const CAREER_DETAILS = {
  lead: {
    logo: "credicorp",
    title: { en: "Platform Product Lead", es: "Platform Product Lead" },
    org: "CREDICORP",
    date: { en: "FEB 2026 — PRESENT", es: "FEB 2026 — PRESENTE" },
    status: { en: "ACTIVE", es: "ACTIVO" },
    notes: [
      { en: "Define and lead the platform strategy and roadmap — self-service capabilities and golden paths across the group.", es: "Define y lidera la estrategia y el roadmap de plataformas — capacidades de autoservicio y golden paths para todo el grupo." },
      { en: "Lead a team of expert platform engineers designing, standardizing and scaling shared platform capabilities.", es: "Lidera un equipo de ingenieros de plataforma expertos que diseñan, estandarizan y escalan capacidades compartidas." },
      { en: "Drive the evolution from technical governance to a product-oriented platform model aligned with developer experience, security and operational efficiency.", es: "Impulsa la evolución de la gobernanza técnica hacia un modelo de plataforma como producto, alineado con developer experience, seguridad y eficiencia operativa." },
    ],
    keys: [
      { en: "Platform as a product", es: "Plataforma como producto" },
      { en: "Golden paths", es: "Golden paths" },
      { en: "Developer experience", es: "Developer experience" },
    ],
  },
  architect: {
    logo: "credicorp",
    title: { en: "Corporate DevSecOps Architect", es: "Arquitecto DevSecOps Corporativo" },
    org: "CREDICORP",
    date: { en: "OCT 2024 — JAN 2026", es: "OCT 2024 — ENE 2026" },
    notes: [
      { en: "Technology advisor (VSDP, IDP, SEIP, AST, GenAI, FM, DAC, EAP) for multiple companies within the group.", es: "Asesor tecnológico (VSDP, IDP, SEIP, AST, GenAI, FM, DAC, EAP) para múltiples empresas del grupo." },
      { en: "Led the InnerSource initiative connecting technology teams across 15 companies.", es: "Lideró la iniciativa InnerSource conectando equipos de tecnología de 15 empresas." },
      { en: "Led DevSecOps technical governance and organized corporate engineering events (IT Engineering Workshops).", es: "Lideró la gobernanza técnica de DevSecOps y organizó eventos corporativos de ingeniería (IT Engineering Workshops)." },
      { en: "Speaker at DevSecOpsFest and GitHubWeek — Docs as Code and Prompt Engineering.", es: "Speaker en DevSecOpsFest y GitHubWeek — Docs as Code y Prompt Engineering." },
    ],
    keys: [
      { en: "InnerSource × 15 companies", es: "InnerSource × 15 empresas" },
      { en: "Technical governance", es: "Gobernanza técnica" },
    ],
  },
  pacifico: {
    logo: "pacifico",
    title: { en: "DevSecOps Architect", es: "Arquitecto DevSecOps" },
    org: "PACÍFICO SEGUROS — CREDICORP",
    date: { en: "MAR 2024 — OCT 2024", es: "MAR 2024 — OCT 2024" },
    notes: [
      { en: "Managed and led Generative AI adoption at Pacífico Seguros and Prima AFP, increasing delivery speed by 22%.", es: "Gestionó y lideró la adopción de IA Generativa en Pacífico Seguros y Prima AFP, aumentando la velocidad de entrega en 22%." },
      { en: "Led the documentation-as-code program, saving 75% of developers' search time.", es: "Lideró el programa de documentación como código, ahorrando 75% del tiempo de búsqueda de los desarrolladores." },
      { en: "Finalist in the corporate innovation competition (Espiral de Innovación) with the GenAI adoption model.", es: "Finalista del concurso corporativo de innovación (Espiral de Innovación) con el modelo de adopción de IA Generativa." },
      { en: "Speaker at DevOpsDays Medellín and with GitHub on GenAI adoption — GitHub Copilot.", es: "Speaker en DevOpsDays Medellín y con GitHub sobre adopción de IA Generativa — GitHub Copilot." },
    ],
    keys: [
      { en: "+22% delivery speed", es: "+22% velocidad de entrega" },
      { en: "−75% search time", es: "−75% tiempo de búsqueda" },
      { en: "Innovation finalist", es: "Finalista de innovación" },
    ],
  },
  baufest: {
    logo: "baufest",
    title: { en: "DevOps Specialist", es: "Especialista DevOps" },
    org: { en: "BAUFEST — CLIENT: PACÍFICO SEGUROS", es: "BAUFEST — CLIENTE: PACÍFICO SEGUROS" },
    date: { en: "AUG 2023 — MAR 2024", es: "AGO 2023 — MAR 2024" },
    notes: [
      { en: "Led the research project on Generative AI adoption — GitHub Copilot.", es: "Lideró el proyecto de investigación sobre adopción de IA Generativa — GitHub Copilot." },
      { en: "Migrated Ansible Tower to GitHub Actions, saving $15,000.", es: "Migró Ansible Tower a GitHub Actions, ahorrando $15,000." },
      { en: "Managed GitHub repository migration, standardization and AKS upgrade.", es: "Gestionó la migración y estandarización de repositorios GitHub y la actualización de AKS." },
    ],
    keys: [
      { en: "Copilot research", es: "Investigación Copilot" },
      { en: "$15K saved", es: "$15K ahorrados" },
    ],
  },
  nocountry: {
    logo: "nocountry",
    title: { en: "DevOps Engineer", es: "Ingeniero DevOps" },
    org: "NO COUNTRY",
    date: { en: "JUN 2023 — JUL 2023", es: "JUN 2023 — JUL 2023" },
    notes: [
      { en: "Built CI/CD pipelines for a Spring Boot backend (Maven, Docker, JUnit, Azure DevOps) and a React frontend (npm, Docker, SonarCloud).", es: "Construyó pipelines CI/CD para un backend Spring Boot (Maven, Docker, JUnit, Azure DevOps) y un frontend React (npm, Docker, SonarCloud)." },
      { en: "Provisioned infrastructure with Azure DevOps and Azure Cloud; coordinated the development team.", es: "Aprovisionó infraestructura con Azure DevOps y Azure Cloud; coordinó al equipo de desarrollo." },
    ],
    keys: [
      { en: "CI/CD pipelines", es: "Pipelines CI/CD" },
      { en: "Team coordination", es: "Coordinación de equipo" },
    ],
  },
  novatronic: {
    logo: "novatronic",
    title: { en: "Software Engineer — DevOps Services", es: "Ingeniero de Software — Servicios DevOps" },
    org: "NOVATRONIC",
    date: { en: "FEB 2022 — MAY 2023", es: "FEB 2022 — MAY 2023" },
    notes: [
      { en: "Proposed, designed and implemented an automated testing application (Cypress, Jenkins, Spring Boot, Docker), leading a team of four.", es: "Propuso, diseñó e implementó una aplicación de pruebas automatizadas (Cypress, Jenkins, Spring Boot, Docker), liderando un equipo de cuatro." },
      { en: "Led technical feasibility research on OpenShift and database backup tooling (DRP).", es: "Lideró la investigación de viabilidad técnica de OpenShift y de herramientas de respaldo de bases de datos (DRP)." },
      { en: "Awarded as representative of the innovation value — promoter of new technologies and DevOps culture.", es: "Premiado como representante del valor de innovación — promotor de nuevas tecnologías y cultura DevOps." },
    ],
    keys: [
      { en: "Test automation platform", es: "Plataforma de pruebas" },
      { en: "Innovation award", es: "Premio a la innovación" },
    ],
  },
  freelance: {
    logo: "freelance",
    title: { en: "Web · Game · Data Developer", es: "Desarrollador Web · Juegos · Datos" },
    org: { en: "INDEPENDENT", es: "INDEPENDIENTE" },
    date: { en: "JAN 2021 — JUL 2022", es: "ENE 2021 — JUL 2022" },
    notes: [
      { en: "Designed and led a business intelligence system for Leap Game Studios and a sales platform for Maderera Nueva Era.", es: "Diseñó y lideró un sistema de inteligencia de negocios para Leap Game Studios y una plataforma de ventas para Maderera Nueva Era." },
      { en: "Designed and published video games and augmented reality applications.", es: "Diseñó y publicó videojuegos y aplicaciones de realidad aumentada." },
    ],
    keys: [
      { en: "Published games", es: "Juegos publicados" },
      { en: "AR applications", es: "Aplicaciones AR" },
    ],
  },
  gamedevs: {
    logo: "gamedevs",
    title: { en: "Game Developer", es: "Desarrollador de Videojuegos" },
    org: "GAME DEVS UNI",
    date: { en: "MAR 2020 — FEB 2021", es: "MAR 2020 — FEB 2021" },
    notes: [
      { en: "Video game development group at the National University of Engineering.", es: "Grupo de desarrollo de videojuegos de la Universidad Nacional de Ingeniería." },
      { en: "CatchCatch — multiplayer hunter-prey game in Unity 3D with Photon; PacMan-inspired personal project.", es: "CatchCatch — juego multijugador cazador-presa en Unity 3D con Photon; proyecto personal inspirado en Pac-Man." },
    ],
    keys: [
      { en: "Unity 3D · C#", es: "Unity 3D · C#" },
      { en: "Multiplayer (Photon)", es: "Multijugador (Photon)" },
    ],
  },
  acm: {
    logo: "acm",
    title: { en: "Junior Member — Competitive Programming", es: "Miembro Junior — Programación Competitiva" },
    org: "ACM — FIIS UNI",
    date: { en: "JAN 2019 — FEB 2020", es: "ENE 2019 — FEB 2020" },
    notes: [
      { en: "Algorithmic problem-solving research group of the Faculty of Industrial and Systems Engineering.", es: "Grupo de investigación en resolución de problemas con algoritmos de la Facultad de Ingeniería Industrial y de Sistemas." },
      { en: "Participated in IEEE Xtreme 2019.", es: "Participó en IEEE Xtreme 2019." },
    ],
    keys: [{ en: "IEEE Xtreme 2019", es: "IEEE Xtreme 2019" }],
  },
  nixvoid: {
    logo: "nixvoid",
    title: { en: "Instructor", es: "Instructor" },
    org: "NIXVOID",
    date: { en: "SEP 2020 — 2024", es: "SEP 2020 — 2024" },
    notes: [
      { en: "Taught software development courses to students of the National University of Engineering for over four years.", es: "Enseñó cursos de desarrollo de software a estudiantes de la Universidad Nacional de Ingeniería durante más de cuatro años." },
    ],
    keys: [{ en: "4+ years teaching", es: "4+ años de docencia" }],
  },
  ailab: {
    logo: "ailab",
    title: { en: "Research Collaborator", es: "Colaborador de Investigación" },
    org: { en: "AI & ROBOTICS LAB — LIMA", es: "LABORATORIO DE IA Y ROBÓTICA — LIMA" },
    date: { en: "AUG 2024 — PRESENT", es: "AGO 2024 — PRESENTE" },
    status: { en: "ACTIVE", es: "ACTIVO" },
    notes: [
      { en: "Lead a three-student team exploring AI applications for humanoid robotics.", es: "Lidera un equipo de tres estudiantes explorando aplicaciones de IA para robótica humanoide." },
      { en: "Built a conversational interaction system using LangChain, LLM APIs, RAG pipelines and custom models — training costs reduced ~100% with open-source tooling and free-tier cloud.", es: "Construyó un sistema de interacción conversacional con LangChain, APIs de LLM, pipelines RAG y modelos propios — costos de entrenamiento reducidos ~100% con herramientas open source y nube gratuita." },
    ],
    keys: [
      { en: "Humanoid robotics", es: "Robótica humanoide" },
      { en: "RAG pipelines", es: "Pipelines RAG" },
    ],
  },
  devopsinstitute: {
    logo: "devopsinstitute",
    title: { en: "DevOps Ambassador", es: "Embajador DevOps" },
    org: "DEVOPS INSTITUTE",
    date: { en: "NOV 2025 — PRESENT", es: "NOV 2025 — PRESENTE" },
    status: { en: "ACTIVE", es: "ACTIVO" },
    notes: [
      { en: "Support the community and accelerate DevOps adoption — speaking at technology events and contributing to open-source initiatives.", es: "Apoya a la comunidad y acelera la adopción de DevOps — como speaker en eventos de tecnología y contribuyendo a iniciativas open source." },
    ],
    keys: [{ en: "Community leadership", es: "Liderazgo comunitario" }],
  },
  dss: {
    logo: "devsecopsspace",
    title: { en: "Ambassador", es: "Embajador" },
    org: "DEVSECOPS SPACE",
    date: { en: "MAY 2026 — PRESENT", es: "MAY 2026 — PRESENTE" },
    status: { en: "ACTIVE", es: "ACTIVO" },
    notes: [
      { en: "Ambassador of the DevSecOps Space community.", es: "Embajador de la comunidad DevSecOps Space." },
    ],
    keys: [{ en: "DevSecOps community", es: "Comunidad DevSecOps" }],
  },
};

/* Career shown as a vertical timeline grouped into sub-sections; within each
   group, roles are newest → oldest by start date.
   Education (uni, mit, hanyang) lives only in EDUCATION, never here. */
export const CAREER_GROUPS = [
  {
    id: "professional",
    name: { en: "PROFESSIONAL EXPERIENCE", es: "EXPERIENCIA PROFESIONAL" },
    dids: ["lead", "architect", "pacifico", "baufest", "nocountry", "novatronic", "freelance"],
  },
  {
    id: "complementary",
    name: { en: "COMPLEMENTARY ACTIVITIES", es: "ACTIVIDADES COMPLEMENTARIAS" },
    dids: ["dss", "devopsinstitute", "ailab"],
  },
  {
    id: "academic",
    name: { en: "ACADEMIC ACTIVITIES", es: "ACTIVIDADES ACADÉMICAS" },
    dids: ["nixvoid", "gamedevs", "acm"],
  },
];

/* flat order (all roles), kept for convenience / tests */
export const CAREER_ORDER = CAREER_GROUPS.flatMap((g) => g.dids);

/* short category tag per role, for the timeline */
export const CAREER_KIND = {
  lead: { en: "CORPORATE", es: "CORPORATIVO" },
  architect: { en: "CORPORATE", es: "CORPORATIVO" },
  pacifico: { en: "CORPORATE", es: "CORPORATIVO" },
  baufest: { en: "CONSULTING", es: "CONSULTORÍA" },
  nocountry: { en: "FREELANCE", es: "FREELANCE" },
  novatronic: { en: "ENGINEERING", es: "INGENIERÍA" },
  freelance: { en: "FREELANCE", es: "FREELANCE" },
  gamedevs: { en: "GAME DEV", es: "VIDEOJUEGOS" },
  acm: { en: "ACADEMIC", es: "ACADÉMICO" },
  nixvoid: { en: "TEACHING", es: "DOCENCIA" },
  ailab: { en: "RESEARCH", es: "INVESTIGACIÓN" },
  devopsinstitute: { en: "COMMUNITY", es: "COMUNIDAD" },
  dss: { en: "COMMUNITY", es: "COMUNIDAD" },
};

/* ---------- speaking (real talk titles) ---------- */

export const TALKS = [
  {
    slug: "devopsdays-medellin-2026", code: "DOD·MDE", name: "DevOpsDays Medellín", year: "2026",
    countryCodes: ["CO"],
    geo: [{ lat: 6.2442, lon: -75.5812, label: "MEDELLÍN" }],
    flag: "🇨🇴", where: "MEDELLÍN, COLOMBIA",
    title: "Números Bonitos, Madurez Falsa",
    desc: {
      en: "Designing a Platform Engineering measurement system that moves beyond misleading maturity metrics, connecting DORA, SPACE, and DevEx indicators to real outcomes such as flow, stability, developer experience, and platform value.",
      es: "Diseño de un sistema de medición de Platform Engineering que va más allá de las métricas de madurez engañosas, conectando indicadores DORA, SPACE y DevEx con resultados reales como flujo, estabilidad, experiencia del desarrollador y valor de la plataforma.",
    },
    url: "https://devopsdays.org/",
  },
  {
    slug: "devopsdays-buenosaires-2026", code: "DOD·BUE", name: "DevOpsDays Buenos Aires", year: "2026",
    countryCodes: ["AR"],
    geo: [{ lat: -34.6037, lon: -58.3816, label: "BUENOS AIRES" }],
    flag: "🇦🇷", where: "BUENOS AIRES, ARGENTINA",
    title: "Construyendo un Framework de Platform Engineering: De silos DevSecOps a X-as-a-Service",
    desc: {
      en: "Transforming software delivery across a highly federated financial group by shifting from fragmented DevSecOps efforts to a scalable Platform Engineering model with stronger governance, clearer ownership, and preserved local autonomy.",
      es: "Transformando la entrega de software en un grupo financiero altamente federado, pasando de esfuerzos DevSecOps fragmentados a un modelo escalable de Platform Engineering con mayor gobernanza, ownership más claro y autonomía local preservada.",
    },
    url: "https://devopsdays.org/",
  },
  {
    slug: "agile-summit-2025", code: "AGL·SUM", name: "Agile Summit", year: "2025",
    countryCodes: ["PE"],
    geo: [{ lat: -12.0464, lon: -77.0428, label: "LIMA" }],
    flag: "🇵🇪", where: { en: "LIMA, PERU", es: "LIMA, PERÚ" },
    title: "Más allá de DevOps: InnerSource como catalizador de la agilidad",
    desc: {
      en: "InnerSource brings open-source collaboration inside the enterprise to break silos, boost reuse, and scale agility beyond DevOps through shared ownership, transparent contribution workflows, and faster value delivery.",
      es: "InnerSource lleva la colaboración open source dentro de la empresa para romper silos, impulsar la reutilización y escalar la agilidad más allá de DevOps mediante ownership compartido, flujos de contribución transparentes y una entrega de valor más rápida.",
    },
  },
  {
    slug: "innersource-summit-2025", code: "ISC·SUM", name: "InnerSource Summit", year: "2025",
    countryCodes: ["DE", "US", "JP"],
    geo: [
      { lat: 52.52, lon: 13.405, label: "BERLIN" },
      { lat: 40.7128, lon: -74.006, label: "NEW YORK" },
      { lat: 35.6762, lon: 139.6503, label: "TOKYO" },
    ],
    flag: "🇩🇪🇺🇸🇯🇵", where: { en: "GERMANY · USA · JAPAN", es: "ALEMANIA · EE. UU. · JAPÓN" },
    title: "Building Bridges: Scaling InnerSource",
    desc: {
      en: "How we scaled InnerSource at Credicorp (10+ companies, 8,000+ developers) by connecting multiple GitHub Enterprise Cloud environments to enable secure cross-company code reuse and contributions — plus the technical patterns, architecture, and lessons learned.",
      es: "Cómo escalamos InnerSource en Credicorp (10+ empresas, 8,000+ desarrolladores) conectando múltiples entornos de GitHub Enterprise Cloud para habilitar la reutilización y contribución segura de código entre empresas — más los patrones técnicos, la arquitectura y las lecciones aprendidas.",
    },
    url: "https://innersourcecommons.org/",
  },
  {
    slug: "devopsdays-santiago-2025", code: "DOD·SCL", name: "DevOpsDays Santiago", year: "2025",
    countryCodes: ["CL"],
    geo: [{ lat: -33.4489, lon: -70.6693, label: "SANTIAGO" }],
    flag: "🇨🇱", where: "SANTIAGO, CHILE",
    title: "La Evolución del Open Source en la Cultura Empresarial",
    desc: {
      en: "A practical guide to adopting InnerSource: applying open-source collaboration inside the enterprise to improve reuse, speed, and developer experience — without losing governance or control.",
      es: "Una guía práctica para adoptar InnerSource: aplicar la colaboración open source dentro de la empresa para mejorar la reutilización, la velocidad y la experiencia del desarrollador — sin perder gobernanza ni control.",
    },
    url: "https://devopsdays.org/events/2025-santiago/welcome/",
  },
  {
    slug: "devopsdays-lima-2025", code: "DOD·LIM", name: "DevOpsDays Lima", year: "2025",
    countryCodes: ["PE"],
    geo: [{ lat: -12.0464, lon: -77.0428, label: "LIMA" }],
    flag: "🇵🇪", where: { en: "LIMA, PERU", es: "LIMA, PERÚ" },
    title: "Las Mentiras de las Métricas: Midiendo sin Caer en Trampas",
    desc: {
      en: "DevOps metrics without the hype: DORA, SPACE, and DevEx — what to avoid and how to measure for real outcomes.",
      es: "Métricas DevOps sin humo: DORA, SPACE y DevEx — qué evitar y cómo medir para obtener resultados reales.",
    },
    url: "https://devopsdays.org/events/2025-lima/welcome/",
  },
  {
    slug: "devsecopsfest-2024", code: "DSO·FST", name: "DevSecOps Fest", year: "2024",
    countryCodes: ["PE"],
    geo: [{ lat: -12.0464, lon: -77.0428, label: "LIMA" }],
    flag: "🇵🇪", where: { en: "LIMA, PERU", es: "LIMA, PERÚ" },
    title: "Gestionando el conocimiento con Documentation as Code: el “Efecto Mandela” en la documentación",
    desc: {
      en: "Documentation as Code helps fight the “Mandela Effect” in organizations — keeping knowledge consistent, reviewable, and versioned as the system evolves.",
      es: "Documentation as Code ayuda a combatir el “Efecto Mandela” en las organizaciones, manteniendo el conocimiento consistente, revisable y versionado a medida que el sistema evoluciona.",
    },
  },
  {
    slug: "devopsdays-medellin-2024", code: "DOD·MDE", name: "DevOpsDays Medellín", year: "2024",
    countryCodes: ["CO"],
    geo: [{ lat: 6.2442, lon: -75.5812, label: "MEDELLÍN" }],
    flag: "🇨🇴", where: "MEDELLÍN, COLOMBIA",
    title: "Adopción de GenAI para revolucionar el desarrollo de software: Journey de Pacífico Seguros",
    desc: {
      en: "Presentation at DevOpsDays Medellín with Lenard Vega.",
      es: "Ponencia en DevOpsDays Medellín junto a Lenard Vega.",
    },
  },
  {
    slug: "github-connect-2024", code: "GH·YT", name: "GitHub · YouTube", year: "2024",
    countryCodes: ["GLOBAL"],
    geo: [{ lat: 37.7749, lon: -122.4194, label: "GLOBAL BROADCAST" }],
    flag: "🌐", where: { en: "GITHUB OFFICIAL YOUTUBE", es: "YOUTUBE OFICIAL DE GITHUB" },
    title: "Impulsando la productividad del desarrollador con GitHub Copilot",
    desc: {
      en: "Interview with GitHub on their official YouTube channel.",
      es: "Entrevista con GitHub en su canal oficial de YouTube.",
    },
    url: "https://www.youtube.com/@GitHub", status: { en: "BROADCAST", es: "TRANSMISIÓN" }, broadcast: true,
  },
];

/* ---------- projects ---------- */

export const PROJECTS = [
  {
    id: "PRJ-01", tag: { en: "GENERATIVE AI", es: "IA GENERATIVA" }, stars: 5, lang: "MARKDOWN", langColor: "#b7a4f0",
    shortName: { en: "PROMPT QUADRANT", es: "CUADRANTE DE PROMPTS" }, visual: "quadrant", tech: ["GENAI", "PROMPT SYSTEMS", "MARKDOWN"],
    name: "quadrant-dev-prompt-engineering",
    desc: {
      en: "A methodical \"quadrant\" framework for prompt engineering in developer-centric contexts — structured techniques for crafting and optimizing prompts across GenAI use cases.",
      es: "Un marco metodológico de \"cuadrantes\" para prompt engineering en contextos de desarrollo — técnicas estructuradas para crear y optimizar prompts en casos de uso de IA Generativa.",
    },
    url: "https://github.com/0vas/quadrant-dev-prompt-engineering",
  },
  {
    id: "PRJ-02", tag: { en: "MIGRATION", es: "MIGRACIÓN" }, stars: 1, lang: "SHELL", langColor: "#89e051",
    shortName: { en: "WIKI MIGRATOR", es: "MIGRADOR DE WIKIS" }, visual: "wiki-flow", tech: ["AZURE DEVOPS", "GITHUB WIKI", "SHELL"],
    name: "migrator-azdevops-wiki-to-github",
    desc: {
      en: "Migrates Azure DevOps wikis to GitHub Wiki preserving structure, hierarchy, attachments and formatting. Local or fully automated via GitHub Actions.",
      es: "Migra wikis de Azure DevOps a GitHub Wiki preservando estructura, jerarquía, adjuntos y formato. Local o totalmente automatizado con GitHub Actions.",
    },
    url: "https://github.com/0vas/migrator-azdevops-wiki-to-github",
  },
  {
    id: "PRJ-03", tag: { en: "AUTOMATION", es: "AUTOMATIZACIÓN" }, lang: "SHELL", langColor: "#89e051",
    shortName: { en: "REPOSITORY BRIDGE", es: "PUENTE DE REPOS" }, visual: "bridge", tech: ["GITHUB ACTIONS", "GHAS", "SHELL"],
    name: "enterprise-repository-bridge",
    desc: {
      en: "GitHub Action that clones repositories between private organizations — creates the target repo, pushes content, and applies branch protection and GHAS settings.",
      es: "GitHub Action que clona repositorios entre organizaciones privadas — crea el repo destino, sube el contenido y aplica protección de ramas y configuración GHAS.",
    },
    url: "https://github.com/0vas/enterprise-repository-bridge",
  },
  {
    id: "PRJ-04", tag: { en: "MIGRATION", es: "MIGRACIÓN" }, lang: "SHELL", langColor: "#89e051",
    shortName: { en: "REPO MIGRATOR", es: "MIGRADOR DE REPOS" }, visual: "migration", tech: ["GITLAB", "BITBUCKET", "GITHUB"],
    name: "repomigrator-to-github",
    desc: {
      en: "Migration toolkit for moving repositories from GitLab, Bitbucket or GitHub into a GitHub organization — verification, migration and cleanup scripts.",
      es: "Kit de migración para mover repositorios desde GitLab, Bitbucket o GitHub hacia una organización de GitHub — scripts de verificación, migración y limpieza.",
    },
    url: "https://github.com/0vas/repomigrator-to-github",
  },
  {
    id: "PRJ-05", tag: { en: "SYNC", es: "SINCRONIZACIÓN" }, lang: "ACTION", langColor: "#8b5cf6",
    shortName: { en: "SYNC SIGNAL", es: "SEÑAL DE SYNC" }, visual: "sync", tech: ["GITHUB ACTIONS", "SYNC", "LOGGING"],
    name: "simple-sync-repo",
    desc: {
      en: "Lightweight GitHub Action to synchronize repositories between organizations, with detailed logging and error handling.",
      es: "GitHub Action ligera para sincronizar repositorios entre organizaciones, con logs detallados y manejo de errores.",
    },
    url: "https://github.com/0vas/simple-sync-repo",
  },
  {
    id: "PRJ-06", tag: { en: "DOCS-AS-CODE", es: "DOCS COMO CÓDIGO" }, lang: "CSS", langColor: "#563d7c",
    shortName: { en: "SLIDES BUILDER", es: "CONSTRUCTOR DE SLIDES" }, visual: "slides", tech: ["SLIDEV", "GENERATIVE AI", "CSS"],
    name: "slides-builder",
    desc: {
      en: "AI-assisted Slidev workspace template for building, validating and publishing presentation decks as code.",
      es: "Plantilla de espacio de trabajo Slidev asistida por IA para construir, validar y publicar presentaciones como código.",
    },
    url: "https://github.com/0vas/slides-builder",
  },
];

/* ---------- education (academic) ---------- */

export const EDUCATION = [
  {
    idx: "A-01", logo: "uni",
    title: { en: "B.Sc. Systems Engineering", es: "Ingeniería de Sistemas" },
    org: { en: "National University of Engineering (UNI), Peru", es: "Universidad Nacional de Ingeniería (UNI), Perú" },
    meta: { en: "COMPLETED 2023 · GPA 4.0 — TOP OF CLASS · CIP 386940", es: "COMPLETADA 2023 · GPA 4.0 — PRIMER PUESTO · CIP 386940" },
    gold: true,
    notes: [
      { en: "Ranked among the top three in project fairs, twice · Student representative, 2021.", es: "Top 3 en ferias de proyectos, dos veces · Representante estudiantil, 2021." },
      { en: "1.5 years of competitive programming (IEEE Xtreme) · 2 years in GameDevsUNI, the university's game development group.", es: "1.5 años de programación competitiva (IEEE Xtreme) · 2 años en GameDevsUNI, el grupo de desarrollo de videojuegos de la universidad." },
      { en: "Registered engineer — Colegio de Ingenieros del Perú, CIP N° 386940.", es: "Ingeniero colegiado — Colegio de Ingenieros del Perú, CIP N° 386940." },
    ],
  },
  {
    idx: "A-02", logo: "mit",
    title: { en: "Applied Agentic AI for Organizational Transformation", es: "IA Agéntica Aplicada a la Transformación Empresarial" },
    org: { en: "MIT Professional Education", es: "MIT Professional Education" },
    meta: { en: "PROGRAM · DEC 2025 — FEB 2026", es: "PROGRAMA · DIC 2025 — FEB 2026" },
    notes: [
      { en: "LangChain, agentic AI development and organizational transformation with AI agents.", es: "LangChain, desarrollo de IA agéntica y transformación organizacional con agentes de IA." },
    ],
  },
  {
    idx: "A-03", logo: "hanyang",
    title: { en: "B.Eng. AI Engineering", es: "Ingeniería de IA" },
    org: { en: "Hanyang Cyber University, South Korea", es: "Universidad Cibernética Hanyang, Corea del Sur" },
    meta: { en: "IN PROGRESS · EXPECTED 2027", es: "EN CURSO · PREVISTA 2027" },
    notes: [
      { en: "Second degree focused on artificial intelligence, pursued while working full-time.", es: "Segunda carrera enfocada en inteligencia artificial, cursada mientras trabaja a tiempo completo." },
    ],
  },
];

/* ---------- certifications (62, grouped into 9 categories) ----------
   Issuer logo: public/assets/certs/<icon>.svg (fallback: built-in glyph) */

export const CERT_CATEGORIES = [
  {
    id: "azure",
    name: { en: "AZURE", es: "AZURE" },
    color: "#5a7bef",
    catIcon: "azure",
    certs: [
      { name: "Azure Solutions Architect Expert", issuer: "Microsoft", icon: "microsoft", year: "2024", level: "EXPERT", badge: "azure-solutions-architect" },
      { name: "Azure DevOps Engineer Expert", issuer: "Microsoft", icon: "microsoft", year: "2023", level: "EXPERT", badge: "azure-devops-engineer" },
      { name: "Azure Developer Associate", issuer: "Microsoft", icon: "microsoft", year: "2023", level: "ASSOCIATE", badge: "azure-developer" },
      { name: "Azure AI Engineer Associate", issuer: "Microsoft", icon: "microsoft", year: "2025", level: "ASSOCIATE", badge: "azure-ai-engineer" },
      { name: "Azure Administrator Associate", issuer: "Microsoft", icon: "microsoft", year: "2023", level: "ASSOCIATE", badge: "azure-administrator" },
      { name: "Azure Fundamentals", issuer: "Microsoft", icon: "microsoft", year: "2023", badge: "azure-fundamentals" },
      { name: "Azure Data Fundamentals", issuer: "Microsoft", icon: "microsoft", year: "2024", badge: "azure-data-fundamentals" },
      { name: "Azure AI Fundamentals", issuer: "Microsoft", icon: "microsoft", year: "2024", badge: "azure-ai-fundamentals" },
    ],
  },
  {
    id: "github",
    name: { en: "GITHUB", es: "GITHUB" },
    color: "#8b5cf6",
    catIcon: "github",
    certs: [
      { name: "GitHub Copilot", issuer: "GitHub", icon: "github", year: "2024", level: "CERTIFIED" },
      { name: "GitHub Administration", issuer: "GitHub", icon: "github", year: "2024", level: "CERTIFIED" },
      { name: "GitHub Advanced Security", issuer: "GitHub", icon: "github", year: "2024", level: "CERTIFIED" },
      { name: "GitHub Actions", issuer: "GitHub", icon: "github", year: "2024", level: "CERTIFIED" },
      { name: "GitHub Foundations", issuer: "GitHub", icon: "github", year: "2024" },
    ],
  },
  {
    id: "platform",
    name: { en: "PLATFORM", es: "PLATAFORMA" },
    color: "#14a8a2",
    catIcon: "platform",
    certs: [
      { name: "Platform Engineering Certified Practitioner", issuer: "Platform Engineering", icon: "platform", year: "2025", level: "PRACTITIONER", featured: true },
      { name: "Introduction to Platform Engineering", issuer: "Platform Engineering", icon: "platform", year: "2025" },
      { name: "Observability for Platform Engineering", issuer: "Platform Engineering", icon: "platform", year: "2025" },
      { name: "Intro to AI in Platform Engineering", issuer: "Platform Engineering", icon: "platform", year: "2025" },
    ],
  },
  {
    id: "redhat",
    name: { en: "RED HAT", es: "RED HAT" },
    color: "#d6565f",
    catIcon: "redhat",
    certs: [
      { name: "Technical Workshop — OpenShift AI", issuer: "Red Hat", icon: "redhat", year: "2024" },
      { name: "Cloud Automation", issuer: "Red Hat", icon: "redhat", year: "2024" },
      { name: "Windows Automation with Ansible", issuer: "Red Hat", icon: "redhat", year: "2024" },
      { name: "OpenShift on AWS (ROSA)", issuer: "Red Hat", icon: "redhat", year: "2024" },
      { name: "Ansible for Red Hat Enterprise Linux", issuer: "Red Hat", icon: "redhat", year: "2023" },
      { name: "Containers & Cloud-Native Development", issuer: "Red Hat", icon: "redhat", year: "2023" },
      { name: "Ansible Automation for Security & Compliance", issuer: "Red Hat", icon: "redhat", year: "2023" },
      { name: "Azure Red Hat OpenShift Fundamentals", issuer: "Red Hat", icon: "redhat", year: "2023" },
      { name: "Event-Driven Architecture Development", issuer: "Red Hat", icon: "redhat", year: "2023" },
      { name: "Getting Started with Red Hat OpenShift", issuer: "Red Hat", icon: "redhat", year: "2023" },
    ],
  },
  {
    id: "cloud",
    name: { en: "MULTI-CLOUD", es: "MULTI-NUBE" },
    color: "#3f9de0",
    catIcon: "cloud",
    certs: [
      { name: "Google Cloud Computing Certificate", issuer: "Google", icon: "google", year: "2025" },
      { name: "Google Cloud Computing Foundations", issuer: "Google", icon: "google", year: "2023" },
      { name: "Google Cloud Fundamentals: Core Infrastructure", issuer: "Google", icon: "google", year: "2022" },
      { name: "Essential Google Cloud Infrastructure: Core Services", issuer: "Google", icon: "google", year: "2022" },
      { name: "Google Cloud Digital Leader Training", issuer: "Google", icon: "google", year: "2022" },
      { name: "AWS Cloud Technical Essentials", issuer: "AWS", icon: "aws", year: "2022" },
      { name: "OCI Foundations 2021 Certified Associate", issuer: "Oracle", icon: "oracle", year: "2022", level: "ASSOCIATE" },
      { name: "IBM Cloud Essentials", issuer: "IBM", icon: "ibm", year: "2022" },
    ],
  },
  {
    id: "devops",
    name: { en: "DEVOPS & GITOPS", es: "DEVOPS Y GITOPS" },
    color: "#4fae62",
    catIcon: "devops",
    certs: [
      { name: "Terraform Associate (003)", issuer: "HashiCorp", icon: "hashicorp", year: "2024", level: "ASSOCIATE" },
      { name: "GitOps Fundamentals", issuer: "Codefresh", icon: "codefresh", year: "2025" },
      { name: "Introduction to DevOps: Practices and Tools", issuer: "The Linux Foundation", icon: "linuxfoundation", year: "2023" },
      { name: "DevSecOps Habits", issuer: "Fluid Attacks", icon: "fluidattacks", year: "2024" },
      { name: "Docker Essentials: A Developer Introduction", issuer: "IBM", icon: "ibm", year: "2022" },
      { name: "Containers & Kubernetes Essentials", issuer: "IBM", icon: "ibm", year: "2023" },
      { name: "Git", issuer: "OpenBootcamp", icon: "openbootcamp", year: "2022" },
    ],
  },
  {
    id: "leadership",
    name: { en: "LEADERSHIP", es: "LIDERAZGO" },
    color: "#d9a53f",
    catIcon: "leadership",
    certs: [
      { name: "Forward Program", issuer: "McKinsey & Company", icon: "mckinsey", year: "2026", level: "LEADERSHIP" },
      { name: "Aspire Leaders Program", issuer: "Harvard Business School", icon: "harvard", year: "2026", level: "LEADERSHIP" },
      { name: "Método Harvard de Negociación", issuer: "IEP", icon: "iep", year: "2022" },
      { name: "Generative AI Overview for Project Managers", issuer: "PMI", icon: "pmi", year: "2024" },
      { name: "Data Landscape of GenAI for Project Managers", issuer: "PMI", icon: "pmi", year: "2024" },
      { name: "Management for Beginners", issuer: "PMI", icon: "pmi", year: "2022" },
      { name: "Scrum Foundation Professional Certificate", issuer: "Certiprof", icon: "certiprof", year: "2021" },
      { name: "Digital Marketing Professional Certificate", issuer: "Certiprof", icon: "certiprof", year: "2022" },
      { name: "Enterprise Design Thinking Practitioner", issuer: "IBM", icon: "ibm", year: "2022" },
      { name: "Jira Fundamentals Badge", issuer: "Atlassian", icon: "atlassian", year: "2022" },
    ],
  },
  {
    id: "data",
    name: { en: "DATA & AI", es: "DATOS E IA" },
    color: "#b559c8",
    catIcon: "data",
    certs: [
      { name: "Artificial Intelligence Fundamentals", issuer: "IBM", icon: "ibm", year: "2024" },
      { name: "Principles of Reactive Architecture", issuer: "IBM", icon: "ibm", year: "2022" },
      { name: "Relational Databases (RDBMS) Essentials", issuer: "IBM", icon: "ibm", year: "2022" },
      { name: "Databases for Developers: Foundations", issuer: "Oracle", icon: "oracle", year: "2020" },
      { name: "Databases for Developers: Next Level", issuer: "Oracle", icon: "oracle", year: "2021" },
      { name: "Databases for Developers: Performance", issuer: "Oracle", icon: "oracle", year: "2021" },
      { name: "Introducción al Internet de las Cosas", issuer: "Samsung", icon: "samsung", year: "2022" },
    ],
  },
  {
    id: "security",
    name: { en: "SECURITY", es: "SEGURIDAD" },
    color: "#6d78d9",
    catIcon: "security",
    certs: [
      { name: "CyberOps Associate", issuer: "Cisco", icon: "cisco", year: "2022", level: "ASSOCIATE" },
      { name: "CCNA: Introduction to Networks", issuer: "Cisco", icon: "cisco", year: "2021" },
      { name: "Cyber Security Foundation Professional Certificate", issuer: "Certiprof", icon: "certiprof", year: "2021" },
    ],
  },
];

export const CERT_TOTAL = CERT_CATEGORIES.reduce((n, g) => n + g.certs.length, 0);

/* ---------- skills ----------
   Slugs remain stable content identifiers for the interactive Profile directory. */

export const SKILLS = [
  {
    name: { en: "CLOUD PLATFORMS", es: "PLATAFORMAS CLOUD" },
    items: [
      { n: "Azure", s: "azure" }, { n: "Google Cloud", s: "googlecloud" },
      { n: "AWS", s: "aws" }, { n: "Oracle Cloud", s: "oraclecloud" },
    ],
  },
  {
    name: { en: "DEVOPS & PLATFORM", es: "DEVOPS Y PLATAFORMA" },
    items: [
      { n: "GitHub Actions", s: "githubactions" }, { n: "Jenkins", s: "jenkins" },
      { n: "Azure DevOps", s: "azuredevops" }, { n: "Terraform", s: "terraform" },
      { n: "Docker", s: "docker" }, { n: "Kubernetes", s: "kubernetes" },
      { n: "OpenShift", s: "openshift" }, { n: "GitOps", s: "gitops" },
    ],
  },
  {
    name: { en: "AI ENGINEERING", es: "INGENIERÍA DE IA" },
    items: [
      { n: "LangChain", s: "langchain" }, { n: "Agentic AI", s: "agents" }, { n: "MCP", s: "mcp" },
      { n: "RAG", s: "rag" }, { n: "Fine-tuning", s: "finetuning" }, { n: "Prompt Engineering", s: "prompt" },
    ],
  },
  {
    name: { en: "LANGUAGES", es: "LENGUAJES" },
    items: [
      { n: "Python", s: "python" }, { n: "Bash", s: "bash" }, { n: "C++", s: "cpp" },
      { n: "C#", s: "csharp" }, { n: "Java", s: "java" }, { n: "JavaScript", s: "javascript" },
    ],
  },
  {
    name: { en: "ARCHITECTURE & DESIGN", es: "ARQUITECTURA Y DISEÑO" },
    items: [
      { n: "TOGAF", s: "togaf" }, { n: "C4 Model", s: "c4" }, { n: "BPMN", s: "bpmn" },
      { n: "UML", s: "uml" }, { n: "CMMI", s: "cmmi" },
    ],
  },
  {
    name: { en: "DATA & GAME DEV", es: "DATOS Y VIDEOJUEGOS" },
    items: [
      { n: "Oracle DB", s: "oracledb" }, { n: "PostgreSQL", s: "postgresql" },
      { n: "MongoDB", s: "mongodb" }, { n: "Power BI", s: "powerbi" },
      { n: "Unity 3D", s: "unity" }, { n: "AR Apps", s: "ar" },
    ],
  },
];
