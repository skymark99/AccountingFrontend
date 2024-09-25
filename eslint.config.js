import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

const warnAllRules = (rules) =>
  Object.fromEntries(
    Object.entries(rules).map(([rule, value]) => {
      if (Array.isArray(value)) {
        return [rule, ["warn", ...value.slice(1)]];
      }
      return [rule, "warn"];
    })
  );

export default [
  { ignores: ["dist"] },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    settings: { react: { version: "18.3" } },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...warnAllRules(js.configs.recommended.rules),
      ...warnAllRules(react.configs.recommended.rules),
      ...warnAllRules(react.configs["jsx-runtime"].rules),
      ...warnAllRules(reactHooks.configs.recommended.rules),
      "react/jsx-no-target-blank": "off",
      "react/react-in-jsx-scope": "off", // Disable 'React' must be in scope when using JSX rule
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "react/prop-types": "off", // Disable missing prop validation
    },
  },
];
