/** @type {import("eslint").Linter.Config} */
const config = {
  root: true,
  extends: [
    "eslint:recommended",
    "@react-native-community",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "prettier",
  ],
  plugins: ["@typescript-eslint"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["./tsconfig.json"],
    tsconfigRootDir: __dirname,
  },
  rules: {
    "no-void": [
      "ignore"
    ],
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/consistent-type-imports": [
      "error",
      { prefer: "type-imports", fixStyle: "separate-type-imports" },
    ],
  },
  ignorePatterns: ["**/*.config.js", "**/*.config.cjs", ".eslintrc.cjs"],
  reportUnusedDisableDirectives: true,
};

module.exports = config;
