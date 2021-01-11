import autoExternalPlugin from 'rollup-plugin-auto-external';
import { RollupConfigBuilder } from './types';

interface AutoExternalPluginConfig {
  builtins?: boolean;
  dependencies?: boolean;
  packagePath?: string;
  peerDependencies?: boolean;
}

/**
 * The `autoExternal` helper will automatically include any packages marked as a
 * dependency into the bundle, and mark any peer dependencies as external. These
 * settings can be overridden by the provided `config` object.
 *
 * Consuming projects are expected to include any packages marked as peer
 * dependencies.
 */
export default (
  options?: AutoExternalPluginConfig
): RollupConfigBuilder<AutoExternalPluginConfig> => {
  return {
    name: 'autoExternal',
    options,
    fn: config => {
      return {
        plugins: [
          options != null
            ? autoExternalPlugin({
                ...options,
                packagePath: options.packagePath || process.cwd(),
              })
            : autoExternalPlugin({
                packagePath: process.cwd(),
                dependencies: false,
                peerDependencies: true,
              }),
        ],
      };
    },
  };
};
