"use client";

import { motion, type Variants } from "motion/react";
import { ArrowRight } from "lucide-react";

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
        En développement · Écosystème Forge Afrika
      </motion.span>

      <motion.h1
        className="font-serif text-5xl italic leading-tight text-text md:text-7xl"
        variants={item}
      >
        L&apos;intelligence{" "}
        <span className="text-gold">dans vos machines</span>
      </motion.h1>

      <motion.p
        className="max-w-xl text-lg text-text-2"
        variants={item}
      >
        Indubot est la technologie embarquée dans les machines et les robots
        d&apos;usine : algorithmes de régulation, lecture et commande des
        machines. Elle se connecte à MillTrack. En développement, sites
        pilotes recherchés.
      </motion.p>

      <motion.div
        className="mt-2 flex flex-col items-center gap-4 sm:flex-row"
        variants={item}
      >
        <a
          className="group inline-flex h-12 items-center gap-2 rounded-lg bg-gold px-6 font-mono text-sm font-medium text-navy transition-colors hover:bg-gold-2"
          href="#contact"
        >
          Devenir site pilote
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>
      </motion.div>
    </motion.div>
  );
}
