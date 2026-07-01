# Vertex ESLint Config for TypeScript

This package contains Vertex's sharable ESLint config for TypeScript. It extends
`@vertexvis/eslint-config-vertexvis` and includes formatting of JS, JSX, TS and
TSX files through Prettier.

## Usage

Add this package and ESLint as `devDependencies` to your `package.json`.

```json
// package.json
{
  "devDependencies": {
    "@vertexvis/eslint-config-vertexvis-typescript": "0.6.0",
    "eslint": "^8.57.0"
  }
}
```

Add an `eslint.config.js` file to the root of your project that imports this
config.

```js
// eslint.config.js
import vertexvisTypescript from '@vertexvis/eslint-config-vertexvis-typescript';

export default [...vertexvisTypescript];
```
