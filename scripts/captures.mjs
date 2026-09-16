/**
 * Régénère les captures du README depuis l'application réelle.
 *
 *   npm i --no-save playwright sharp && npx playwright install chromium
 *   npm run build && npx next start -p 3240    # terminal 1
 *   node scripts/captures.mjs                   # terminal 2
 *
 * playwright et sharp ne sont volontairement pas dans devDependencies : ils
 * pèsent plus de 100 Mo pour un usage ponctuel, et `npm ci` tourne à chaque
 * exécution de CI. On les installe le temps de régénérer les images.
 */
import { chromium } from 'playwright';

const EXE = process.env.CHROMIUM_PATH;
const BASE = process.env.BASE || 'http://localhost:3240';
const OUT = process.env.OUT || 'docs/captures';
const PAGES = { '/': 'accueil', '/dashboard': 'dashboard' };

// --no-proxy-server : sans lui, Chromium route localhost via le proxy HTTP de
// l'environnement et n'atteint jamais le serveur local.
const browser = await chromium.launch({
  ...(EXE ? { executablePath: EXE } : {}),
  args: ['--no-proxy-server'],
});
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

for (const [route, name] of Object.entries(PAGES)) {
  const res = await page.goto(BASE + route, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForLoadState('load').catch(() => {});
  // Les animations d'entrée et les graphiques visx ont besoin de respirer.
  await page.waitForTimeout(3500);
  await page.screenshot({ path: `${OUT}/${name}.png` });
  console.log(`${name}.png  ←  ${route}  (HTTP ${res ? res.status() : '?'})`);
}

await browser.close();

const sharp = (await import('sharp')).default;
const { readdir, rename } = await import('node:fs/promises');
const { join } = await import('node:path');
for (const file of (await readdir(OUT)).filter((f) => f.endsWith('.png'))) {
  const p = join(OUT, file);
  await sharp(p).resize({ width: 1440, withoutEnlargement: true })
    .png({ compressionLevel: 9, palette: true, quality: 90 }).toFile(p + '.tmp');
  await rename(p + '.tmp', p);
}
console.log('captures optimisées');
