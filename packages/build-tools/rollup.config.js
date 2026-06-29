import json from '@rollup/plugin-json';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import typescript2 from 'rollup-plugin-typescript2';

const config = {
  input: 'src/index.ts',
  output: [
    {
      file: './dist/bundle.js',
      format: 'esm',
    },
  ],
  plugins: [typescript2(), json(), peerDepsExternal()],
};

export default config;
