import Link from "next/link";
import { siteConfig, siteNavLinks } from "@/lib/site-config";

export default function SiteFooter() {
  return (
    <footer className="border-t border-border px-6 py-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div>
          <span className="font-serif text-lg italic text-gold">
            {siteConfig.name}
          </span>
          <p className="mt-1 font-mono text-xs text-text-3">
            Écosystème {siteConfig.ecosystem} — {new Date().getFullYear()}
          </p>
          <p className="mt-3 max-w-xs text-xs text-text-2">
            {siteConfig.address.street}, {siteConfig.address.locality},{" "}
            {siteConfig.address.countryName}
          </p>
        </div>

        <nav
          aria-label="Liens du site"
          className="flex flex-col gap-2 font-mono text-xs uppercase tracking-wide text-text-2 md:items-end"
        >
          {siteNavLinks.map((link) => (
            <Link
              className="transition-colors hover:text-gold"
              href={link.href}
              key={link.href}
            >
              {link.label}
            </Link>
          ))}
          <a className="transition-colors hover:text-gold" href={`mailto:${siteConfig.email}`}>
            {siteConfig.email}
          </a>
        </nav>
      </div>
    </footer>
  );
}
