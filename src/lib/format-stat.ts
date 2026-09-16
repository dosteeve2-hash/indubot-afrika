/**
 * Formatage des valeurs affichees dans les cartes de statistiques.
 *
 * La locale est **epinglee a `fr-FR`**, et ce n'est pas une preference de style.
 *
 * `chart-stat-flow` appelait `new Intl.NumberFormat(undefined, …)`. Passer
 * `undefined` demande la locale de l'environnement — celle du serveur au rendu
 * initial, celle du navigateur apres hydratation. Ce sont rarement les memes :
 * le serveur de build repond `en-US` et rend « 1,234 », un navigateur francais
 * rend « 1 234 ». React voit alors deux textes differents pour le meme noeud :
 * c'est une divergence d'hydratation.
 *
 * Tous les autres formatages du depot epinglent deja `fr-FR` (l'en-tete du
 * tableau de bord, la politique de confidentialite). Celui-ci etait le seul a
 * ne pas le faire.
 */

/** Sous-ensemble d'`Intl.NumberFormatOptions` supporte par NumberFlow. */
export interface ChartStatFlowFormat {
  notation?: 'standard' | 'compact'
  compactDisplay?: 'short' | 'long'
  minimumFractionDigits?: number
  maximumFractionDigits?: number
  minimumIntegerDigits?: number
  minimumSignificantDigits?: number
  maximumSignificantDigits?: number
  style?: 'decimal' | 'percent' | 'currency'
  currency?: string
  currencyDisplay?: 'symbol' | 'narrowSymbol' | 'code' | 'name'
  unit?: string
  unitDisplay?: 'short' | 'long' | 'narrow'
}

export const defaultChartStatFlowFormat: ChartStatFlowFormat = {
  notation: 'standard',
  maximumFractionDigits: 0,
}

export const LOCALE = 'fr-FR' as const

export function formatStatValue(
  value: number,
  formatOptions: ChartStatFlowFormat,
  prefix?: string,
  suffix?: string,
): string {
  // Une valeur non finie ne s'affiche pas comme un nombre : `Intl` rendrait
  // « NaN », ce qui se lit comme une donnee alors que c'est une absence.
  const formatted = Number.isFinite(value)
    ? new Intl.NumberFormat(LOCALE, formatOptions).format(value)
    : '—'
  return `${prefix ?? ''}${formatted}${suffix ?? ''}`
}
