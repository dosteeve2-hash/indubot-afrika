/**
 * Suite de tests Vitest — formatage des cartes de statistiques
 *
 * Ce module existe a cause d'un `new Intl.NumberFormat(undefined, …)`. Passer
 * `undefined` demande la locale de l'environnement : celle du serveur au rendu
 * initial, celle du navigateur apres hydratation. Les tests ci-dessous fixent
 * le comportement qui rend ces deux rendus identiques.
 */
import { describe, it, expect } from 'vitest'
import { formatStatValue, LOCALE, defaultChartStatFlowFormat } from '../lib/format-stat'

/**
 * L'espace insecable etroite (U+202F) que `fr-FR` insere comme separateur de
 * milliers. Elle est invisible dans un editeur : ecrire une espace ordinaire
 * dans une assertion produit un echec illisible, ou les deux chaines semblent
 * identiques a l'ecran. On la nomme.
 */
const ESP = '\u202f'

/**
 * Et ce n'est pas la meme espace partout : `fr-FR` met une insecable ORDINAIRE
 * (U+00A0) avant le suffixe de la notation compacte, la ou le groupement des
 * milliers utilise l'etroite. Deux caracteres invisibles differents dans la
 * meme locale — la premiere version de ce test s'y est trompee.
 */
const ESP_LARGE = '\u00a0'

describe('formatStatValue', () => {
  it('formate a la francaise, quelle que soit la locale de la machine', () => {
    // fr-FR groupe avec une espace insecable etroite (U+202F). Une assertion
    // ecrite avec une espace ordinaire echouerait sans qu'on comprenne pourquoi.
    expect(formatStatValue(1234567, { maximumFractionDigits: 0 })).toBe(`1${ESP}234${ESP}567`)
  })

  it('ne depend pas de la locale par defaut de l’environnement', () => {
    // Le coeur du defaut : `Intl.NumberFormat(undefined)` rend « 1,234 » sur un
    // serveur en-US et « 1 234 » dans un navigateur francais. Meme entree, deux
    // sorties, donc une divergence d'hydratation.
    const parDefaut = new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }).format(1234)
    const epingle = formatStatValue(1234, { maximumFractionDigits: 0 })
    expect(epingle).toBe(`1${ESP}234`)
    if (new Intl.NumberFormat().resolvedOptions().locale !== LOCALE) {
      expect(epingle).not.toBe(parDefaut)
    }
  })

  it('respecte le prefixe et le suffixe', () => {
    expect(formatStatValue(85, { maximumFractionDigits: 0 }, '', ' %')).toBe('85 %')
    expect(formatStatValue(12, { maximumFractionDigits: 0 }, '≈ ')).toBe('≈ 12')
  })

  it('respecte les decimales demandees', () => {
    expect(formatStatValue(3.14159, { maximumFractionDigits: 2 })).toBe('3,14')
    expect(formatStatValue(7, { minimumFractionDigits: 1 })).toBe('7,0')
  })

  it('applique la notation compacte a la francaise', () => {
    expect(formatStatValue(1500000, { notation: 'compact', maximumFractionDigits: 1 }))
      .toBe(`1,5${ESP_LARGE}M`)
  })

  it('rend un tiret sur une valeur non finie, jamais « NaN »', () => {
    expect(formatStatValue(Number.NaN, defaultChartStatFlowFormat)).toBe('—')
    expect(formatStatValue(Number.POSITIVE_INFINITY, defaultChartStatFlowFormat)).toBe('—')
  })

  it('conserve prefixe et suffixe autour du tiret', () => {
    expect(formatStatValue(Number.NaN, defaultChartStatFlowFormat, '', ' kWh')).toBe('— kWh')
  })

  it('formate zero et les valeurs negatives', () => {
    expect(formatStatValue(0, defaultChartStatFlowFormat)).toBe('0')
    expect(formatStatValue(-1250, defaultChartStatFlowFormat)).toBe(`-1${ESP}250`)
  })
})
