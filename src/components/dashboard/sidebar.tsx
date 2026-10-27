"use client";

import Image from "next/image";
import {
  AlertTriangle,
  Cpu,
  Factory,
  FileBarChart2,
  LayoutDashboard,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Seule « Vue d'ensemble » existe. Les autres modules étaient des boutons sans
// gestionnaire : cliquer dessus ne produisait rien, sans que rien ne l'indique.
// Ils restent affichés — ils disent où va le produit — mais sont désactivés et
// l'annoncent.
const modules = [
  { label: "Vue d'ensemble", icon: LayoutDashboard, active: true },
  { label: "Production", icon: Factory, active: false },
  { label: "Machines", icon: Cpu, active: false },
  { label: "Alertes", icon: AlertTriangle, active: false },
  { label: "Rapports", icon: FileBarChart2, active: false },
];

export default function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-navy-2/40 px-4 py-6 lg:flex">
      <div className="mb-8 flex items-center gap-2 px-2">
        <Image
          alt="Indubot"
          height={52}
          src="/logo-sombre.svg"
          width={154}
        />
        <span className="font-mono text-xs uppercase tracking-widest text-text-3">
          Afrika
        </span>
      </div>
      <nav className="flex flex-1 flex-col gap-1">
        {modules.map((mod) => (
          <button
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              mod.active
                ? "bg-gold/10 text-gold"
                : "cursor-not-allowed text-text-3"
            )}
            disabled={!mod.active}
            key={mod.label}
            title={mod.active ? undefined : "Module à venir"}
            type="button"
          >
            <mod.icon className="h-4 w-4" />
            {mod.label}
            {!mod.active && (
              <span className="ml-auto rounded-full bg-text-3/10 px-1.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-wider text-text-3">
                Bientôt
              </span>
            )}
          </button>
        ))}
      </nav>
      <div className="rounded-lg border border-border-2 bg-navy-3/60 p-3">
        <p className="font-mono text-xs text-text-3">Écosystème</p>
        <p className="font-serif italic text-sm text-text">Forge Afrika</p>
      </div>
    </aside>
  );
}
