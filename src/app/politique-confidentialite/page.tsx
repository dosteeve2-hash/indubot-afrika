import type { Metadata } from "next";
import Breadcrumbs from "@/components/layout/breadcrumbs";
import SiteFooter from "@/components/layout/site-footer";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Politique de confidentialité | Indubot Afrika",
  description:
    "Comment Indubot Afrika collecte, utilise et protège les données de ses clients industriels et visiteurs du site.",
  openGraph: { images: ["/opengraph-image"] },
  twitter: { card: "summary_large_image", images: ["/opengraph-image"] },
};

const sections = [
  {
    title: "1. Responsable du traitement",
    body: `${siteConfig.name}, exploité par l'écosystème ${siteConfig.ecosystem}, ${siteConfig.address.street}, ${siteConfig.address.locality}, ${siteConfig.address.countryName}. Contact : ${siteConfig.email}.`,
  },
  {
    title: "2. Données collectées",
    body: "Nous collectons les données que vous nous transmettez via le formulaire de contact (nom, email, entreprise, message), les données de compte lors de la connexion (email, identifiant du fournisseur d'authentification), et des données d'usage anonymisées à des fins d'analyse d'audience.",
  },
  {
    title: "3. Finalités du traitement",
    body: "Ces données sont utilisées pour répondre à vos demandes, fournir l'accès au tableau de bord Indubot Afrika, assurer la sécurité de la plateforme, et améliorer nos services.",
  },
  {
    title: "4. Base légale",
    body: "Le traitement repose sur votre consentement (formulaire de contact), l'exécution d'un contrat (accès au tableau de bord) et notre intérêt légitime à améliorer le produit.",
  },
  {
    title: "5. Conservation des données",
    body: "Les données de contact sont conservées 24 mois maximum après le dernier échange. Les données de compte sont conservées pour la durée de la relation contractuelle.",
  },
  {
    title: "6. Partage des données",
    body: "Vos données ne sont jamais vendues. Elles peuvent être partagées avec nos sous-traitants techniques (hébergement, authentification, mesure d'audience) dans le strict cadre de la fourniture du service.",
  },
  {
    title: "7. Vos droits",
    body: `Vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour exercer ces droits, contactez-nous à ${siteConfig.email}.`,
  },
  {
    title: "8. Cookies et mesure d'audience",
    body: "Le site peut utiliser des cookies de mesure d'audience (Google Analytics) afin de comprendre l'utilisation du site. Ces données sont anonymisées et ne permettent pas de vous identifier personnellement.",
  },
];

/**
 * La date de dernière mise à jour est une CONSTANTE, pas `new Date()`.
 *
 * La page affichait la date du jour, tous les jours : elle prétendait donc avoir été
 * révisée aujourd'hui alors que son contenu n'a pas bougé depuis le 10 août 2026
 * (commit 1b8ec42). Sur une politique de confidentialité, ce n'est pas un défaut
 * d'affichage — c'est une affirmation fausse, et elle prive le lecteur du seul repère
 * qui lui permette de savoir si les termes ont changé depuis sa dernière visite.
 *
 * À mettre à jour à la main quand le texte change, et seulement alors.
 */
const DERNIERE_MISE_A_JOUR = "10 août 2026";

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Breadcrumbs
        items={[
          { label: "Politique de confidentialité", href: "/politique-confidentialite" },
        ]}
      />

      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-cyan">
          Confidentialité
        </p>
        <h1 className="mb-8 font-serif text-3xl italic text-text md:text-4xl">
          Politique de confidentialité
        </h1>

        <div className="flex flex-col gap-8">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="mb-2 font-serif text-lg italic text-gold">
                {section.title}
              </h2>
              <p className="text-sm leading-relaxed text-text-2">
                {section.body}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-12 font-mono text-xs text-text-3">
          Dernière mise à jour : {DERNIERE_MISE_A_JOUR}
        </p>
      </main>

      <SiteFooter />
    </div>
  );
}
