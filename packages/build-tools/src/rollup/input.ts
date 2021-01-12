import { PreRollupConfig, RollupConfigBuilder } from './types';

/**
 * The `input` helper designates the entrypoint to Rollup.
 *
 * @see https://rollupjs.org/guide/en/#input
 */
// export const input = (input: string): RollupConfigBuilder =>
//   builder(inputConfig(input));

export const builder = (
  preConfig: PreRollupConfig
): RollupConfigBuilder => config =>
  preConfig.input != null ? { input: preConfig.input } : {};

export function input(input: string): Partial<PreRollupConfig> {
  return {
    input,
  };
}
