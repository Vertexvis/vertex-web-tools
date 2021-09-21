import typescript2 from 'rollup-plugin-typescript2';

const config = {
  plugins: [typescript2()],
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/bundle.cjs.js',
      format: 'cjs',
      sourcemap: true,
      name: undefined,
      globals: undefined,
    },
    {
      file: 'dist/bundle.esm.js',
      format: 'esm',
      sourcemap: true,
      name: undefined,
      globals: undefined,
    },
  ],
};

export default config;

// This rollup config is the generated config using @vertexvis/build-tools
// currently due to a cyclic dev dependency, lerna is unable to build both
// this package and the build-tools package.
// TODO (jeff): return to using build-tools when a version is available on NPM

// import {
//   config,
//   typescript,
//   output,
//   minify,
//   input,
// } from '@vertexvis/build-tools';

// export default config(input('src/index.ts'), typescript(), output(), minify());
