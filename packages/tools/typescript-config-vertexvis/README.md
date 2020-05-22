# Vertex TypeScript Configs

This project contains Vertex's sharable TypeScript configs.

It contains a base `tsconfig.json` that includes our base TypeScript settings.
The base config contains settings that should be used across Vertex projects. By
default, this includes supporting ES6 language features.

The project contains an additional `tsconfig-web.json` for web-based projects.
This extends the base configuration, but also includes library definitions for
browser APIs.

## Usage

Add `@vertexvis/typescript-config-vertexvis` as an NPM dev dependency to your
project's `package.json`.

```json
// package.json
{
  "devDependencies": {
    "@vertexvis/typescript-config-vertexvis": "0.0.0"
  }
}
```

Add a `tsconfig.json` file to the root of your project that extends one of the
base configuration files. Pass additional compiler options to override the base
configuration settings.

```json
{
  "$schema": "http://json.schemastore.org/tsconfig",

  "extends": "@vertexvis/typescript-config-vertexvis/tsconfig",
  "compilerOptions": {
    "lib": ["es6", "ES2016.Array.Include"]
  }
}
```
