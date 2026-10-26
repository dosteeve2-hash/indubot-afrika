export const siteConfig = {
  name: "Indubot Afrika",
  ecosystem: "Forge Afrika",
  url: "https://indubot-afrika.vercel.app",
  description:
    "Indubot Afrika présente une vitrine pré-lancement et une démonstration de son module Vue d’ensemble. Le produit est en développement et les données de démonstration sont fictives.",
  email: "docompaore2@gmail.com",
  address: {
    street: "Zone Industrielle de Kossodo",
    locality: "Ouagadougou",
    region: "Centre",
    country: "BF",
    countryName: "Burkina Faso",
  },
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
