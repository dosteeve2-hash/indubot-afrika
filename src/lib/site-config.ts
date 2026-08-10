export const siteConfig = {
  name: "Indubot Afrika",
  ecosystem: "Forge Afrika",
  url: "https://indubot-afrika.vercel.app",
  description:
    "Indubot Afrika est le logiciel de gestion automatique d'industries de l'écosystème Forge Afrika : production, machines, alertes et rapports en temps réel.",
  email: "contact@forge-afrika.com",
  phone: "+226 25 00 00 00",
  address: {
    street: "Zone Industrielle de Kossodo",
    locality: "Ouagadougou",
    region: "Centre",
    postalCode: "01 BP 0000",
    country: "BF",
    countryName: "Burkina Faso",
  },
  responseTimePromise: "Réponse en moins de 24h",
} as const;

export const siteNavLinks = [
  { href: "/", label: "Accueil" },
  { href: "/dashboard", label: "Tableau de bord" },
  { href: "/politique-confidentialite", label: "Politique de confidentialité" },
] as const;

export function mapsDirectionsUrl() {
  const query = encodeURIComponent(
    `${siteConfig.address.street}, ${siteConfig.address.locality}, ${siteConfig.address.countryName}`
  );
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}
