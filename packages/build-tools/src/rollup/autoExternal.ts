import autoExternalPlugin from 'rollup-plugin-auto-external';
import { PreRollupConfig, RollupConfigBuilder } from './types';

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
export function autoExternal(
  options?: AutoExternalPluginConfig
): Partial<PreRollupConfig> {
  return {
    plugins: {
      autoExternal:
        options != null
          ? {
              packagePath: process.cwd(),
              ...options,
            }
          : {
              packagePath: process.cwd(),
              dependencies: false,
              peerDependencies: true,
            },
    },
  };
}

export const builder =
  (preConfig: PreRollupConfig): RollupConfigBuilder =>
  (config) =>
    preConfig.plugins?.autoExternal != null
      ? {
          plugins: [autoExternalPlugin(preConfig.plugins.autoExternal)],
        }
      : {};
