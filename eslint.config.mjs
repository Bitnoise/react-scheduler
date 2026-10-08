import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import importXPlugin from "eslint-plugin-import-x";
import prettierPluginRecommended from "eslint-plugin-prettier/recommended";
import filenamesPlugin from "eslint-plugin-filenames";

export default tseslint.config(
  // 1. Global Ignores
  {
    ignores: ["**/dist/**", "**/build/**", "**/coverage/**", "**/node_modules/**", "**/*.min.js"]
  },

  // 2. Base Configurations
  js.configs.recommended,
  ...tseslint.configs.recommended,
  importXPlugin.flatConfigs.recommended,
  importXPlugin.flatConfigs.typescript,
  prettierPluginRecommended,

  // 3. React & Project Configuration
  {
    files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"],
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      filenames: filenamesPlugin
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    settings: {
      react: {
        pragma: "React",
        version: "detect"
      }
    },
    rules: {
      // React Rules
      ...reactPlugin.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",

      // React Hooks Rules
      ...reactHooksPlugin.configs.recommended.rules,
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // Import-X Rules
      "import-x/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling"]
        }
      ],
      "import-x/no-internal-modules": [
        "error",
        {
          forbid: ["@/components/**"]
        }
      ],

      // TypeScript & General Rules
      "@typescript-eslint/no-empty-function": "off",
      eqeqeq: ["error", "always"],
      semi: ["error", "always"],
      quotes: [
        "error",
        "double",
        {
          avoidEscape: true,
          allowTemplateLiterals: true
        }
      ],

      // Prettier Rules
      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto"
        }
      ],

      // Filenames Rules
      "filenames/match-exported": "error"
    }
  }
);
