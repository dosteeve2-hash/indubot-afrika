/**
 * Le réglage système « réduire les animations », lisible depuis du JavaScript brut.
 *
 * Ce dépôt respecte déjà le réglage là où Motion s'en charge (`shimmering-text`,
 * `use-grid-shimmer`, `use-animated-series-path` appellent tous `useReducedMotion`).
 * Il restait un endroit hors de portée de Motion comme du CSS : le fond animé de la
 * page d'accueil, une boucle `requestAnimationFrame` qui redessine un canevas plein
 * écran. Aucune règle de durée ne l'arrête, et `useReducedMotion` ne le concerne pas
 * puisqu'il ne passe pas par Motion.
 */

const REQUETE = "(prefers-reduced-motion: reduce)";

/**
 * `false` côté serveur et sur un navigateur sans matchMedia : on ne peut pas deviner,
 * et deviner « réduit » priverait tout le monde d'animation. Le composant appelant doit
 * donc rester correct dans les deux cas.
 */
export function mouvementReduit(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return false;
  return window.matchMedia(REQUETE).matches;
}

/**
 * Prévient quand le réglage change, sans recharger. Quelqu'un qui l'active en cours de
 * visite vient le plus souvent d'être gêné par la page ; attendre un rechargement
 * serait répondre à côté. Rend la fonction de désabonnement.
 */
export function surChangementDeMouvement(rappel: (reduit: boolean) => void): () => void {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return () => {};
  const requete = window.matchMedia(REQUETE);
  const ecouteur = (e: MediaQueryListEvent) => rappel(e.matches);
  requete.addEventListener("change", ecouteur);
  return () => requete.removeEventListener("change", ecouteur);
}
