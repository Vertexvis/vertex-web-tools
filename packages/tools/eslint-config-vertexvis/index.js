module.exports = {
  parserOptions: {
    ecmaVersion: 6
  },
  plugins: ["prettier"],
  extends: ["plugin:prettier/recommended"],
  rules: {
    eqeqeq: [2, "smart"],
    "func-call-spacing": "off",
    indent: ["error", 2],
    "lines-between-class-members": [
      "error",
      "always",
      { exceptAfterSingleLine: true }
    ],
    "padding-line-between-statements": [
      "error",
      { blankLine: "always", prev: "function", next: "function" },
      { blankLine: "always", prev: "class", next: "class" },
      { blankLine: "always", prev: "export", next: "*" },
      {
        blankLine: "always",
        prev: "import",
        next: ["export", "class", "function", "const", "let", "var"]
      }
    ],
    "prettier/prettier": "error",
    yoda: 2
  }
};
