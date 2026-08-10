import { FlatCompat } from "@eslint/eslintrc";
import { defineConfig, globalIgnores } from "eslint/config";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const eslintConfig = defineConfig([
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Vendored component registries (Bklit UI, Kokonut UI) — not hand-maintained app code.
    "src/components/charts/**",
    "src/components/kokonut/**",
  ]),
]);

export default eslintConfig;
