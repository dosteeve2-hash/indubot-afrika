"use client";

import { motion, type Variants } from "motion/react";
import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";

interface Testimonial {
  initials: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  accent: "gold" | "cyan" | "green";
}

const testimonials: Testimonial[] = [
  {
    initials: "AK",
    name: "Aïcha Kaboré",
    role: "Directrice de production",
    company: "Manufacture Textile du Faso",
    quote:
      "Depuis Indubot Afrika, on détecte les pannes de machines avant qu'elles n'arrêtent la chaîne. Notre rendement est passé de 71% à 87% en trois mois.",
    accent: "gold",
  },
  {
    initials: "SO",
    name: "Salif Ouédraogo",
    role: "Responsable maintenance",
    company: "Agro-Industries du Sahel",
    quote:
      "Le tableau de bord est simple à lire pour toute l'équipe. On a réduit le temps d'arrêt non planifié de plus de 30% dès le premier trimestre.",
    accent: "cyan",
  },
  {
    initials: "MT",
    name: "Marième Traoré",
    role: "Directrice générale",
    company: "Brasserie Nationale",
    quote:
      "Les rapports automatiques nous font gagner des heures chaque semaine, et nos investisseurs ont enfin des chiffres fiables en temps réel.",
    accent: "green",
  },
];

const accentClasses: Record<Testimonial["accent"], string> = {
  gold: "text-gold bg-gold/10",
  cyan: "text-cyan bg-cyan/10",
  green: "text-green bg-green/10",
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function TestimonialsSection() {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-24">
      <div className="mb-12 max-w-2xl">
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-gold">
          Témoignages
        </p>
        <h2 className="font-serif text-3xl italic text-text md:text-4xl">
          Des industriels africains nous font confiance
        </h2>
      </div>

      <motion.div
        className="grid gap-6 md:grid-cols-3"
        initial="hidden"
        variants={staggerContainer}
        viewport={{ once: true, margin: "-80px" }}
        whileInView="visible"
      >
        {testimonials.map((testimonial) => (
          <motion.figure
            className="flex h-full flex-col justify-between gap-6 rounded-2xl border border-border bg-navy-2/60 p-6 backdrop-blur-sm"
            key={testimonial.name}
            variants={fadeInUp}
          >
            <Quote className="h-6 w-6 text-gold/60" />
            <blockquote className="flex-1 text-sm leading-relaxed text-text-2">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>
            <figcaption className="flex items-center gap-3 border-t border-border pt-4">
              <div
                aria-hidden="true"
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-mono text-xs font-semibold",
                  accentClasses[testimonial.accent]
                )}
              >
                {testimonial.initials}
              </div>
              <div>
                <p className="text-sm font-medium text-text">
                  {testimonial.name}
                </p>
                <p className="text-xs text-text-3">
                  {testimonial.role} — {testimonial.company}
                </p>
              </div>
            </figcaption>
          </motion.figure>
        ))}
      </motion.div>
    </section>
  );
}
