import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Breadcrumbs from "@/components/layout/breadcrumbs";
import SiteFooter from "@/components/layout/site-footer";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Merci pour votre message | Indubot Afrika",
  description:
    "Votre demande a bien été reçue. L'équipe Indubot Afrika vous répond en moins de 24h.",
  robots: { index: false, follow: true },
  openGraph: { images: ["/opengraph-image"] },
  twitter: { card: "summary_large_image", images: ["/opengraph-image"] },
};

export default function MerciPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Breadcrumbs items={[{ label: "Merci", href: "/merci" }]} />

      <main className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green/10 text-green">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h1 className="mt-6 font-serif text-3xl italic text-text md:text-4xl">
          Merci, votre message est bien parti
        </h1>
        <p className="mt-4 max-w-md text-text-2">
          {siteConfig.responseTimePromise}. En attendant, découvrez ce
          qu&apos;Indubot Afrika peut piloter pour votre industrie.
        </p>
        <Link href="/dashboard">
          <button
            className="group mt-8 inline-flex h-12 items-center gap-2 rounded-lg bg-gold px-6 font-mono text-sm font-medium text-navy transition-colors hover:bg-gold-2"
            type="button"
          >
            Découvrir le tableau de bord
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </Link>
        <Link
          className="mt-4 font-mono text-xs uppercase tracking-wide text-text-2 transition-colors hover:text-gold"
          href="/"
        >
          Retour à l&apos;accueil
        </Link>
      </main>

      <SiteFooter />
    </div>
  );
}
