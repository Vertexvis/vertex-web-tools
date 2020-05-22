require('@vertexvis/eslint-config-vertexvis-typescript/patch');

module.exports = {
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react'],
  extends: '@vertexvis/vertexvis-typescript',
  rules: {
    'react/jsx-uses-vars': 'error',
    'no-restricted-imports': [
      'error',
      {
        paths: [
          { name: 'lodash', message: 'Use lodash-es instead.' },
          { name: 'lodash-es', message: 'Use lodash-es submodules instead.' },
        ],
        patterns: ['lodash', 'lodash/*'],
      },
    ],
  },
};
