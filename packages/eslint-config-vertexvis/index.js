import prettierRecommended from 'eslint-plugin-prettier/recommended';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

export default [
  prettierRecommended,
  {
    languageOptions: {
      ecmaVersion: 2015,
      sourceType: 'module',
    },
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      eqeqeq: [2, 'smart'],
      'func-call-spacing': 'off',
      indent: ['error', 2],
      'lines-between-class-members': [
        'error',
        'always',
        { exceptAfterSingleLine: true },
      ],
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: 'function', next: 'function' },
        { blankLine: 'always', prev: 'class', next: 'class' },
        {
          blankLine: 'always',
          prev: 'import',
          next: ['export', 'class', 'function', 'const', 'let', 'var'],
        },
      ],
      'prettier/prettier': 'error',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      yoda: 2,
    },
  },
];
