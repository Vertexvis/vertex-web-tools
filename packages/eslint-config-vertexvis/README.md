# Vertex ESLint Config

This package contains Vertex's sharable config for ESLint. It includes
formatting of JS, JSX, TS and TSX files through Prettier.

## Usage

Add this package and ESLint as `devDependencies` to your `package.json`.

```json
// package.json
{
  "devDependencies": {
    "@vertexvis/eslint-config-vertexvis": "0.0.0",
    "eslint": "^6.1.0"
  }
}
```

Add an `eslint.config.js` file to the root of your project that imports this
config.

```js
// eslint.config.js
import vertexvis from '@vertexvis/eslint-config-vertexvis';

export default [...vertexvis];
```
