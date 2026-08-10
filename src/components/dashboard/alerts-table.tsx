"use client";

import { motion } from "motion/react";
import type { Alerte, AlerteSeverite } from "@/lib/indubot";
import { cn } from "@/lib/utils";

const severiteStyles: Record<AlerteSeverite, string> = {
  critique: "bg-red/10 text-red border-red/30",
  avertissement: "bg-gold/10 text-gold border-gold/30",
  info: "bg-cyan/10 text-cyan border-cyan/30",
};

const severiteLabel: Record<AlerteSeverite, string> = {
  critique: "Critique",
  avertissement: "Avertissement",
  info: "Info",
};

export default function AlertsTable({ alertes }: { alertes: Alerte[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-navy-2/60">
      <div className="border-b border-border px-6 py-4">
        <h3 className="font-serif text-lg italic text-text">
          Dernières alertes machines
        </h3>
      </div>
      <div className="divide-y divide-border">
        {alertes.map((alerte, index) => (
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-2 px-6 py-4 sm:flex-row sm:items-center sm:justify-between"
            initial={{ opacity: 0, x: -12 }}
            key={alerte.id}
            transition={{ duration: 0.35, delay: index * 0.06 }}
          >
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-text-3">
                  {alerte.id}
                </span>
                <span
                  className={cn(
                    "rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide",
                    severiteStyles[alerte.severite]
                  )}
                >
                  {severiteLabel[alerte.severite]}
                </span>
              </div>
              <p className="text-sm font-medium text-text">
                {alerte.machine}
              </p>
              <p className="text-sm text-text-2">{alerte.message}</p>
            </div>
            <span className="shrink-0 font-mono text-xs text-text-3">
              {alerte.horodatage}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
