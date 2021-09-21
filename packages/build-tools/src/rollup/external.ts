import { PreRollupConfig, RollupConfigBuilder } from './types';

/**
 * The `external` helper allows to explicitly define modules that should be
 * marked as external. In most cases, you should use the rules provided
 * `autoExternal()`.
 *
 * @see autoExternal
 * @see https://rollupjs.org/guide/en/#external
 */
export function external(
  ...externalDependencies: string[]
): Partial<PreRollupConfig> {
  return {
    external: externalDependencies,
  };
}

export const builder =
  (preConfig: PreRollupConfig): RollupConfigBuilder =>
  (config) =>
    preConfig.external != null
      ? {
          ...preConfig.external.reduce(
            (partialConfig, dependency) => ({
              ...partialConfig,
              external: [...partialConfig.external, dependency],
            }),
            { external: [] }
          ),
        }
      : {};
