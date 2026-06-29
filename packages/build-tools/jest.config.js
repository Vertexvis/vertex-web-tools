import path from 'node:path';
import { fileURLToPath } from 'node:url';

import jestConfig from '@vertexvis/jest-config-vertexvis/jest.config';

const rootDir = path.dirname(fileURLToPath(import.meta.url));

export default {
  ...jestConfig,
  rootDir,
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
    '^@vertexvis/rollup-plugin-vertexvis-copyright$':
      '<rootDir>/../rollup-plugin-vertexvis-copyright/src/index.ts',
  },
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 60,
      lines: 60,
      statements: 60,
    },
  },
  globals: {
    'ts-jest': {
      tsconfig: path.join(rootDir, 'tsconfig.jest.json'),
    },
  },
};
