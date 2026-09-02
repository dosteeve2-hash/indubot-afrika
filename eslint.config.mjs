import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

/**
 * `eslint-config-next` 16 expose ses configs en flat natif. Les charger via
 * `FlatCompat` (prévu pour les configs .eslintrc héritées) faisait planter
 * ESLint sur « Converting circular structure to JSON » : le lint ne tournait
 * donc pas du tout.
 */
const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Registres de composants vendorisés (Bklit UI, Kokonut UI) — pas du code
    // applicatif maintenu à la main.
    "src/components/charts/**",
    "src/components/kokonut/**",
  ]),
]);

export default eslintConfig;
