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
    "@vertexvis/eslint-config-vertexvis-typescript": "0.0.0",
    "eslint": "^6.1.0"
  }
}
```

Add a `.eslintrc.js` file to the root of your project that extends this config.

This package also includes an optional patch file which monkey patches ESLint's
module resolution for plugins. ESLint resolves plugins relative to the consuming
package. So any plugins referenced by a sharable config will need to NPM
installed in the consuming package. There's an [open
issue](https://github.com/eslint/eslint/issues/3458#issuecomment-516716165) and
discussion to change this behavior to resolve plugins relative to the imported
config's `node_modules` folder. This shim mimics this behavior.

```js
// .eslintrc.js

// Include the optional patch which resolves ESLint plugins relative to the
// sharable config package.
require('@vertexvis/eslint-config-vertexvis-typescript/patch');

module.exports = {
  extends: '@vertexvis/vertexvis-typescript',
};
```
