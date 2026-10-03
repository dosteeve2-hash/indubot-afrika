"use client";

import { motion } from "motion/react";

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
            Phase MVP
          </p>
          <h2 className="font-serif text-2xl italic text-text md:text-3xl">
            Indubot Afrika recherche ses premiers sites pilotes
          </h2>
          <p className="text-sm leading-relaxed text-text-2">
            Le MVP comprend des vues de suivi de production, de machines et
            d&apos;alertes. Nous cherchons des entreprises pour échanger sur
            leurs besoins et les modalités d&apos;un pilote.
          </p>
        </div>

        <div className="flex flex-col justify-center gap-6 border-t border-border pt-8 md:col-span-2 md:border-l md:border-t-0 md:pl-10 md:pt-0">
          {[
            { value: "MVP", label: "Suivi de production" },
            { value: "MVP", label: "Monitoring machines" },
            { value: "MVP", label: "Consultation des alertes" },
          ].map((stat) => (
            <div className="flex items-center gap-4" key={stat.label}>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold">
                <span aria-hidden="true" className="font-mono text-xs">
                  MVP
                </span>
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
