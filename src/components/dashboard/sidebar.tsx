"use client";

import {
  AlertTriangle,
  Cpu,
  Factory,
  FileBarChart2,
  LayoutDashboard,
} from "lucide-react";
import { cn } from "@/lib/utils";

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
        <span className="font-serif text-xl italic text-gold">Indubot</span>
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
                : "text-text-2 hover:bg-navy-3 hover:text-text"
            )}
            key={mod.label}
            type="button"
          >
            <mod.icon className="h-4 w-4" />
            {mod.label}
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
