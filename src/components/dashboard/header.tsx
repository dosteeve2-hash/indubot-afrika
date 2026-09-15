"use client";

import { dateUsine } from "@/lib/date-usine";

export default function DashboardHeader() {
  const today = dateUsine();

  return (
    <header className="flex flex-col gap-1 border-b border-border py-6 pl-16 pr-6 md:flex-row md:items-center md:justify-between md:pr-10 lg:pl-10">
      <div>
        <h1 className="font-serif text-2xl italic text-text md:text-3xl">
          Tableau de bord industriel
        </h1>
        <p className="text-sm text-text-2 capitalize">{today}</p>
      </div>
      <div className="flex items-center gap-2 self-start rounded-full border border-border-2 bg-navy-2/60 px-3 py-1.5 font-mono text-xs text-text-2 md:self-auto">
        <span className="h-1.5 w-1.5 rounded-full bg-green" />
        Tous systèmes opérationnels
      </div>
    </header>
  );
}
