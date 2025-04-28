// eslint.config.js
import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import eslintPluginReact from "eslint-plugin-react";
import eslintPluginTypescript from "@typescript-eslint/eslint-plugin";
import eslintPluginImport from "eslint-plugin-import";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import parserTypescript from "@typescript-eslint/parser";

export default [
  {
    ignores: ["dist"]
  },
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: parserTypescript,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {}
    },
    linterOptions: {
      reportUnusedDisableDirectives: true
    },
    plugins: {
      react: eslintPluginReact,
      "@typescript-eslint": eslintPluginTypescript,
      import: eslintPluginImport,
      prettier: eslintPluginPrettier,
      "react-hooks": eslintPluginReactHooks
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      eqeqeq: ["error", "always"],
      "@typescript-eslint/no-empty-function": "off",
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling"]
        }
      ],
      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto"
        }
      ],
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react/prop-types": "off",
      semi: [2, "always"],
      quotes: [
        2,
        "double",
        {
          avoidEscape: true,
          allowTemplateLiterals: true
        }
      ],
      "import/no-internal-modules": [
        "error",
        {
          forbid: ["@/components/**"]
        }
      ]
    },
    settings: {
      "import/resolver": {
        typescript: {},
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"]
        }
      },
      react: {
        pragma: "React",
        version: "detect"
      }
    }
  },
  eslintPluginPrettierRecommended
];
