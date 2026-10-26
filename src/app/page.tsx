import Link from "next/link";
import Image from "next/image";
import { ArrowDownRight, ArrowRight, Check } from "lucide-react";
import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";

const modules = [
  { name: "Vue d’ensemble", state: "Démonstration", available: true },
  { name: "Production", state: "À venir", available: false },
  { name: "Machines", state: "À venir", available: false },
  { name: "Alertes", state: "À venir", available: false },
  { name: "Rapports", state: "À venir", available: false },
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero-shell">
          <div className="hero-copy">
            <p className="hero-status">
              Produit en développement
            </p>
            <h1>
              Sachez en temps réel quelle machine s&apos;arrête, et pourquoi.
            </h1>
            <p className="hero-description">
              Découvrez l&apos;aperçu de Vue d&apos;ensemble. Toutes les valeurs
              sont illustratives, sans connexion à une usine.
            </p>
            <Link className="button-primary" href="/dashboard">
              Voir la démonstration
              <ArrowRight aria-hidden="true" size={18} />
            </Link>
          </div>

          <div className="signal-stage">
            <div className="signal-heading">
              <span>Schéma de principe</span>
              <span className="mono-label">Données illustratives</span>
            </div>
            <div className="signal-diagram">
              <svg
                aria-hidden="true"
                className="signal-wiring"
                fill="none"
                viewBox="0 0 640 360"
              >
                <path className="trace trace-one" d="M142 166H227V112H348" />
                <path className="trace trace-two" d="M142 196H258V243H348" />
                <path className="trace trace-three" d="M142 226H207V281H405" />
                <path className="trace trace-main" d="M142 196H348" />
                <circle className="trace-node node-one" cx="227" cy="112" r="4" />
                <circle className="trace-node node-two" cx="258" cy="243" r="4" />
                <circle className="trace-node node-three" cx="207" cy="281" r="4" />
                <path
                  className="chart-axis"
                  d="M397 278V88M397 278H602"
                />
                <path
                  className="production-line"
                  d="M408 244L446 220L478 235L511 165L544 183L579 119L601 132"
                />
                <circle className="chart-point" cx="579" cy="119" r="4" />
                <circle className="signal-runner" r="5">
                  <animateMotion
                    begin="0.5s"
                    dur="2.8s"
                    fill="freeze"
                    path="M142 196H397"
                    repeatCount="1"
                  />
                </circle>
              </svg>
              <div className="chip-node">
                <Image
                  alt=""
                  className="chip-mark"
                  height={64}
                  priority
                  src="/mark.svg"
                  width={64}
                />
                <span>Indubot</span>
                <small>Interface illustrée</small>
              </div>
              <div className="chart-caption">
                <span>Signal de production</span>
                <small>Représentation, pas une mesure réelle</small>
              </div>
            </div>
            <div className="event-log" aria-label="Scénario de démonstration">
              <div className="event-log-title">
                <span>Journal d&apos;événements</span>
                <span className="mono-label">Scénario illustratif</span>
              </div>
              <div className="event-row event-alert">
                <span className="event-time">Exemple</span>
                <span className="event-message">
                  Arrêt signalé sur une machine
                </span>
                <span className="event-state">Alerte</span>
              </div>
              <div className="event-row event-resolved">
                <span className="event-time">Exemple</span>
                <span className="event-message">
                  Alerte clôturée, cycle repris
                </span>
                <span className="event-state event-running">
                  <span aria-hidden="true" className="signal-state" />
                  En marche
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="status-section" id="produit">
          <div className="status-intro">
            <span className="section-rule" aria-hidden="true" />
            <h2>Un aperçu fidèle à l&apos;état du produit.</h2>
            <p>
              Le dépôt contient une vitrine pré-lancement et une démonstration
              du module Vue d&apos;ensemble. Aucun automate n&apos;est connecté.
            </p>
          </div>
          <div className="module-list" aria-label="État des modules">
            {modules.map((module) => (
              <div
                className={`module-row${module.available ? " module-active" : ""}`}
                key={module.name}
              >
                <span className="module-name">
                  {module.available ? (
                    <Check aria-hidden="true" size={17} />
                  ) : (
                    <span aria-hidden="true" className="module-dash" />
                  )}
                  {module.name}
                </span>
                <span className="module-state">
                  {module.state}
                </span>
              </div>
            ))}
            <p className="module-note">
              Les valeurs visibles dans la démonstration sont fictives.
            </p>
          </div>
        </section>

        <section className="clarity-section">
          <div className="clarity-mark">
            <Image
              alt=""
              className="clarity-chip"
              height={64}
              src="/mark.svg"
              width={64}
            />
            <div className="clarity-signal" aria-hidden="true">
              <span />
              <span />
              <span />
              <ArrowDownRight size={18} />
            </div>
          </div>
          <div className="clarity-copy">
            <p className="section-kicker">Ce que vous voyez</p>
            <h2>Un aperçu logiciel. Pas une usine connectée.</h2>
            <p>
              Le tableau de bord présente des exemples de production, de
              machines et d&apos;alertes. Ces éléments illustrent l&apos;interface,
              pas une activité industrielle réelle.
            </p>
          </div>
          <Link className="text-link" href="/tarifs">
            Voir les informations tarifaires
            <ArrowRight aria-hidden="true" size={16} />
          </Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
