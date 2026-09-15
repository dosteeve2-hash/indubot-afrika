"use client";

import {
  AlertTriangle,
  Cpu,
  Factory,
  FileBarChart2,
  LayoutDashboard,
  Menu,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const modules = [
  { label: "Vue d'ensemble", icon: LayoutDashboard, active: true },
  { label: "Production", icon: Factory, active: false },
  { label: "Machines", icon: Cpu, active: false },
  { label: "Alertes", icon: AlertTriangle, active: false },
  { label: "Rapports", icon: FileBarChart2, active: false },
];

function Marque() {
  return (
    <div className="flex items-center gap-2 px-2">
      <span className="font-serif text-xl italic text-gold">Indubot</span>
      <span className="font-mono text-xs uppercase tracking-widest text-text-3">
        Afrika
      </span>
    </div>
  );
}

function Modules({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <>
      {modules.map((mod) => (
        <button
          aria-current={mod.active ? "page" : undefined}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors motion-reduce:transition-none",
            mod.active
              ? "bg-gold/10 text-gold"
              : "text-text-2 hover:bg-navy-3 hover:text-text"
          )}
          key={mod.label}
          onClick={onNavigate}
          type="button"
        >
          <mod.icon className="h-4 w-4" />
          {mod.label}
        </button>
      ))}
    </>
  );
}

function Pied() {
  return (
    <div className="rounded-lg border border-border-2 bg-navy-3/60 p-3">
      <p className="font-mono text-xs text-text-3">Écosystème</p>
      <p className="font-serif italic text-sm text-text">Forge Afrika</p>
    </div>
  );
}

/**
 * En dessous de 1024 px, la barre latérale était `hidden` et RIEN ne la remplaçait :
 * les cinq modules devenaient purement inaccessibles sur un téléphone. Elle est donc
 * doublée d'un tiroir.
 *
 * Animé en CSS et non avec `motion` : la cible de `VISION.md §4` est un Android
 * d'entrée de gamme en 2G/3G intermittent, et une transition `transform` ne coûte
 * aucun kilo-octet de JavaScript de plus.
 */
export default function Sidebar() {
  const [ouvert, setOuvert] = useState(false);
  const fermer = useCallback(() => setOuvert(false), []);
  const boutonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!ouvert) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOuvert(false);
        boutonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [ouvert]);

  return (
    <>
      {/* Barre latérale — à partir de 1024 px */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-navy-2/40 px-4 py-6 lg:flex">
        <div className="mb-8">
          <Marque />
        </div>
        <nav aria-label="Modules" className="flex flex-1 flex-col gap-1">
          <Modules />
        </nav>
        <Pied />
      </aside>

      {/* Bouton du tiroir — en dessous de 1024 px. `fixed` plutôt que dans l'en-tête :
          l'en-tête est un composant distinct, et le tiroir a besoin de l'état. */}
      <button
        aria-controls="tiroir-modules"
        aria-expanded={ouvert}
        aria-label={ouvert ? "Fermer les modules" : "Ouvrir les modules"}
        className="fixed left-4 top-4 z-50 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border-2 bg-navy-2/90 text-text-2 backdrop-blur transition-colors hover:text-text motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold lg:hidden"
        onClick={() => setOuvert((v) => !v)}
        ref={boutonRef}
        type="button"
      >
        {ouvert ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Voile */}
      <div
        aria-hidden="true"
        className={cn(
          "fixed inset-0 z-40 bg-black/60 transition-opacity duration-200 motion-reduce:transition-none lg:hidden",
          ouvert ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={fermer}
      />

      {/* Tiroir. `inert` (React 19) le sort de l'arbre d'accessibilité ET du parcours
          clavier quand il est fermé — sinon un lecteur d'écran annonce deux fois
          chacun des cinq modules, et Tab se perd dans un panneau invisible. */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] flex-col border-r border-border bg-navy-2 px-4 py-6 transition-transform duration-300 ease-out motion-reduce:transition-none lg:hidden",
          ouvert ? "translate-x-0" : "-translate-x-full"
        )}
        id="tiroir-modules"
        inert={!ouvert}
      >
        <div className="mb-8 flex items-center justify-between gap-2">
          <Marque />
          <button
            aria-label="Fermer les modules"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-text-3 transition-colors hover:text-text motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
            onClick={fermer}
            type="button"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav aria-label="Modules" className="flex flex-1 flex-col gap-1">
          <Modules onNavigate={fermer} />
        </nav>
        <Pied />
      </div>
    </>
  );
}
