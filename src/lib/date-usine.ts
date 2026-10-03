/**
 * La date affichée par le tableau de bord, calculée de façon déterministe.
 *
 * Pourquoi ce module existe : l'en-tête faisait
 *
 *     new Date().toLocaleDateString("fr-FR", { … })
 *
 * dans un composant `"use client"`. Un tel composant est quand même rendu sur le
 * serveur au premier passage, puis ré-exécuté dans le navigateur à l'hydratation —
 * et `toLocaleDateString` sans `timeZone` utilise le fuseau de l'environnement.
 * Le serveur est en UTC, le navigateur ne l'est pas :
 *
 *     serveur (UTC)      → mardi 15 septembre 2026
 *     client (Turquie)   → mercredi 16 septembre 2026
 *
 * Résultat : une divergence d'hydratation, et surtout une date FAUSSE à l'écran
 * pendant les trois dernières heures de chaque journée.
 *
 * C'est exactement le défaut déjà corrigé sur ce dépôt pour `Intl.NumberFormat`
 * (la locale de l'environnement), sous une autre forme : le fuseau.
 *
 * Le fuseau est donc fixé explicitement. Celui qui compte pour un tableau de bord
 * industriel est celui de l'USINE, pas celui de l'écran qui la regarde : un
 * responsable en déplacement doit voir la journée de production telle que son site
 * la vit. `Africa/Ouagadougou` (UTC+0) est le marché visé ; une seule ligne à
 * changer le jour où il y aura des sites sous plusieurs fuseaux.
 */
export const FUSEAU_USINE = 'Africa/Ouagadougou'

export function dateUsine(maintenant: Date = new Date()): string {
  return maintenant.toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: FUSEAU_USINE,
  })
}
