import { profile, services, socials } from "@/data/site";

/**
 * Datos estructurados (schema.org) para que Google entienda quién eres y qué ofreces.
 * Se puede validar en https://search.google.com/test/rich-results
 */
export function JsonLd() {
  // Sólo perfiles reales: se excluyen enlaces de ejemplo que aún no se reemplazaron.
  const sameAs = socials.map((s) => s.href).filter((href) => !href.includes("tu-usuario"));
  const [city, country] = profile.location.split(",").map((s) => s.trim());

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${profile.siteUrl}/#person`,
        name: profile.name,
        jobTitle: profile.founderRole,
        description: `${profile.founderRole} de ${profile.brand}. ${profile.role}.`,
        worksFor: { "@id": `${profile.siteUrl}/#business` },
        url: profile.siteUrl,
        email: `mailto:${profile.email}`,
        image: `${profile.siteUrl}/icon.png`,
        address: { "@type": "PostalAddress", addressLocality: city, addressCountry: country },
        sameAs,
        knowsAbout: services.map((s) => s.title),
      },
      {
        // Organization para el panel de marca en Google; ProfessionalService para el negocio de servicios.
        "@type": ["Organization", "ProfessionalService"],
        "@id": `${profile.siteUrl}/#business`,
        name: profile.brand,
        alternateName: [profile.siteName, "Jo Devs"],
        description: `${profile.brandType} fundado por ${profile.name}. ${profile.tagline}`,
        slogan: profile.brandType,
        url: profile.siteUrl,
        email: profile.email,
        telephone: profile.whatsapp ? `+${profile.whatsapp}` : undefined,
        image: `${profile.siteUrl}/opengraph-image`,
        logo: `${profile.siteUrl}/icon.png`,
        founder: { "@id": `${profile.siteUrl}/#person` },
        address: { "@type": "PostalAddress", addressLocality: city, addressCountry: country },
        areaServed: "Worldwide",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Servicios",
          itemListElement: services.map((s) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: s.title, description: s.description },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": `${profile.siteUrl}/#website`,
        url: profile.siteUrl,
        // Google usa este nombre sobre el resultado de búsqueda (en lugar del dominio).
        name: profile.siteName,
        alternateName: [profile.brand, "Jo Devs", new URL(profile.siteUrl).hostname.replace(/^www\./, "")],
        inLanguage: "es",
        publisher: { "@id": `${profile.siteUrl}/#business` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // `<` escapado para que el contenido no pueda cerrar la etiqueta <script>.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
