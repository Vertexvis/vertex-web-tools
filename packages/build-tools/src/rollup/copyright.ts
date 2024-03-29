import { copyright as copyrightPlugin } from '@vertexvis/rollup-plugin-vertexvis-copyright';

import { PreRollupConfig, RollupConfigBuilder } from './types';

/**
 * Adds the provided `copyrightString` to the bundle after minification.
 * See the {@link banner} plugin for how this gets added.
 *
 * If no `copyrightString` is provided, a default copyright of
 * `© Copyright <Current Year> Vertex Software LLC. All rights reserved.` will be added.
 */
export function copyright(copyrightString?: string): Partial<PreRollupConfig> {
  return {
    plugins: {
      copyright: copyrightString,
    },
  };
}

export const builder =
  (preConfig: PreRollupConfig): RollupConfigBuilder =>
  (config) =>
    preConfig.plugins?.copyright != null
      ? { plugins: [copyrightPlugin(preConfig.plugins.copyright)] }
      : {};
