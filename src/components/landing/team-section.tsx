"use client";

import { motion, type Variants } from "motion/react";

interface TeamMember {
  initials: string;
  name: string;
  role: string;
}

const team: TeamMember[] = [
  { initials: "SC", name: "Steve Donald Compaoré", role: "Fondateur & Ingénieur logiciel" },
  { initials: "FN", name: "Fatimata Nikiéma", role: "Responsable relation industrielle" },
  { initials: "IB", name: "Ibrahim Bationo", role: "Ingénieur intégration & IoT" },
];

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function TeamSection() {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-24">
      <div className="mb-12 max-w-2xl">
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-cyan">
          Notre équipe
        </p>
        <h2 className="font-serif text-3xl italic text-text md:text-4xl">
          Une équipe basée à Ouagadougou, au service de l&apos;industrie africaine
        </h2>
      </div>

      <motion.div
        className="grid gap-6 sm:grid-cols-3"
        initial="hidden"
        variants={staggerContainer}
        viewport={{ once: true, margin: "-80px" }}
        whileInView="visible"
      >
        {team.map((member) => (
          <motion.div
            className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-navy-2/60 p-6 text-center backdrop-blur-sm"
            key={member.name}
            variants={fadeInUp}
          >
            <div
              aria-label={`Photo de profil de ${member.name}`}
              className="flex h-20 w-20 items-center justify-center rounded-full border border-gold/30 bg-gold/10 font-serif text-2xl italic text-gold"
              role="img"
            >
              {member.initials}
            </div>
            <div>
              <p className="font-serif italic text-text">{member.name}</p>
              <p className="mt-1 font-mono text-xs uppercase tracking-wide text-text-3">
                {member.role}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
