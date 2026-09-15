#!/usr/bin/env node
/**
 * check-date-usine.mjs — la date du tableau de bord ne doit pas dépendre du fuseau
 * de la machine qui la calcule.
 *
 * Pourquoi ce script existe : l'en-tête faisait `new Date().toLocaleDateString("fr-FR", …)`
 * dans un composant `"use client"`. Un tel composant est quand même rendu sur le serveur,
 * puis ré-exécuté dans le navigateur — et sans `timeZone`, chacun répond avec SON fuseau.
 * Le serveur est en UTC, le navigateur ne l'est pas. Après 21h00 UTC, les deux ne
 * tombent pas d'accord sur le jour : divergence d'hydratation, et date fausse à l'écran.
 *
 * Node pur, aucune dépendance : le dépôt n'a pas de lanceur de tests sur son tronc.
 */
import { readFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const racine = join(dirname(fileURLToPath(import.meta.url)), '..')
const source = readFileSync(join(racine, 'src/lib/date-usine.ts'), 'utf8')

// On extrait le fuseau déclaré et on rejoue la mise en forme dans des processus
// Node lancés sous des TZ différentes — la seule façon honnête de tester ceci.
const m = source.match(/FUSEAU_USINE\s*=\s*'([^']+)'/)
if (!m) {
  console.error('::error::FUSEAU_USINE introuvable dans src/lib/date-usine.ts')
  process.exit(1)
}
const FUSEAU = m[1]

const INSTANT = '2026-09-15T22:30:00Z' // 22h30 UTC : minuit passé à l'est, pas encore à l'ouest
const FUSEAUX = ['UTC', 'Europe/Istanbul', 'Africa/Ouagadougou', 'America/New_York', 'Asia/Tokyo']

/**
 * Exécute la VRAIE `dateUsine()` du module, sous le fuseau demandé.
 *
 * Une première version de ce script réimplémentait la mise en forme au lieu d'appeler
 * le module : retirer `timeZone` de `date-usine.ts` ne le faisait donc pas échouer.
 * Un garde-fou qui teste son propre pastiche ne teste rien.
 *
 * Le module est du TypeScript sans dépendance : on en retire les annotations pour
 * l'évaluer, plutôt que d'ajouter un compilateur pour quinze lignes.
 */
function rendu(tz) {
  const js = source
    .replace(/export const/g, 'const')
    .replace(/export function dateUsine\(maintenant: Date = new Date\(\)\): string/, 'function dateUsine(maintenant)')
  const programme = `${js}\nprocess.stdout.write(dateUsine(new Date('${INSTANT}')))`
  return execFileSync(process.execPath, ['-e', programme],
    { env: { ...process.env, TZ: tz }, encoding: 'utf8' })
}

/** Le même instant mis en forme SANS fuseau fixé — l'ancien comportement. */
function renduSansFuseau(tz) {
  return execFileSync(process.execPath, ['-e',
    `process.stdout.write(new Date('${INSTANT}').toLocaleDateString('fr-FR',{weekday:'long',day:'numeric',month:'long',year:'numeric'}))`],
    { env: { ...process.env, TZ: tz }, encoding: 'utf8' })
}

let echecs = 0

// 1. Avec le fuseau fixé : tous les environnements doivent s'accorder.
const avec = FUSEAUX.map((tz) => [tz, rendu(tz)])
const distinctes = new Set(avec.map(([, v]) => v))
if (distinctes.size !== 1) {
  echecs++
  console.error(`  ✗ la date varie selon le fuseau de la machine (${distinctes.size} valeurs) :`)
  for (const [tz, v] of avec) console.error(`      ${tz.padEnd(20)} ${v}`)
} else {
  console.log(`  ✓ identique sous ${FUSEAUX.length} fuseaux, via ${FUSEAU} : « ${avec[0][1]} »`)
}

// 2. Le garde-fou doit prouver qu'il attrape quelque chose : sans `timeZone`, les
//    mêmes environnements DOIVENT diverger. Si ce n'est pas le cas, le test ne teste rien.
const sans = FUSEAUX.map((tz) => renduSansFuseau(tz))
if (new Set(sans).size === 1) {
  echecs++
  console.error('  ✗ sans timeZone les fuseaux ne divergent pas — ce contrôle ne prouve rien')
} else {
  console.log(`  ✓ sans timeZone, ${new Set(sans).size} dates différentes — le défaut est bien réel`)
}

// 3. Le code ne doit pas contenir de mise en forme de date sans fuseau explicite.
const coupables = []
for (const f of execFileSync('git', ['ls-files', 'src'], { cwd: racine, encoding: 'utf8' }).trim().split('\n')) {
  if (!/\.(ts|tsx)$/.test(f)) continue
  const txt = readFileSync(join(racine, f), 'utf8')
  for (const appel of txt.match(/toLocaleDateString\([\s\S]{0,220}?\)/g) ?? []) {
    if (!appel.includes('timeZone')) coupables.push(`${f} → ${appel.replace(/\s+/g, ' ').slice(0, 80)}…`)
  }
}
if (coupables.length) {
  echecs++
  console.error('  ✗ toLocaleDateString sans timeZone explicite :')
  for (const c of coupables) console.error(`      ${c}`)
} else {
  console.log('  ✓ aucun toLocaleDateString sans timeZone explicite')
}

if (echecs > 0) {
  console.error(`\n::error::check-date-usine — ${echecs} contrôle(s) en échec`)
  process.exit(1)
}
console.log('✅ la date du tableau de bord est stable quel que soit le fuseau')
