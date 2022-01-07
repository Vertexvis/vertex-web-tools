import commonjs, { RollupCommonJSOptions } from '@rollup/plugin-commonjs';
import nodeResolve, {
  RollupNodeResolveOptions,
} from '@rollup/plugin-node-resolve';

import { PreRollupConfig, RollupConfigBuilder } from './types';

interface Options {
  commonjs?: RollupCommonJSOptions;
  resolve?: RollupNodeResolveOptions;
}

/**
 * The `resolve` helper resolves imports with the `@rollup/plugin-node-resolve`
 * and `@rollup/plugin-commonjs` plugins.
 */
export function resolve(options: Options = {}): Partial<PreRollupConfig> {
  return {
    plugins: {
      resolve: options,
    },
  };
}

export const builder =
  (preConfig: PreRollupConfig): RollupConfigBuilder =>
  () => {
    const opts = preConfig.plugins?.resolve;
    return opts != null
      ? {
          plugins: [commonjs(opts.commonjs), nodeResolve(opts.resolve)],
        }
      : {};
  };
