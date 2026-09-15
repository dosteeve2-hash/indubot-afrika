#!/usr/bin/env node
/**
 * Garde-fou du réglage système « réduire les animations ».
 *
 * Pourquoi ce script existe : ce dépôt respecte déjà le réglage partout où Motion s'en
 * charge — `shimmering-text`, `use-grid-shimmer`, `use-animated-series-path` appellent
 * tous `useReducedMotion`. Ce qui donnait l'impression d'une couverture complète.
 * Le 15 septembre 2026, le seul endroit hors de portée de Motion l'ignorait : le fond
 * animé de la page d'accueil, une boucle `requestAnimationFrame` qui redessine un
 * canevas plein écran avec un flou de 35px à chaque image. Ni une règle CSS de durée
 * ni `useReducedMotion` ne l'atteignaient, puisqu'il ne passe par aucun des deux.
 *
 * Deux contrôles :
 *   1. tout fichier qui fait TOURNER une boucle requestAnimationFrame doit consulter
 *      le réglage ;
 *   2. src/lib/mouvement.ts doit réellement interroger la media query — sans quoi le
 *      premier contrôle resterait vert autour d'un module vidé.
 *
 * « Faire tourner une boucle » et non « appeler requestAnimationFrame » : la première
 * version de ce script confondait les deux, et accusait `use-scheduled-tooltip.ts`, qui
 * s'en sert comme d'un ÉTRANGLEUR À UN COUP — il regroupe des mises à jour d'infobulle
 * en une seule par image, planifie un unique rappel et ne se replanifie jamais. Rien n'y
 * bouge. Lui imposer de consulter le réglage aurait dégradé l'infobulle pour rien.
 * Ce qui distingue une animation, c'est la RÉCURRENCE : la fonction passée à
 * requestAnimationFrame se rappelle elle-même. C'est cela qu'on cherche.
 *
 * Échoue avec un code non nul : utilisable en CI.
 */
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

const MODULE_MOUVEMENT = "src/lib/mouvement.ts";
const REQUETE = "(prefers-reduced-motion: reduce)";

/**
 * Fichiers versionnés ET non versionnés non ignorés. `git ls-files` seul saute ce qui
 * n'est pas encore ajouté : le contrôle local passerait au vert sur un fichier que la
 * CI verra bel et bien après le commit.
 */
function fichiersSources() {
  return execFileSync("git", ["ls-files", "--cached", "--others", "--exclude-standard"], {
    encoding: "utf8",
  })
    .split("\n")
    .filter((f) => /^src\/.+\.tsx?$/.test(f));
}

/** Retire commentaires de bloc et de ligne : un appel commenté n'est pas un appel. */
function sansCommentaires(source) {
  return source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:])\/\/.*$/gm, "$1");
}

/** Corps d'une fonction nommée, par équilibrage d'accolades depuis sa déclaration. */
function corpsDe(code, nom) {
  const decl = new RegExp(
    `(?:function\\s+${nom}\\s*\\(|(?:const|let|var)\\s+${nom}\\s*=)`
  ).exec(code);
  if (!decl) return null;
  const debut = code.indexOf("{", decl.index);
  if (debut === -1) return null;
  let profondeur = 0;
  for (let i = debut; i < code.length; i++) {
    if (code[i] === "{") profondeur++;
    else if (code[i] === "}") {
      profondeur--;
      if (profondeur === 0) return code.slice(debut, i + 1);
    }
  }
  return null;
}

/**
 * Vrai quand une fonction nommée passée à requestAnimationFrame se replanifie
 * elle-même — la signature d'une boucle d'animation, par opposition à un rappel unique.
 */
function boucleAnimation(code) {
  for (const m of code.matchAll(/requestAnimationFrame\s*\(\s*([A-Za-z_$][\w$]*)\s*\)/g)) {
    const corps = corpsDe(code, m[1]);
    if (corps && /requestAnimationFrame/.test(corps)) return true;
  }
  return false;
}

const erreurs = [];

for (const fichier of fichiersSources()) {
  if (fichier === MODULE_MOUVEMENT) continue;
  const code = sansCommentaires(readFileSync(fichier, "utf8"));
  if (!boucleAnimation(code)) continue;

  const consulte =
    /from\s+["'](@\/lib\/mouvement|\.{1,2}\/[^"']*\/?mouvement)["']/.test(code) ||
    /useReducedMotion/.test(code);

  if (!consulte) {
    erreurs.push(
      `${fichier} fait tourner une boucle requestAnimationFrame sans consulter le réglage ` +
        `« réduire les animations ». Aucune règle CSS de durée ne l'atteint : importe ` +
        `mouvementReduit() depuis @/lib/mouvement, ou useReducedMotion de motion/react.`
    );
  }
}

const mouvement = readFileSync(MODULE_MOUVEMENT, "utf8");
if (!mouvement.includes(REQUETE)) {
  erreurs.push(
    `${MODULE_MOUVEMENT} n'interroge plus « ${REQUETE} » : les fichiers qui l'appellent ` +
      `croient consulter le réglage et ne consultent rien.`
  );
}
if (!/matchMedia/.test(mouvement)) {
  erreurs.push(`${MODULE_MOUVEMENT} n'appelle plus matchMedia : il ne peut rien lire du système.`);
}

if (erreurs.length > 0) {
  console.error("❌ Mouvement réduit — le réglage système n'est plus respecté :");
  for (const e of erreurs) console.error(`   - ${e}`);
  process.exit(1);
}

console.log("✅ Mouvement réduit — toute boucle requestAnimationFrame passe par le réglage.");
