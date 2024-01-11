/* eslint-disable @typescript-eslint/no-empty-function */
import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { visualizer } from "rollup-plugin-visualizer";
import svgr from "vite-plugin-svgr";
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
        dts({
            rollupTypes: true
        }),
        svgr(),
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
            external: ["react", "react-dom", "react/jsx-runtime"],
            output: {
                globals: {
                    react: "React",
                    "react-dom": "ReactDOM",
                    "react/jsx-runtime": "react/jsx-runtime"
                }
            }
        }
    },
    server: {
        host: "0.0.0.0"
    }
});
