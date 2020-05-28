# Vertex Rollup Copyright Plugin

This project contains a [Rollup][rollup] plugin for prepending a Vertex
copyright to generated JS bundles.

## Usage

Add `@vertexvis/rollup-plugin-vertex-copyright` as an NPM dev dependency to your
project.

```json
// package.json
{
  "devDependencies": {
    "@vertexvis/rollup-plugin-vertex-copyright": "0.0.0"
  }
}
```

Import and add the plugin to your `rollup.config.js` file.

```js
// rollup.config.js
import copyright from '@vertexvis/rollup-plugin-vertex-copyright';

export default {
  plugins: [copyright()],
};
```

A default copyright will be used. You can customize the copyright by passing in
your own.

```js
// rollup.config.js
import copyright from '@vertexvis/rollup-plugin-vertex-copyright';

export default {
  plugins: [copyright('My copyright.')],
};
```

[rollup]: https://rollupjs.org
