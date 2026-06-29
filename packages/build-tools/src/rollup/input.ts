import type { PreRollupConfig, RollupConfigBuilder } from './types.js';

/**
 * The `input` helper designates the entrypoint to Rollup.
 *
 * @see https://rollupjs.org/guide/en/#input
 */
export function input(input: string): Partial<PreRollupConfig> {
  return {
    input,
  };
}

export const builder = (preConfig: PreRollupConfig): RollupConfigBuilder => {
  return (config) => {
    if (preConfig.input != null) {
      return { input: preConfig.input };
    }

    return {};
  };
};
