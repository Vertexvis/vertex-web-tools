import typescript2 from 'rollup-plugin-typescript2';
import { PreRollupConfig, RollupConfigBuilder } from './types';

/**
 * The `typescript` helper is used to transpile TypeScript source files. This
 * helper expects a `tsconfig.json` in the root of the project. Internally, the
 * helper uses `rollup-plugin-typescript2`.
 *
 * @see https://github.com/ezolenko/rollup-plugin-typescript2
 */
export function typescript(): Partial<PreRollupConfig> {
  return {
    plugins: {
      typescript: {},
    },
  };
}

export const builder =
  (preConfig: PreRollupConfig): RollupConfigBuilder =>
  (config) =>
    preConfig.plugins?.typescript != null ? { plugins: [typescript2()] } : {};
