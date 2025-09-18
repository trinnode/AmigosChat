import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// Note: avoid using Node builtins here to keep vite config ESM-compatible in this environment

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
      // Exclude the package from pre-bundling and instead alias to its browser bundle.
      // The package's ESM files use `import ... with { type: 'json' }` which causes
      // esbuild parsing errors. Pointing to the browser bundle avoids that.
      exclude: ['@base-org/account']
  },
    resolve: {
      alias: {
        // Point to the browser bundle shipped by the package to avoid esbuild parsing issues
        '@base-org/account': '@base-org/account/dist/base-account.min.js',
      },
    },
  esbuild: {
    target: "esnext",
  },
  build: {
    target: "esnext",
  },
});
