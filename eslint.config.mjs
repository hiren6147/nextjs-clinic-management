import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = defineConfig([
  ...nextVitals,

  {
    plugins: {
      "@tanstack/query": tanstackQuery, // 👈 register plugin
    },
    rules: {
      // 👇 enable recommended rules
      ...tanstackQuery.configs.recommended.rules,

      // Optional: fine-tune specific ones
      "@tanstack/query/exhaustive-deps": "error",
      "@tanstack/query/stable-query-client": "warn",
    },
  },

  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
