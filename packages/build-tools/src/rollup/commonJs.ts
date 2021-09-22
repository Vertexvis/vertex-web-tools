import commonjs, { RollupCommonJSOptions } from '@rollup/plugin-commonjs';
import resolve, { RollupNodeResolveOptions } from '@rollup/plugin-node-resolve';
import { PreRollupConfig, RollupConfigBuilder } from './types';

interface Options {
  commonjs?: RollupCommonJSOptions;
  nodeResolve?: RollupNodeResolveOptions;
}

/**
 * The `commonJs` helper converts CommonJS modules to ES6, so they can be used
 * by Rollup. Internally this helper uses `@rollup/plugin-commonjs`.
 *
 * There are situations where Rollup is not able to infer named exports from a
 * CommonJS module. When this happens, Rollup will exit with an error and you'll
 * need to provide a mapping.
 *
 * ```ts
 * import { config, commonJs} from '@vertexvis/build-tools';
 *
 * export default config(
 *   commonJs({
 *     namedExports: { uuid: ['v1'] }
 *   })
 * )
 * ```
 *
 * @see https://github.com/rollup/plugins/tree/master/packages/commonjs
 */
export function commonJs(options: Options = {}): Partial<PreRollupConfig> {
  return {
    plugins: {
      commonJs: options,
    },
  };
}

export const builder =
  (preConfig: PreRollupConfig): RollupConfigBuilder =>
  (config) =>
    preConfig.plugins?.commonJs != null
      ? {
          plugins: [
            commonjs(preConfig.plugins.commonJs.commonjs),
            resolve(preConfig.plugins.commonJs.nodeResolve),
          ],
        }
      : {};
