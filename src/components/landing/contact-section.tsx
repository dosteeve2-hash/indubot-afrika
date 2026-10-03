"use client";

import { useActionState } from "react";
import { MapPin, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { submitContactForm, type ContactFormState } from "@/app/actions/contact";
import { mapsDirectionsUrl, siteConfig } from "@/lib/site-config";

const initialState: ContactFormState = { error: null };

export default function ContactSection() {
  const [state, formAction, pending] = useActionState(
    submitContactForm,
    initialState
  );

  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-24" id="contact">
      <div className="mb-12 max-w-2xl">
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-gold">
          Contact
        </p>
        <h2 className="font-serif text-3xl italic text-text md:text-4xl">
          Parlons de votre production
        </h2>
        <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-green/30 bg-green/10 px-4 py-1.5 font-mono text-xs text-green">
          MVP — pilote recherché
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <form
          action={formAction}
          className="flex flex-col gap-4 rounded-2xl border border-border bg-navy-2/60 p-6 backdrop-blur-sm lg:col-span-3"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5 text-xs text-text-2">
              Nom complet
              <input
                className="rounded-lg border border-border-2 bg-navy px-3 py-2 text-sm text-text outline-none transition-colors focus:border-gold"
                maxLength={120}
                minLength={2}
                name="name"
                required
                type="text"
              />
            </label>
            <label className="flex flex-col gap-1.5 text-xs text-text-2">
              Email professionnel
              <input
                className="rounded-lg border border-border-2 bg-navy px-3 py-2 text-sm text-text outline-none transition-colors focus:border-gold"
                maxLength={200}
                name="email"
                required
                type="email"
              />
            </label>
          </div>
          <label className="flex flex-col gap-1.5 text-xs text-text-2">
            Entreprise
            <input
              className="rounded-lg border border-border-2 bg-navy px-3 py-2 text-sm text-text outline-none transition-colors focus:border-gold"
              maxLength={160}
              name="company"
              type="text"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-xs text-text-2">
            Message
            <textarea
              className="min-h-28 rounded-lg border border-border-2 bg-navy px-3 py-2 text-sm text-text outline-none transition-colors focus:border-gold"
              maxLength={2000}
              minLength={10}
              name="message"
              required
            />
          </label>

          {state.error && (
            <p className="text-xs text-red" role="alert">
              {state.error}
            </p>
          )}

          <Button disabled={pending} type="submit">
            {pending ? "Envoi en cours..." : "Envoyer ma demande"}
          </Button>
        </form>

        <div className="flex flex-col gap-4 lg:col-span-2">
          <div className="flex flex-1 flex-col justify-between gap-6 rounded-2xl border border-border bg-navy-2/60 p-6 backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
              <div className="text-sm text-text-2">
                <p className="text-text">{siteConfig.address.street}</p>
                <p>
                  {siteConfig.address.locality}, {siteConfig.address.countryName}
                </p>
              </div>
            </div>
            <a
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-cyan transition-colors hover:text-cyan-2"
              href={mapsDirectionsUrl()}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Navigation className="h-3.5 w-3.5" />
              Itinéraire sur Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
