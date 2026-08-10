"use client";

import { Accordion } from "radix-ui";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Combien de temps prend la mise en place d'Indubot Afrika ?",
    answer:
      "Le déploiement initial (connexion de vos lignes de production et configuration des alertes) prend généralement entre 5 et 10 jours ouvrés, selon la taille de votre parc industriel.",
  },
  {
    question: "Indubot Afrika fonctionne-t-il avec du matériel déjà en place ?",
    answer:
      "Oui. Indubot Afrika s'intègre aux capteurs et automates existants (API, protocoles industriels standards) sans nécessiter le remplacement de vos équipements.",
  },
  {
    question: "Mes données de production sont-elles sécurisées ?",
    answer:
      "Toutes les données transitent chiffrées, sont hébergées sur une infrastructure conforme aux standards de sécurité actuels, et l'accès est protégé par authentification et contrôle des rôles.",
  },
  {
    question: "Puis-je essayer Indubot Afrika avant de m'engager ?",
    answer:
      "Oui, une démonstration personnalisée avec vos propres données de production est proposée avant toute souscription. Contactez-nous pour la programmer.",
  },
  {
    question: "Quel support est proposé après la mise en service ?",
    answer:
      "Une équipe dédiée basée à Ouagadougou assure le support technique et répond à toute demande en moins de 24h, avec des rapports de suivi réguliers.",
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
