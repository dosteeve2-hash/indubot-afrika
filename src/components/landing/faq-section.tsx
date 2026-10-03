"use client";

import { Accordion } from "radix-ui";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Quel est le statut d'Indubot Afrika ?",
    answer:
      "Indubot Afrika est en phase MVP. Nous recherchons des sites pilotes.",
  },
  {
    question: "Quelles vues sont présentées dans le MVP ?",
    answer:
      "Le MVP comprend des vues de suivi de production, de machines et d'alertes.",
  },
  {
    question: "À qui s'adresse Indubot Afrika ?",
    answer:
      "Le produit est conçu pour les PME africaines du secteur industriel.",
  },
  {
    question: "Comment échanger sur un pilote ?",
    answer:
      "Utilisez le formulaire de contact pour nous présenter votre contexte et vos besoins.",
  },
];

export default function FaqSection() {
  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-24">
      <div className="mb-12 text-center">
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-cyan">
          Questions fréquentes
        </p>
        <h2 className="font-serif text-3xl italic text-text md:text-4xl">
          Tout ce qu&apos;il faut savoir avant de démarrer
        </h2>
      </div>

      <Accordion.Root
        className="flex flex-col gap-3"
        collapsible
        type="single"
      >
        {faqs.map((faq, index) => (
          <Accordion.Item
            className="overflow-hidden rounded-xl border border-border bg-navy-2/60"
            key={faq.question}
            value={`faq-${index}`}
          >
            <Accordion.Header>
              <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-sans text-sm font-medium text-text transition-colors hover:text-gold">
                {faq.question}
                <ChevronDown className="h-4 w-4 shrink-0 text-text-3 transition-transform duration-300 group-data-[state=open]:rotate-180 group-data-[state=open]:text-gold" />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="overflow-hidden text-sm text-text-2 data-[state=closed]:animate-[accordion-up_0.2s_ease] data-[state=open]:animate-[accordion-down_0.2s_ease]">
              <p className="px-5 pb-5">{faq.answer}</p>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </section>
  );
}
