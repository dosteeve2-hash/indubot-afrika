"use client";

import { motion, type Variants } from "motion/react";
import Link from "next/link";
import { ArrowRight, PlayCircle } from "lucide-react";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function HeroContent() {
  return (
    <motion.div
      animate="visible"
      className="flex max-w-3xl flex-col items-center gap-6 px-6 text-center"
      initial="hidden"
      variants={container}
    >
      <motion.span
        className="rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-gold"
        variants={item}
      >
        Écosystème Forge Afrika
      </motion.span>

      <motion.h1
        className="font-serif text-5xl italic leading-tight text-text md:text-7xl"
        variants={item}
      >
        La gestion industrielle,{" "}
        <span className="text-gold">automatisée</span>
      </motion.h1>

      <motion.p
        className="max-w-xl text-lg text-text-2"
        variants={item}
      >
        Indubot Afrika pilote la production, les machines et les alertes de
        vos usines en temps réel — pensé pour l&apos;industrie africaine.
      </motion.p>

      <motion.div
        className="mt-2 flex flex-col items-center gap-4 sm:flex-row"
        variants={item}
      >
        <Link href="/dashboard">
          <button
            className="group inline-flex h-12 items-center gap-2 rounded-lg bg-gold px-6 font-mono text-sm font-medium text-navy transition-colors hover:bg-gold-2"
            type="button"
          >
            Ouvrir le tableau de bord
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </Link>
        <a
          className="inline-flex h-12 items-center gap-2 rounded-lg border border-border-2 px-6 font-mono text-sm text-text-2 transition-colors hover:border-cyan hover:text-cyan"
          href="#case-study"
        >
          <PlayCircle className="h-4 w-4" />
          Voir la démo
        </a>
      </motion.div>
    </motion.div>
  );
}
