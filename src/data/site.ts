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
  role: "Desarrollador de Software & Ingeniero de Sistemas",
  location: "Cajamarca, Perú", // TODO
  timezone: "America/Lima", // TODO: zona horaria IANA para el reloj del footer
  available: true,
  email: "soporte@mail.jodevs.tech", // TODO
  whatsapp: "922837138", // TODO: número con código de país, sin + ni espacios. Ej: 51999999999
  siteUrl: "https://jodevs.tech", // TODO
  tagline:
    "Diseño y construyo software a medida, sistemas empresariales e infraestructura que ayudan a las empresas a vender más, operar mejor y escalar sin fricción.",
  about: [
    "Soy ingeniero de sistemas y desarrollador full‑stack. Uno la visión técnica de la ingeniería con el detalle del producto: entiendo cómo funciona tu negocio y lo traduzco en software que se usa, se mantiene y crece.",
    "Trabajo de punta a punta: desde el análisis de procesos y la arquitectura, hasta el despliegue en la nube, la automatización y el soporte. Sin intermediarios, con comunicación directa y entregas frecuentes.",
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
  { label: "Sobre mí", href: "/#sobre-mi" },
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

export type ServiceIcon = "web" | "erp" | "mobile" | "api" | "cloud" | "ai";

export const services: {
  icon: ServiceIcon;
  title: string;
  description: string;
  items: string[];
}[] = [
  {
    icon: "web",
    title: "Desarrollo web a medida",
    description:
      "Sitios y aplicaciones web rápidas, accesibles y optimizadas para SEO que convierten visitas en clientes.",
    items: ["Landing pages y sitios corporativos", "E‑commerce", "Portales y paneles de cliente"],
  },
  {
    icon: "erp",
    title: "Sistemas empresariales",
    description:
      "Software de gestión adaptado a tus procesos: inventario, ventas, facturación, RR.HH. y reportes en tiempo real.",
    items: ["ERP / CRM a medida", "Dashboards y BI", "Roles, permisos y auditoría"],
  },
  {
    icon: "mobile",
    title: "Aplicaciones móviles",
    description:
      "Apps multiplataforma para iOS y Android con una sola base de código, conectadas a tus sistemas.",
    items: ["React Native / PWA", "Notificaciones y modo offline", "Publicación en tiendas"],
  },
  {
    icon: "api",
    title: "APIs e integraciones",
    description:
      "Conecto tus herramientas entre sí: pasarelas de pago, facturación electrónica, ERPs, CRMs y servicios externos.",
    items: ["APIs REST / GraphQL", "Pasarelas de pago", "Migración de datos"],
  },
  {
    icon: "cloud",
    title: "Cloud, DevOps e infraestructura",
    description:
      "Despliegues seguros y automatizados, servidores, redes y monitoreo para que tu sistema no se caiga.",
    items: ["AWS / VPS / Docker", "CI/CD y backups", "Seguridad y redes"],
  },
  {
    icon: "ai",
    title: "Automatización & IA",
    description:
      "Elimino tareas repetitivas con flujos automáticos, bots e inteligencia artificial aplicada a tu negocio.",
    items: ["Chatbots y asistentes", "Automatización de procesos", "Extracción y análisis de datos"],
  },
];

export const process = [
  {
    title: "Descubrimiento",
    description:
      "Nos reunimos para entender tu negocio, tus objetivos y el problema real. Defino alcance, prioridades y presupuesto claro.",
  },
  {
    title: "Diseño & arquitectura",
    description:
      "Prototipo la experiencia y diseño la arquitectura técnica para que el sistema sea escalable y fácil de mantener.",
  },
  {
    title: "Desarrollo iterativo",
    description:
      "Construyo en ciclos cortos con demos frecuentes. Ves el avance real cada semana y ajustamos sobre la marcha.",
  },
  {
    title: "Lanzamiento & soporte",
    description:
      "Despliego, capacito a tu equipo y acompaño la operación con monitoreo, mejoras y soporte continuo.",
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
    year: "2025",
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
    slug: "app-reservas",
    title: "Agendo",
    category: "App móvil",
    year: "2025",
    summary:
      "App de reservas y pagos para clínicas y centros de servicio, con recordatorios automáticos por WhatsApp.",
    description: [
      "Aplicación móvil y panel web para gestionar citas, profesionales, horarios y pagos en línea.",
      "Los clientes reservan en segundos y reciben recordatorios automáticos, reduciendo inasistencias.",
    ],
    challenge:
      "Las citas se agendaban por teléfono, con un alto porcentaje de ausencias y doble reserva de horarios.",
    solution:
      "App en React Native con calendario en tiempo real, pagos anticipados y un bot de WhatsApp para confirmaciones y recordatorios.",
    results: ["−60% de inasistencias", "+2.000 reservas al mes", "Pagos anticipados integrados"],
    tags: ["React Native", "Node.js", "MongoDB", "WhatsApp API"],
    palette: ["#7c5cff", "#ff7ab6"],
    links: { live: "#" },
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
