"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function StickyMobileCta() {
  const pathname = usePathname();

  if (pathname.startsWith("/dashboard")) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border-2 bg-navy/95 px-4 py-3 backdrop-blur-md lg:hidden">
      <Link
        className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-gold font-mono text-sm font-medium text-navy transition-colors active:bg-gold-2"
        href="/dashboard"
      >
        Ouvrir le tableau de bord
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
