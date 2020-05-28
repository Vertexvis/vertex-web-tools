import { RollupConfigBuilder } from '@vertexvis/build-tools';
import { vertexCopyright } from '../plugin';

/**
 * Adds the provided `copyrightString` to the bundle after minification.
 * See the {@link banner} plugin for how this gets added.
 *
 * If no `copyrightString` is provided, a default copyright of
 * `© Copyright <Current Year> Vertex Software LLC. All rights reserved.` will be added.
 */
export default (copyrightString?: string): RollupConfigBuilder => {
  return config => {
    return {
      plugins: [vertexCopyright(copyrightString)],
    };
  };
};