import { ArrowRight } from "lucide-react";
import Link from "next/link";
import SignInButton from "@/components/auth/sign-in-button";
import BeamsBackground from "@/components/kokonut/beams-background";
import HeroContent from "@/components/landing/hero-content";
import FeatureGrid from "@/components/landing/feature-grid";
import KpiPreview from "@/components/landing/kpi-preview";
import CaseStudySection from "@/components/landing/case-study-section";
import TeamSection from "@/components/landing/team-section";
import FaqSection from "@/components/landing/faq-section";
import ContactSection from "@/components/landing/contact-section";
import CtaSection from "@/components/landing/cta-section";

export default function Home() {
  return (
    <div className="flex flex-col">
      <nav className="fixed inset-x-0 top-0 z-20 border-b border-border/60 bg-navy/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="font-serif text-xl italic text-gold">
              Indubot
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-text-3">
              Afrika
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              className="font-mono text-xs uppercase tracking-wide text-text-2 transition-colors hover:text-text"
              href="/dashboard"
            >
              Tableau de bord
            </Link>
            <SignInButton label="Google" provider="google" />
            <SignInButton label="GitHub" provider="github" />
          </div>
        </div>
      </nav>

      <BeamsBackground intensity="subtle">
        <HeroContent />
      </BeamsBackground>

      <section className="mx-auto w-full max-w-7xl px-6 py-24">
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-cyan">
            Modules
          </p>
          <h2 className="font-serif text-3xl italic text-text md:text-4xl">
            Une gestion industrielle pensée pour l&apos;Afrique
          </h2>
        </div>
        <FeatureGrid />
      </section>

      <KpiPreview />

      <CaseStudySection />

      <TeamSection />

      <FaqSection />

      <ContactSection />

      <CtaSection />

      <footer className="border-t border-border px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
          <span className="font-serif text-lg italic text-gold">
            Indubot Afrika
          </span>
          <p className="font-mono text-xs text-text-3">
            Écosystème Forge Afrika — 2026
          </p>
          <div className="flex items-center gap-4 font-mono text-xs text-text-2">
            <Link
              className="transition-colors hover:text-gold"
              href="/politique-confidentialite"
            >
              Confidentialité
            </Link>
            <Link
              className="inline-flex items-center gap-1 transition-colors hover:text-gold"
              href="/dashboard"
            >
              Accéder au tableau de bord
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
