import autoExternal from './autoExternal';
import { merge } from './utils';
import { RollupConfig, RollupConfigBuilder } from './types';

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
export default (...configBuilders: RollupConfigBuilder<any>[]): RollupConfig =>
  buildConfig(autoExternal(), ...configBuilders);

const buildConfig = (
  ...configBuilders: RollupConfigBuilder<any>[]
): RollupConfig =>
  merge(configBuilders).reduce(
    (config: RollupConfig, builder) => {
      const partialConfig = builder.fn(config, builder.options);
      return {
        ...config,
        ...(partialConfig.input && { input: partialConfig.input }),
        ...(partialConfig.output && { output: partialConfig.output }),
        ...(partialConfig.plugins && {
          plugins: config.plugins
            ? [...config.plugins, ...partialConfig.plugins]
            : [...partialConfig.plugins],
        }),
        ...(partialConfig.external && {
          external: partialConfig.external,
        }),
      };
    },
    { plugins: [] }
  );
