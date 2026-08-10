"use client";

import { motion } from "motion/react";
import { TrendingUp } from "lucide-react";

export default function CaseStudySection() {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-24" id="case-study">
      <motion.div
        className="grid gap-10 rounded-3xl border border-border bg-navy-2/60 p-8 backdrop-blur-sm md:grid-cols-5 md:p-12"
        initial={{ opacity: 0, y: 24 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-80px" }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <div className="flex flex-col justify-center gap-4 md:col-span-3">
          <p className="font-mono text-xs uppercase tracking-widest text-cyan">
            Étude de cas
          </p>
          <h2 className="font-serif text-2xl italic text-text md:text-3xl">
            Manufacture Textile du Faso réduit ses arrêts machines de 42%
          </h2>
          <p className="text-sm leading-relaxed text-text-2">
            Confrontée à des arrêts imprévus sur ses trois lignes de tissage,
            l&apos;usine a déployé Indubot Afrika pour surveiller en temps réel
            la température, la vibration et la cadence de chaque machine.
            En six semaines, les alertes prédictives ont permis d&apos;anticiper
            83% des pannes avant qu&apos;elles ne stoppent la production.
          </p>
          <blockquote className="border-l-2 border-gold pl-4 font-serif text-lg italic text-text">
            &ldquo;On est passé d&apos;une maintenance réactive à une
            maintenance prédictive. Le retour sur investissement a été
            immédiat.&rdquo;
          </blockquote>
          <p className="font-mono text-xs uppercase tracking-wide text-text-3">
            Aïcha Kaboré — Directrice de production
          </p>
        </div>

        <div className="flex flex-col justify-center gap-6 border-t border-border pt-8 md:col-span-2 md:border-l md:border-t-0 md:pl-10 md:pt-0">
          {[
            { value: "−42%", label: "Arrêts machines non planifiés" },
            { value: "+16 pts", label: "Rendement global (71% → 87%)" },
            { value: "83%", label: "Pannes anticipées avant incident" },
          ].map((stat) => (
            <div className="flex items-center gap-4" key={stat.label}>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <p className="font-mono text-2xl font-semibold text-text">
                  {stat.value}
                </p>
                <p className="text-xs text-text-3">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
