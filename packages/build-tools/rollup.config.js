import typescript2 from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import autoExternal from 'rollup-plugin-auto-external';
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
  plugins: [
    typescript2(),
    json(),
    autoExternal({ dependencies: false, peerDependencies: true }),
    commonjs(),
  ],
};

export default config;
