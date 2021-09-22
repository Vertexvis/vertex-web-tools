import type { Plugin } from 'rollup';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { PreRollupConfig, RollupConfigBuilder } from './types';

interface AutoExternalPluginConfig {
  /**
   * Path to a package.json file or directory. Defaults to `process.cwd()`.
   */
  packagePath?: string;

  /**
   * Indicates if peer dependencies should be treated as external dependencies.
   * Defaults to `true`.
   */
  peerDependencies?: boolean;
}

/**
 * The `autoExternal` helper will automatically mark any peer dependencies as
 * external. These settings can be overridden by the provided `config` object.
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
        options?.peerDependencies === false
          ? { peerDependencies: false }
          : { ...options, peerDependencies: true },
    },
  };
}

export const builder =
  (preConfig: PreRollupConfig): RollupConfigBuilder =>
  (config) =>
    preConfig.plugins?.autoExternal?.peerDependencies === true
      ? {
          plugins: [
            peerDepsExternal({
              packageJsonPath: preConfig.plugins.autoExternal.packagePath,
            }) as Plugin,
          ],
        }
      : {};
