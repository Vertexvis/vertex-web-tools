module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "@vertexvis/eslint-config-vertexvis",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier/@typescript-eslint"
  ],
  rules: {
    "@typescript-eslint/indent": "off",
    "@typescript-eslint/explicit-function-return-type": [
      "error",
      {
        allowExpressions: true
      }
    ],
    "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
    "@typescript-eslint/func-call-spacing": ["error"],
    "@typescript-eslint/member-ordering": ["error"],
    "@typescript-eslint/no-use-before-define": ["off"],
    "@typescript-eslint/explicit-member-accessibility": ["error"],
    "@typescript-eslint/no-unused-vars": ["error", { args: "none" }]
  },
  overrides: [
    {
      files: ["*.js", "*.jsx"],
      rules: {
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-member-accessibility": "off"
      }
    }
  ]
};
