const fs = require('fs');

/**
 * Attempts to determine the TypeScript config to use for Jest. This'll first
 * look for a `tsconfig-jest.json` file in the root of a project. Otherwise,
 * it'll fallback to using the default config file provided by the `build-tools`
 * package.
 */
function resolveTsConfigForJest() {
  try {
    if (fs.existsSync('./tsconfig-jest.json')) {
      return './tsconfig-jest.json';
    } else {
      return './node_modules/@vertexvis/jest-config-vertexvis/tsconfig.json';
    }
  } catch (e) {
    console.error(
      'Error reading project Jest config. Falling back to build-tools default'
    );
    return './node_modules/@vertexvis/jest-config-vertexvis/tsconfig.json';
  }
}

module.exports = {
  preset: 'ts-jest',
  collectCoverageFrom: ['**/src/**', '!**/src/__*__/**'],
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 75,
      lines: 75,
      statements: 75,
    },
  },
  testPathIgnorePatterns: [
    '<rootDir>/dist/',
    '<rootDir>/node_modules/',
    '<rootDir>/.rpt2_cache/',
  ],
  globals: {
    'ts-jest': {
      tsconfig: resolveTsConfigForJest(),
    },
  },
};
