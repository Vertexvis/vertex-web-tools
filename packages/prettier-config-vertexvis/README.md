# Vertex Prettier Config

This package contains Vertex's shareable [Prettier](https://prettier.io)
configuration, so our house formatting style can be distributed across repos.

## Usage

Add `@vertexvis/prettier-config-vertexvis` and Prettier as `devDependencies` to
your project's `package.json`.

```jsonc
// package.json
{
  "devDependencies": {
    "@vertexvis/prettier-config-vertexvis": "0.1.0",
    "prettier": "^3.0.0",
  },
}
```

Then reference this config from the `prettier` key in your `package.json`. No
separate config file is needed.

```jsonc
// package.json
{
  "prettier": "@vertexvis/prettier-config-vertexvis",
}
```

### Overriding the defaults

If you need to override a value, create a `prettier.config.js` file in the root
of your project that extends this config.

```js
// prettier.config.js
import vertexvis from '@vertexvis/prettier-config-vertexvis';

export default {
  ...vertexvis,
  printWidth: 100,
};
```

## Note on `trailingComma`

Prettier 3 changed the default value of `trailingComma` from `es5` to `all`.
This config pins it to `all` so the value is explicitly declared. This includes trailing commas in
function parameters and arguments. Override as follows:

```js
// prettier.config.js
import vertexvis from '@vertexvis/prettier-config-vertexvis';

export default {
  ...vertexvis,
  trailingComma: 'es5',
};
```
