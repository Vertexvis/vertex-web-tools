import typescript2 from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import json from '@rollup/plugin-json';

const config = {
  input: 'src/index.ts',
  output: [
    {
      file: './dist/bundle.cjs.js',
      format: 'cjs',
    },
    {
      file: './dist/bundle.esm.js',
      format: 'esm',
    },
  ],
  plugins: [typescript2(), json(), peerDepsExternal(), commonjs()],
};

export default config;
