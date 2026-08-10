import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const trail = [{ label: "Accueil", href: "/" }, ...items];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      item: `${siteConfig.url}${crumb.href}`,
    })),
  };

  return (
    <nav aria-label="Fil d'ariane" className="px-6 pt-6 md:px-10">
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
      <ol className="flex flex-wrap items-center gap-1.5 font-mono text-xs text-text-3">
        {trail.map((crumb, index) => {
          const isLast = index === trail.length - 1;
          return (
            <li className="flex items-center gap-1.5" key={crumb.href}>
              {index === 0 ? (
                <Link
                  aria-label="Accueil"
                  className="flex items-center text-text-2 transition-colors hover:text-gold"
                  href={crumb.href}
                >
                  <Home className="h-3.5 w-3.5" />
                </Link>
              ) : isLast ? (
                <span aria-current="page" className="text-text-2">
                  {crumb.label}
                </span>
              ) : (
                <Link
                  className="text-text-2 transition-colors hover:text-gold"
                  href={crumb.href}
                >
                  {crumb.label}
                </Link>
              )}
              {!isLast && <ChevronRight className="h-3 w-3 text-text-3" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
