"use client";

import { motion } from "motion/react";
import Link from "next/link";
import GradientButton from "@/components/kokonut/gradient-button";

export default function CtaSection() {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-24">
      <motion.div
        className="relative overflow-hidden rounded-3xl border border-gold/20 bg-gradient-to-br from-navy-2 via-navy-2 to-navy-3 px-8 py-16 text-center"
        initial={{ opacity: 0, y: 24 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-gold">
          Conçu pour les PME africaines
        </p>
        <h2 className="mx-auto mb-4 max-w-2xl font-serif text-3xl italic text-text md:text-4xl">
          Découvrez le MVP d&apos;Indubot Afrika
        </h2>
        <p className="mx-auto mb-8 max-w-xl text-text-2">
          Échangeons sur vos besoins et sur la possibilité d&apos;un pilote.
        </p>
        <Link href="/dashboard">
          <GradientButton label="Accéder au tableau de bord" variant="gold" />
        </Link>
      </motion.div>
    </section>
  );
}
