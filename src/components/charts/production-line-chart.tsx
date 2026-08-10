"use client";

import { curveNatural } from "@visx/curve";
import { ChartTooltip, Grid, Line, LineChart, XAxis } from "@/components/charts";
import { productionData } from "@/lib/indubot";

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

export default function ProductionLineChart() {
  const data = toWeekDates(productionData);

  return (
    <LineChart animationDuration={1100} data={data}>
      <Grid horizontal />
      <Line
        curve={curveNatural}
        dataKey="valeur"
        stroke="var(--chart-line-primary)"
        strokeWidth={2.5}
      />
      <XAxis />
      <ChartTooltip />
    </LineChart>
  );
}
