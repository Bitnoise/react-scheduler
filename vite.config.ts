/* eslint-disable @typescript-eslint/no-empty-function */
import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  // Relative base: the font urls in dist/index.css (served from ./public/fonts) must resolve
  // next to the stylesheet, wherever the consumer's bundler or server puts it
  base: "./",
  resolve: {
    // Native Vite 8 tsconfig path resolution (complements or replaces manual alias)
    tsconfigPaths: true,
    alias: {
      "@": resolve(import.meta.dirname, "./src")
    }
  },
  plugins: [
    // 1. DTS placed before react() to prevent React 19 JSX transform conflicts
    react(),
    svgr(),
    visualizer({
      template: "treemap",
      filename: "stats.html"
    })
  ],
  build: {
    assetsDir: "",
    lib: {
      entry: resolve(import.meta.dirname, "src/index.ts"),
      name: "react-scheduler",
      fileName: "index",
      formats: ["es", "cjs"]
    },
    // 2. Updated from rollupOptions to rolldownOptions for Vite 8
    rolldownOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "jsxRuntime"
        }
      }
    }
  },
  server: {
    host: true
  }
});
