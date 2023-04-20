import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src")
    }
  },
  plugins: [
    react({
      babel: {
        env: {
          production: {
            plugins: [["babel-plugin-styled-components", { displayName: false, pure: true }]]
          },
          development: {
            plugins: [["babel-plugin-styled-components", { displayName: true, pure: true }]]
          }
        }
      }
    }),
    dts(),
    visualizer({
      template: "treemap"
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "react-scheduler",
      fileName: "index"
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM"
        }
      }
    }
  }
});
