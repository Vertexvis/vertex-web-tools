import vertexvisTypescript from '@vertexvis/eslint-config-vertexvis-typescript';

export default [
  {
    ignores: ['**/dist/**', '**/node_modules/**', '**/.rpt2_cache/**'],
  },
  ...vertexvisTypescript,
];
