# Vertex Web Common Build Tools

This project contains our common build tooling for web projects. It contains a
build script to compile a web project as well as a library to generate [Rollup]
configuration files.

## Usage

Add `@vertexvis/build-tools` as an NPM dev dependency to your project, and
include a `build` NPM script.

```json
// package.json
{
  "scripts": {
    "build": "./node_modules/@vertexvis/build-tools/bin/build-web.sh"
  },
  "devDependencies": {
    "@vertexvis/build-tools": "0.1.4"
  }
}
```

Add a `rollup.config.js` file at the root of your project, and use the included
helpers to programmatically generate a Rollup configuration. A basic Rollup
configuration for a TypeScript project will look like the following:

```js
// rollup.config.js
import {
  config,
  typescript,
  output,
  minify,
  input,
} from '@vertexvis/build-tools';

export default config(input('src/index.ts'), typescript(), output(), minify());
```

By default, the returned Rollup configuration will include any packages marked
as an NPM dependency into the bundle. Any packages labeled as a peer dependency
will be marked as external and will not be included in the bundle. Consuming
projects are expected to include packages marked as peer dependencies.

## Configuration API

- [`autoExternal(config?: AutoExternalPluginConfig): RollupConfig`](./src/rollup/autoExternal.ts)
- [`commonJs(config?: RollupCommonJSOptions): RollupConfig`](./src/rollup/commonJs.ts)
- [`config(...configs: RollupConfig): RollupConfig`](./src/rollup/config.ts)
- [`external(modules: string[]): RollupConfig`](./src/rollup/external.ts)
- [`input(input: string): RollupConfig`](./src/rollup/input.ts)
- [`minify(options?: MinifyOptions): RollupConfig`](./src/rollup/minify.ts)
- [`output(options?: OutputOptions): RollupConfig`](./src/rollup/output.ts)
- [`typescript(options?: OutputOptions): RollupConfig`](./src/rollup/typescript.ts)

[rollup]: https://rollupjs.org
