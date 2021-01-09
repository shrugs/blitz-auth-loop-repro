module.exports = {
  env: {
    es2020: true,
  },
  plugins: ["jsx-a11y", "simple-import-sort"],
  extends: [
    "react-app",
    "plugin:jsx-a11y/recommended",
    "plugin:prettier/recommended",
    "prettier/react",
  ],
  rules: {
    "import/no-anonymous-default-export": "error",
    "import/no-webpack-loader-syntax": "off",
    "react/react-in-jsx-scope": "off", // React is always in scope with Blitz
    "jsx-a11y/anchor-is-valid": "off", //Doesn't play well with Blitz/Next <Link> usage
    "simple-import-sort/imports": [
      "warn",
      {
        groups: [
          [
            // Side effect imports.
            "^\\u0000",
            // Packages.
            // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
            "^@?\\w",
            // Absolute imports and other imports such as Vue-style `@/foo`.
            // Anything that does not start with a dot.
            "^[^.]",
            // Relative imports.
            // Anything that starts with a dot.
            "^\\.",
          ],
        ],
      },
    ],
  },
};
