export const siteConfig = {
  name: "Indubot Afrika",
  ecosystem: "Forge Afrika",
  url: "https://indubot-afrika.vercel.app",
  description:
    "Indubot Afrika est la technologie embarquée dans les machines et robots d'usine (algorithmes de régulation, lecture et commande des machines), connectée à MillTrack. En développement dans l'écosystème Forge Afrika. Sites pilotes recherchés.",
  email: "contact@forge-afrika.com",
  address: {
    street: "Zone Industrielle de Kossodo",
    locality: "Ouagadougou",
    region: "Centre",
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
