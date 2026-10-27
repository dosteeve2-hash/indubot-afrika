import Image from "next/image";
import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="footer-brand">
          <Link aria-label="Indubot Afrika, accueil" className="footer-brand-link" href="/">
            <Image alt="" aria-hidden="true" height={32} src="/mark-clair.svg" width={32} />
            <span className="brand-word">indubot</span>
          </Link>
          <p>Le logiciel qui vit dans la machine.</p>
        </div>
        <nav aria-label="Liens du pied de page" className="footer-links">
          <Link href="/tarifs">Tarifs</Link>
          <Link href="/politique-confidentialite">Confidentialité</Link>
          <a href="mailto:docompaore2@gmail.com">docompaore2@gmail.com</a>
        </nav>
        <p className="footer-status">
          Démonstration en développement. Aucune connexion à un automate.
        </p>
      </div>
    </footer>
  );
}
