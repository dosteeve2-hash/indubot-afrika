import type { Metadata } from "next";
import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";

export const metadata: Metadata = {
  title: "Confidentialité | Indubot Afrika",
  description:
    "Informations sur les données du site public et de la démonstration Indubot Afrika.",
  openGraph: { images: ["/opengraph-image"] },
  twitter: { card: "summary_large_image", images: ["/opengraph-image"] },
};

const sections = [
  {
    title: "Qui contacter",
    body: (
      <>
        Indubot Afrika est le nom du produit présenté sur ce site. Pour toute
        question sur la confidentialité ou une demande relative à vos données,
        écrivez à{" "}
        <a href="mailto:docompaore2@gmail.com">docompaore2@gmail.com</a>.
        Le dépôt ne précise pas d&apos;entité juridique distincte.
      </>
    ),
  },
  {
    title: "Données de démonstration",
    body: (
      <>
        Les chiffres, machines et événements affichés dans le tableau de bord
        sont des exemples fictifs. Ils ne proviennent pas d&apos;une usine et
        Indubot Afrika n&apos;est pas connecté à un automate.
      </>
    ),
  },
  {
    title: "Contact par e-mail",
    body: (
      <>
        Le lien de contact ouvre votre application de messagerie et adresse
        votre message à docompaore2@gmail.com. L&apos;envoi et le traitement de
        ce message dépendent ensuite de votre fournisseur de messagerie et du
        traitement effectué par son destinataire.
      </>
    ),
  },
  {
    title: "Connexion",
    body: (
      <>
        Le code prévoit une connexion via Google ou GitHub avec Better Auth.
        Cette fonction dépend de la configuration des fournisseurs
        d&apos;authentification. Une session configurée dure au maximum sept
        jours avant son expiration, selon les paramètres présents dans le
        dépôt.
      </>
    ),
  },
  {
    title: "Mesure d’audience",
    body: (
      <>
        Google Analytics est chargé uniquement si une clé de mesure est
        configurée pour le site. Les paramètres de conservation et de
        traitement dépendent du compte Analytics utilisé; le code du dépôt ne
        permet pas de confirmer ces réglages.
      </>
    ),
  },
  {
    title: "Demandes relatives à vos données",
    body: (
      <>
        Pour demander l&apos;accès à des données vous concernant, leur
        rectification ou leur suppression, contactez-nous par e-mail à{" "}
        <a href="mailto:docompaore2@gmail.com">docompaore2@gmail.com</a>.
      </>
    ),
  },
];

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="page-shell">
      <SiteHeader />
      <main className="page-content">
        <div className="page-heading">
          <h1>Politique de confidentialité</h1>
          <p>
            Cette page décrit ce que le code du site permet de confirmer. Elle
            distingue la démonstration du fonctionnement futur du produit.
          </p>
        </div>
        <div className="legal-copy">
          {sections.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              <p>{section.body}</p>
            </section>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
