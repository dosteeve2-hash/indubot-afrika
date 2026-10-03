import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

/**
 * Suite de tests Vitest — contraste des jetons de la charte
 *
 * Ce module existe a cause de deux valeurs qui echouaient a WCAG 2.1 AA :
 * `--text-3` valait `#4e6482`, soit **2,39 : 1** sur `--navy-3` — le plus faible
 * contraste de tout l'ecosysteme FORGE — et `--red` valait `#ef4444`, sous le
 * seuil sur deux fonds sur trois.
 *
 * Ces jetons ne sont pas decoratifs : ils sont exposes a Tailwind par le bloc
 * `@theme inline`, et consommes comme classes — `text-text-3` apparait 20 fois,
 * `text-red` 3 fois. `text-text-3` accompagne systematiquement `text-xs`, donc
 * c'est du petit texte : le seuil applicable est bien 4,5 : 1, sans l'exemption
 * des grands caracteres.
 *
 * La charte SDC laisse les *valeurs* libres par projet depuis le 26/09/2026 ; le
 * seuil, lui, ne l'est pas. Les tests ci-dessous lisent les jetons dans
 * `globals.css` et refont le calcul, pour qu'un changement de palette ne puisse
 * pas repasser sous le seuil sans que la CI le dise.
 */
const css = readFileSync(join(process.cwd(), 'src/app/globals.css'), 'utf8')

function jeton(nom: string): string {
  const m = css.match(new RegExp(`--${nom}\\s*:\\s*(#[0-9a-fA-F]{6})`))
  if (!m) throw new Error(`jeton --${nom} introuvable dans src/app/globals.css`)
  return m[1]
}

/** Luminance relative sRGB, telle que la definit WCAG 2.1. */
function luminance(hex: string): number {
  const canal = (c: number) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4))
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
  return 0.2126 * canal(r) + 0.7152 * canal(g) + 0.0722 * canal(b)
}

function contraste(a: string, b: string): number {
  const [clair, sombre] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (clair + 0.05) / (sombre + 0.05)
}

/** Les trois fonds du produit. Noter les tirets : ici la charte s'ecrit `--navy-2`. */
const FONDS = ['navy', 'navy-2', 'navy-3'] as const
const SEUIL_AA = 4.5

describe('charte Indubot — contraste WCAG 2.1 AA', () => {
  it.each((['text', 'text-2', 'text-3'] as const).flatMap((t) => FONDS.map((f) => [t, f] as const)))(
    '--%s sur --%s atteint 4,5 : 1',
    (texte, fond) => {
      const r = contraste(jeton(texte), jeton(fond))
      expect(r, `--${texte} (${jeton(texte)}) sur --${fond} (${jeton(fond)}) = ${r.toFixed(2)}`)
        .toBeGreaterThanOrEqual(SEUIL_AA)
    },
  )

  // --red signale une panne machine dans ce produit, --green un equipement sain :
  // deux etats qu'un operateur doit distinguer en un coup d'oeil.
  it.each((['red', 'green'] as const).flatMap((c) => FONDS.map((f) => [c, f] as const)))(
    '--%s reste lisible sur --%s',
    (couleur, fond) => {
      const r = contraste(jeton(couleur), jeton(fond))
      expect(r, `--${couleur} (${jeton(couleur)}) sur --${fond} = ${r.toFixed(2)}`)
        .toBeGreaterThanOrEqual(SEUIL_AA)
    },
  )

  it('le calcul est juste : blanc sur noir vaut 21, une couleur sur elle-meme vaut 1', () => {
    expect(contraste('#ffffff', '#000000')).toBeCloseTo(21, 1)
    expect(contraste('#4e6482', '#4e6482')).toBeCloseTo(1, 5)
  })

  it('chaque jeton de texte est expose a Tailwind, sinon le corriger ne changerait rien', () => {
    for (const t of ['text', 'text-2', 'text-3']) {
      expect(css, `--color-${t} absent du bloc @theme`).toContain(`--color-${t}: var(--${t})`)
    }
  })
})
