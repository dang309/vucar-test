module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh", "simple-import-sort"],
  rules: {
    "no-console": "off",
    "no-eval": "warn",
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "no-underscore-dangle": "off",
    "import/prefer-default-export": "off",
    "react/jsx-props-no-spreading": "off",
    "no-unused-vars": "off",
    "react-hooks/exhaustive-deps": "warn",
    "import/no-extraneous-dependencies": "off",
    "react/jsx-no-useless-fragment": "off",
    "react/button-has-type": "off",
    "react/no-array-index-key": "off",
    "jsx-a11y/label-has-associated-control": "off",
    "func-names": "off",
    "react/destructuring-assignment": "off",
    "react/no-danger": "off",
    "no-param-reassign": [
      2,
      {
        props: false,
      },
    ],
    "react/jsx-filename-extension": [
      2,
      {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    ],
    "react/function-component-definition": [
      2,
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
    "simple-import-sort/imports": [
      "warn",
      {
        groups: [
          // Packages `react` related packages come first.
          ["^react", "^@?\\w"],
          // Internal packages.
          ["^(@|src)(/.*|$)"],
          // Side effect imports.
          ["^\\u0000"],
          // Parent imports. Put `..` last.
          ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
          // Other relative imports. Put same-folder imports and `.` last.
          ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
          // Style imports.
          ["^.+\\.?(css|scss)$"],
        ],
      },
    ],
    "react/display-name": "off",
  },
};
