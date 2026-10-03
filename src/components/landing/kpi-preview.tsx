"use client";

import { motion } from "motion/react";

export default function KpiPreview() {
  return (
    <section className="border-y border-border bg-navy-2/30">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-20 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-cyan">
            MVP
          </p>
          <h2 className="mb-4 font-serif text-3xl italic text-text md:text-4xl">
            Des vues de suivi pour l&apos;industrie
          </h2>
          <p className="mb-6 max-w-md text-text-2">
            Le MVP présente des vues de production, de machines et d&apos;alertes.
            Nous recherchons des sites pilotes pour valider les besoins.
          </p>
          <ul className="flex flex-col gap-2 border-t border-border pt-4 font-mono text-sm text-text-2">
            <li>Suivi de production</li>
            <li>Monitoring machines</li>
            <li>Consultation des alertes</li>
          </ul>
        </motion.div>
        <motion.div
          className="flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, scale: 1 }}
        >
          <div className="flex min-h-72 w-full max-w-md flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-navy-2/60 p-8 text-center backdrop-blur-sm">
            <span className="font-serif text-4xl italic text-gold">MVP</span>
            <span className="font-mono text-xs uppercase tracking-widest text-text-3">
              Pilote recherché
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
