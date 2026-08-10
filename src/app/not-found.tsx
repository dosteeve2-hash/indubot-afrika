import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

export const metadata: Metadata = {
  title: "Page introuvable | Indubot Afrika",
  description: "La page que vous cherchez n'existe pas ou a été déplacée.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/10 text-gold">
        <Compass className="h-8 w-8" />
      </div>
      <p className="mt-6 font-mono text-sm uppercase tracking-widest text-text-3">
        Erreur 404
      </p>
      <h1 className="mt-2 font-serif text-3xl italic text-text md:text-4xl">
        Cette page s&apos;est perdue en usine
      </h1>
      <p className="mt-4 max-w-md text-text-2">
        La page que vous cherchez n&apos;existe pas ou a été déplacée.
        Revenez à l&apos;accueil pour retrouver votre chemin.
      </p>
      <Link href="/">
        <button
          className="group mt-8 inline-flex h-12 items-center gap-2 rounded-lg bg-gold px-6 font-mono text-sm font-medium text-navy transition-colors hover:bg-gold-2"
          type="button"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Retour à l&apos;accueil
        </button>
      </Link>
    </div>
  );
}
