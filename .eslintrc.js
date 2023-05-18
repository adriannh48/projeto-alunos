module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: "airbnb-base",
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    "max-classes-per-file": "off",
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["error"],
    "class-methods-use-this": ["off"],
    "@typescript-eslint/no-explicit-any": "off",
    "import/prefer-default-export": "off",
  },
};
