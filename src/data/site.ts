/**
 * ─────────────────────────────────────────────────────────────
 *  CONTENIDO DEL PORTFOLIO
 *  Todo el texto del sitio vive aquí. Edita este archivo para
 *  poner tus datos reales: nombre, contacto, servicios y proyectos.
 *  Lo marcado con TODO es contenido de ejemplo que debes reemplazar.
 * ─────────────────────────────────────────────────────────────
 */

export const profile = {
  name: "Elthon Guevara", // TODO
  brand: "JoDevs",
  siteName: "JoDevs Studio", // nombre que Google muestra sobre el resultado de búsqueda
  brandType: "Estudio de desarrollo de software, DevOps, redes y ciberseguridad",
  founderRole: "Fundador e Ingeniero de Sistemas",
  role: "Desarrollador de Software & Ingeniero de Sistemas",
  location: "Cajamarca, Perú", // TODO
  timezone: "America/Lima", // TODO: zona horaria IANA para el reloj del footer
  available: true,
  email: "hola@jodevs.tech", // Cloudflare Email Routing lo reenvía a tu correo personal
  whatsapp: "51922837138", // número con código de país, sin + ni espacios
  siteUrl: "https://www.jodevs.tech", // dominio principal (jodevs.tech redirige aquí)
  headline: "Construimos software que impulsa a tu empresa a crecer.",
  headlineAccent: ["impulsa", "crecer."], // palabras en serif itálica y color de acento
  tagline:
    "Somos un estudio de tecnología: desarrollamos software a medida, automatizamos tu infraestructura y protegemos tus sistemas para ayudar a las empresas a vender más, operar mejor y escalar sin fricción.",
  about: [
    "JoDevs es un estudio de desarrollo de software, DevOps, redes y ciberseguridad fundado por Elthon Guevara, ingeniero de sistemas. Unimos la visión técnica de la ingeniería con el detalle del producto: entendemos cómo funciona tu negocio y lo traducimos en software que se usa, se mantiene y crece.",
    "En JoDevs trabajamos de punta a punta: desde el análisis de procesos y la arquitectura, hasta la nube, la red, la seguridad y el soporte. Sin intermediarios, con comunicación directa y entregas frecuentes.",
  ],
  stats: [
    { value: 5, suffix: "+", label: "Años de experiencia" }, // TODO
    { value: 30, suffix: "+", label: "Proyectos entregados" }, // TODO
    { value: 15, suffix: "+", label: "Empresas atendidas" }, // TODO
    { value: 99, suffix: "%", label: "Uptime en producción" }, // TODO
  ],
};

export const socials = [
  { label: "GitHub", href: "https://github.com/ElthonJohan", icon: "github" }, // TODO
  { label: "LinkedIn", href: "https://linkedin.com/in/elthon-guevara", icon: "linkedin" }, // TODO
  { label: "X", href: "https://x.com/tu-usuario", icon: "x" }, // TODO
] as const;

export const nav = [
  { label: "Servicios", href: "/#servicios" },
  { label: "Proyectos", href: "/#proyectos" },
  { label: "Proceso", href: "/#proceso" },
  { label: "Nosotros", href: "/#nosotros" },
];

export const stack = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "Python",
  "PostgreSQL",
  "MySQL",
  "MongoDB",
  "Docker",
  "AWS",
  "Linux",
  "Tailwind CSS",
  "React Native",
  "Laravel",
  "Redis",
  "Git & CI/CD",
];

export type ServiceIcon = "web" | "erp" | "cloud" | "network" | "security" | "ai";

export const services: {
  icon: ServiceIcon;
  title: string;
  description: string;
  items: string[];
}[] = [
  {
    icon: "web",
    title: "Desarrollo web y móvil",
    description:
      "Sitios, aplicaciones web y apps multiplataforma rápidas, accesibles y optimizadas para SEO que convierten visitas en clientes.",
    items: ["Sitios corporativos y e‑commerce", "Apps iOS / Android / PWA", "Portales y paneles de cliente"],
  },
  {
    icon: "erp",
    title: "Software empresarial e integraciones",
    description:
      "Sistemas de gestión adaptados a tus procesos y conectados con tus herramientas: pagos, facturación electrónica y servicios externos.",
    items: ["ERP / CRM a medida", "APIs REST / GraphQL", "Dashboards y BI"],
  },
  {
    icon: "cloud",
    title: "DevOps y cloud",
    description:
      "Despliegues automatizados, contenedores y monitoreo para que tu sistema escale y no se caiga.",
    items: ["AWS / VPS / Docker", "CI/CD y automatización", "Monitoreo, backups y alta disponibilidad"],
  },
  {
    icon: "network",
    title: "Redes e infraestructura",
    description:
      "Diseñamos, implementamos y administramos la red y los servidores de tu empresa, en oficina o en la nube.",
    items: ["Cableado estructurado y Wi‑Fi", "Servidores Linux / Windows", "VPN y conectividad entre sedes"],
  },
  {
    icon: "security",
    title: "Ciberseguridad",
    description:
      "Protegemos tus sistemas y datos: detectamos vulnerabilidades, endurecemos la infraestructura y preparamos a tu equipo.",
    items: ["Auditorías y pentesting", "Firewalls y hardening", "Políticas de acceso y respaldo"],
  },
  {
    icon: "ai",
    title: "Automatización & IA",
    description:
      "Eliminamos tareas repetitivas con flujos automáticos, bots e inteligencia artificial aplicada a tu negocio.",
    items: ["Chatbots y asistentes", "Automatización de procesos", "Extracción y análisis de datos"],
  },
];

export const process = [
  {
    title: "Descubrimiento",
    description:
      "Nos reunimos para entender tu negocio, tus objetivos y el problema real. Definimos alcance, prioridades y presupuesto claro.",
  },
  {
    title: "Diseño & arquitectura",
    description:
      "Prototipamos la experiencia y diseñamos la arquitectura técnica para que el sistema sea escalable y fácil de mantener.",
  },
  {
    title: "Desarrollo iterativo",
    description:
      "Construimos en ciclos cortos con demos frecuentes. Ves el avance real cada semana y ajustamos sobre la marcha.",
  },
  {
    title: "Lanzamiento & soporte",
    description:
      "Desplegamos, capacitamos a tu equipo y acompañamos la operación con monitoreo, mejoras y soporte continuo.",
  },
];

export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  description: string[];
  challenge: string;
  solution: string;
  results: string[];
  tags: string[];
  /** Colores del arte de portada generado. Se ignoran si defines `image`. */
  palette: [string, string];
  /** Opcional: ruta a una captura real, por ej. "/projects/inventario.jpg" (en /public) */
  image?: string;
  links?: { live?: string; repo?: string };
};

// TODO: proyectos de EJEMPLO. Reemplázalos por tus proyectos reales.
export const projects: Project[] = [
  {
    slug: "sistema-pos",
    title: "Tentto SaaS",
    category: "Sistema empresarial",
    year: "2026",
    summary:
      "Plataforma de gestión, ventas y facturación electrónica para negocios gastronómicos con múltiples sucursales.",
    description: [
      "Sistema web que centraliza el inventario de todas las sucursales, el punto de venta y la facturación electrónica en una sola plataforma.",
      "Incluye control de stock en tiempo real, registro de pedidos y comunicación con cocina, menú digital con QR, reportes de ventas y panel administrativo para gerentes y dueños.",
    ],
    challenge:
      "Los negocios gestionan su inventario en hojas de cálculo separadas por tienda, con quiebres de stock frecuentes y cierres de caja manuales.",
    solution:
      "Diseñé una arquitectura multi‑sucursal con sincronización en tiempo real, POS optimizado para teclado, e integración con el ente tributario.",
    results: ["−40% de quiebres de stock", "Cierre de caja en 5 min (antes 1 h)", "8 sucursales conectadas"],
    tags: ["Angular", "PostgreSQL", "Java", "Docker", "AWS"],
    palette: ["#ff8a3d", "#8f1a3a"],
    links: { live: "https://pos.tentto.app/home" },
  },
  {
    slug: "app-unimatch",
    title: "Go Unimatch",
    category: "App móvil",
    year: "2026",
    summary:
      "App red social para estudiantes universitarios que conecta a compañeros de clase, clubes y eventos en tiempo real.",
    description: [
      "App móvil multiplataforma con chat, grupos, eventos y notificaciones push para mantener a los estudiantes conectados y organizados.",
      "Incluye un sistema de autenticación con correo institucional, perfiles de usuario y un feed de noticias personalizado.",
    ],
    challenge:
      "Los estudiantes no tienen una plataforma centralizada para comunicarse, organizar eventos y compartir información académica, lo que genera desinformación y baja participación.",
    solution:
      "App en React Native con backend en Node.js y MongoDB, con notificaciones push y sincronización en tiempo real para chats y eventos.",
    results: ["+50% de participación en eventos", "Reducción de desinformación académica"],
    tags: ["React Native", "Node.js", "MongoDB", "Socket.io", "Firebase"],
    palette: ["#7c5cff", "#ff7ab6"],
    links: { live: "https://www.gounimatch.app/" },
  },
  {
    slug: "sistema-administrativo",
    title: "Sistema Administrativo",
    category: "Dashboard & BI",
    year: "2026",
    summary:
      "Sistema de gestion administrativa para Jardín en la ciudad de Cajamarca, registro y operaciones para la toma de decisiones diaria.",
    description: [
      "Dashboard interactivo con indicadores clave de desempeño (KPI) y reportes en tiempo real para la toma de decisiones.",
      "Incluye gráficos, comparativos, filtros y exportación de datos a Excel y PDF.",
    ],
    challenge:
      "Los reportes se generaban manualmente en hojas de cálculo, consumiendo mucho tiempo y generando errores.",
    solution:
      "Implementé un sistema web con panel administrativo y dashboards interactivos que se actualizan automáticamente con los datos del negocio.",
    results: ["Reportes en tiempo real", "−15 h/semana de trabajo manual", "Una única fuente de verdad"],
    tags: ["Python", "PostgreSQL", "React", "Recharts", "Cron"],
    palette: ["#3dd6ff", "#1a3a8f"],
    links: { live: "https://www.jardinmonserrat.com/" },
  },
  {
    slug: "ecommerce",
    title: "Leons Store",
    category: "E‑commerce",
    year: "2026",
    summary:
      "Tienda online de alto rendimiento con pasarela de pagos, gestión de pedidos e integración logística.",
    description: [
      "E‑commerce headless con catálogo, carrito, pagos con tarjeta y billeteras digitales, y seguimiento de pedidos.",
      "Panel administrativo para gestionar productos, promociones y envíos.",
    ],
    challenge:
      "El sitio web anterior tenía un flujo de compra lento y confuso, con imágenes pesadas y tiempos de carga altos, lo que generaba abandono del carrito.",
    solution:
      "Rediseñé el flujo de compra en un checkout de un solo paso, con imágenes optimizadas y renderizado en el servidor.",
    results: ["+35% en conversión", "Carga en < 1.5 s", "Lighthouse 98/100"],
    tags: ["Next.js", "Stripe", "Tailwind", "Vercel"],
    palette: ["#c8ff3d", "#1f5c3a"],
    links: { live: "https://leons-confecciones.vercel.app/" },
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
