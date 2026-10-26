import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";

export const metadata: Metadata = {
  title: "Tarifs | Indubot Afrika",
  description:
    "Les tarifs d'Indubot Afrika ne sont pas encore publiés. Le produit est en développement et son site présente une démonstration.",
  openGraph: { images: ["/opengraph-image"] },
  twitter: { card: "summary_large_image", images: ["/opengraph-image"] },
};

export default function TarifsPage() {
  return (
    <div className="page-shell">
      <SiteHeader />
      <main className="page-content">
        <div className="page-heading">
          <h1>Les tarifs seront annoncés quand l&apos;offre sera définie.</h1>
          <p>
            Indubot Afrika est en développement. Le dépôt présente une
            démonstration de Vue d&apos;ensemble, pas une offre commerciale
            disponible.
          </p>
        </div>
        <section aria-labelledby="price-note-title" className="price-note">
          <h2 id="price-note-title">Aucun tarif public pour le moment.</h2>
          <p>
            Aucun prix ni plan d&apos;abonnement n&apos;est défini sur ce site.
            Les données de la démonstration sont fictives et aucune machine
            n&apos;y est connectée.
          </p>
        </section>
        <p className="page-action">
          <a href="mailto:docompaore2@gmail.com">
            Écrire à Indubot Afrika
            <ArrowRight aria-hidden="true" size={16} />
          </a>
        </p>
        <p className="page-action">
          <Link className="text-link" href="/">
            Retour à l&apos;accueil
          </Link>
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
