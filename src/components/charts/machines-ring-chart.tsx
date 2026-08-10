"use client";

import { Ring, RingCenter, RingChart } from "@/components/charts";
import { machinesUtilisation } from "@/lib/indubot";

export default function MachinesRingChart({
  size = 220,
  strokeWidth = 14,
}: {
  size?: number;
  strokeWidth?: number;
}) {
  return (
    <RingChart data={machinesUtilisation} size={size} strokeWidth={strokeWidth}>
      {machinesUtilisation.map((item, index) => (
        <Ring color={item.color} index={index} key={item.label} showGlow />
      ))}
      <RingCenter defaultLabel="Utilisation" />
    </RingChart>
  );
}
