import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";

export const metadata: Metadata = {
  title: "Page introuvable | Indubot Afrika",
  description: "La page demandée n'existe pas ou a été déplacée.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="page-shell">
      <SiteHeader />
      <main className="page-content">
        <div className="page-heading">
          <h1>Cette page n&apos;existe pas.</h1>
          <p>
            Le lien est peut-être incorrect ou la page a été déplacée.
          </p>
        </div>
        <Link className="button-primary" href="/">
          Retour à l&apos;accueil
        </Link>
      </main>
      <SiteFooter />
    </div>
  );
}
