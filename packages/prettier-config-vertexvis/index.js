/**
 * Vertex's shared Prettier configuration.
 *
 * `trailingComma` is pinned to `es5` so that the value is stable regardless of
 * the installed Prettier version. Prettier 3 changed the default from `es5` to
 * `all`; pinning it here keeps Vertex's house style consistent across repos.
 *
 * @type {import('prettier').Config}
 */
export default {
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  printWidth: 90,
  singleAttributePerLine: false,
  trailingComma: 'es5',
};
