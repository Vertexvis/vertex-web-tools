# Vertex Jest Configs

This project contains Vertex's sharable Jest config files.

## Usage

Add `@vertexvis/jest-config-vertexvis` as an NPM dev dependency to your
project's `package.json`.

```json
// package.json
{
  "devDependencies": {
    "@vertexvis/jest-config-vertexvis": "0.0.0"
  }
}
```

Create a `jest.config.js` file in the root of your project that extends the base
Jest configuration file.

```js
// jest.config.js
const jestConfig = require('@vertexvis/jest-config-vertexvis/jest.config');

module.exports = jestConfig;
```

The Vertex Jest config supports overriding the default TypeScript settings. It
will look for an optional `tsconfig-jest.json` file in the project's root
folder.

```json
{
  "extends": "@vertexvis/jest-config-vertexvis/tsconfig",
  "compilerOptions": {
    "allowJs": true
  }
}
```
