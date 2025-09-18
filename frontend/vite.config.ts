import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { fileURLToPath } from "url";

// Compute project root (ESM-friendly)
const __dirname = fileURLToPath(new URL(".", import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    // Exclude the package from pre-bundling and instead alias to its browser bundle.
    // The package's ESM files use `import ... with { type: 'json' }` which causes
    // esbuild parsing errors. Pointing to the browser bundle avoids that.
    exclude: ["@base-org/account"],
  },
  resolve: {
    alias: {
      // Point directly at the package's browser bundle file on disk. Using the
      // absolute file path bypasses the package's export map and prevents
      // esbuild from parsing ESM sources that use `import ... with` JSON syntax.
      "@base-org/account": resolve(
        __dirname,
        "node_modules/.pnpm/@base-org+account@1.1.1_@types+react@18.3.24_bufferutil@4.0.9_react@18.3.1_typescript@5_f5698cb05a7f133b79d3311817e75987/node_modules/@base-org/account/dist/base-account.min.js"
      ),
    },
  },
  esbuild: {
    target: "esnext",
  },
  build: {
    target: "esnext",
  },
});
