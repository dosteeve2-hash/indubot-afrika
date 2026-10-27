import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";

export const metadata: Metadata = {
  title: "Contact | Indubot Afrika",
  description:
    "Contactez Indubot Afrika par e-mail.",
  robots: { index: false, follow: true },
  openGraph: { images: ["/opengraph-image"] },
  twitter: { card: "summary_large_image", images: ["/opengraph-image"] },
};

export default function MerciPage() {
  return (
    <div className="page-shell">
      <SiteHeader />
      <main className="page-content">
        <div className="page-heading">
          <h1>Pour nous écrire, envoyez un e-mail.</h1>
          <p>
            Ce site ne confirme pas l&apos;envoi d&apos;un message. Utilisez
            votre application de messagerie pour contacter Indubot Afrika.
          </p>
        </div>
        <p className="page-action">
          <a href="mailto:docompaore2@gmail.com">
            docompaore2@gmail.com
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
