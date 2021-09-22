import * as AutoExternal from './autoExternal';
import { rollup } from './rollup';
import { PreRollupConfig, RollupConfig } from './types';

/**
 * The `config` helper performs a shallow merge on the result of each provided RollupConfigBuilder
 * function after providing the current configuration state, and returns the merged configuration.
 *
 * ```ts
 * import { config, input, typescript, minify, output } from '@vertexvis/build-tools';
 *
 * export default config(
 *   input('src/index.ts'),
 *   typescript(),
 *   output('cjs', 'esm'),
 *   minify()
 * )
 * ```
 *
 * By default, the returned Rollup configuration will include any packages
 * marked as an NPM dependency into the bundle. Any packages labeled as a
 * `devDependencies` will be marked as external and will not be included in the
 * bundle.
 *
 * If you'd like to use a Rollup plugin that is not included in this project,
 * pass a function that returns an array including your plugin to `config()`.
 *
 * ```ts
 * import { config } from '@vertexvis/build-tools';
 * import babel from 'rollup-plugin-babel';
 *
 * export default config(() => ({ plugins: [babel()] }));
 * ```
 */
export const config = (
  ...preConfigDefinitions: Array<Partial<PreRollupConfig>>
): RollupConfig => rollup(defineConfig(...preConfigDefinitions));

export const defineConfig = (
  ...preConfigDefinitions: Array<Partial<PreRollupConfig>>
): PreRollupConfig =>
  buildPreConfig(AutoExternal.autoExternal(), ...preConfigDefinitions);

const buildPreConfig = (
  ...preConfigDefinitions: Array<Partial<PreRollupConfig>>
): PreRollupConfig =>
  preConfigDefinitions.reduce(
    (config: PreRollupConfig, partial) => {
      return {
        ...config,
        ...(partial.input && { input: partial.input }),
        ...(partial.output && { output: partial.output }),
        ...(partial.plugins && {
          plugins: mergePlugins(config.plugins || [], partial.plugins),
        }),
        ...(partial.external && {
          external: partial.external,
        }),
      };
    },
    { plugins: {} }
  );

/* eslint-disable @typescript-eslint/no-explicit-any */
const mergePlugins = (
  existing: Record<string, any>,
  added: Record<string, any>
): Record<string, any> =>
  Object.keys(existing)
    .concat(Object.keys(added).filter((key) => existing[key] == null))
    .reduce((plugins, key) => {
      return {
        ...plugins,
        [key]:
          plugins[key] != null
            ? { ...plugins[key], ...added[key] }
            : added[key],
      };
    }, existing);
/* eslint-enable @typescript-eslint/no-explicit-any */
