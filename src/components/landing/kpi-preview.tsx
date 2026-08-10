"use client";

import { motion } from "motion/react";
import MachinesRingChart from "@/components/charts/machines-ring-chart";
import { machinesUtilisation } from "@/lib/indubot";

export default function KpiPreview() {
  return (
    <section className="border-y border-border bg-navy-2/30">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-20 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-cyan">
            Vue temps réel
          </p>
          <h2 className="mb-4 font-serif text-3xl italic text-text md:text-4xl">
            Le taux d&apos;utilisation de vos machines, d&apos;un coup
            d&apos;œil
          </h2>
          <p className="mb-6 max-w-md text-text-2">
            Chaque ligne de production suivie individuellement, avec des
            alertes automatiques dès qu&apos;une machine sort de sa plage de
            fonctionnement optimale.
          </p>
          <ul className="flex flex-col gap-2">
            {machinesUtilisation.map((m) => (
              <li
                className="flex items-center justify-between border-b border-border py-2 font-mono text-sm"
                key={m.label}
              >
                <span className="flex items-center gap-2 text-text-2">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: m.color }}
                  />
                  {m.label}
                </span>
                <span className="text-text">{m.value}%</span>
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div
          className="flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, scale: 1 }}
        >
          <MachinesRingChart />
        </motion.div>
      </div>
    </section>
  );
}
