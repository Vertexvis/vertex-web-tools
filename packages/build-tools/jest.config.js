import jestConfig from '@vertexvis/jest-config-vertexvis/jest.config';

export default {
  ...jestConfig,
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
      tsconfig: 'tsconfig.json',
    },
  },
};
