"use client";

import { curveNatural } from "@visx/curve";
import { Area, AreaChart, ChartTooltip, Grid, XAxis } from "@/components/charts";
import { energieData } from "@/lib/indubot";

function toWeekDates<T extends { jour: string }>(items: T[]) {
  const today = new Date();
  const day = today.getDay();
  const monday = new Date(today);
  monday.setDate(today.getDate() - ((day + 6) % 7));

  return items.map((item, index) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + index);
    return { ...item, date };
  });
}

export default function EnergieAreaChart() {
  const data = toWeekDates(energieData);

  return (
    <AreaChart animationDuration={1100} data={data}>
      <Grid horizontal />
      <Area
        curve={curveNatural}
        dataKey="kwh"
        fillOpacity={0.35}
        stroke="var(--chart-line-secondary)"
        strokeWidth={2.5}
      />
      <XAxis />
      <ChartTooltip />
    </AreaChart>
  );
}
