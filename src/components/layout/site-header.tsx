import Image from "next/image";
import Link from "next/link";
import SignInButton from "@/components/auth/sign-in-button";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link aria-label="Indubot Afrika, accueil" className="brand-link" href="/">
          <Image
            alt="Indubot"
            height={48}
            priority
            src="/logo-sombre.svg"
            width={143}
          />
          <span className="brand-afrika">Afrika</span>
        </Link>

        <nav aria-label="Navigation principale" className="desktop-nav">
          <Link href="/tarifs">Tarifs</Link>
          <a href="mailto:docompaore2@gmail.com">Contact</a>
          <SignInButton label="Google" provider="google" />
          <SignInButton label="GitHub" provider="github" />
        </nav>

        <details className="mobile-nav">
          <summary>
            <span>Menu</span>
          </summary>
          <nav aria-label="Navigation mobile">
            <Link href="/tarifs">Tarifs</Link>
            <Link href="/politique-confidentialite">Confidentialité</Link>
            <a href="mailto:docompaore2@gmail.com">Écrire à Indubot</a>
            <SignInButton label="Connexion Google" provider="google" />
            <SignInButton label="Connexion GitHub" provider="github" />
          </nav>
        </details>
      </div>
    </header>
  );
}
