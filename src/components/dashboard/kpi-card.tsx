"use client";

import { motion } from "motion/react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import type { Kpi } from "@/lib/indubot";
import { cn } from "@/lib/utils";

export default function KpiCard({ kpi, index }: { kpi: Kpi; index: number }) {
  const positive = kpi.variation >= 0;

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-border bg-navy-2/60 p-5"
      initial={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <p className="text-xs uppercase tracking-wide text-text-3">
        {kpi.label}
      </p>
      <div className="mt-2 flex items-baseline gap-1 font-mono">
        <span className="text-3xl font-semibold text-text">{kpi.valeur}</span>
        {kpi.unite && (
          <span className="text-sm text-text-2">{kpi.unite}</span>
        )}
      </div>
      <div
        className={cn(
          "mt-3 inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-xs",
          positive ? "bg-green/10 text-green" : "bg-red/10 text-red"
        )}
      >
        {positive ? (
          <ArrowUpRight className="h-3 w-3" />
        ) : (
          <ArrowDownRight className="h-3 w-3" />
        )}
        {Math.abs(kpi.variation)}%
      </div>
    </motion.div>
  );
}
