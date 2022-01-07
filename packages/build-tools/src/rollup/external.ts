import fs from 'fs';
import path from 'path';

import { PreRollupConfig, RollupConfig, RollupConfigBuilder } from './types';

interface ExternalOptions {
  /**
   * Indicates that all modules in the `dependencies` section of the
   * `package.json` should be excluded from the bundle. Defaults to `false`.
   */
  dependencies?: boolean;

  /**
   * Indicates that all modules in the `peerDependencies` section of the
   * `package.json` should be excluded from the bundle. Defaults to `true`.
   */
  peerDependencies?: boolean;

  /**
   * Modules that should be marked as external.
   */
  modules?: RollupConfig['external'];

  /**
   * A path to the `package.json`. If omitted, will use the `package.json` in
   * the current working directory.
   */
  packageJsonPath?: string;
}

/**
 * The `external` helper allows to define modules that should be marked as
 * external.
 *
 * @see https://rollupjs.org/guide/en/#external
 */
export function external({
  dependencies = false,
  peerDependencies = true,
  modules = [],
  packageJsonPath = path.resolve(process.cwd(), 'package.json'),
}: ExternalOptions = {}): Partial<PreRollupConfig> {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

  const mods = Array.isArray(modules) ? modules.flat() : [modules];
  const deps = dependencies ? Object.keys(packageJson.dependencies ?? {}) : [];
  const peerDeps = peerDependencies
    ? Object.keys(packageJson.peerDependencies ?? {})
    : [];
  const externalModules = [...mods, ...deps, ...peerDeps];

  return {
    external: externalModules,
  };
}

export const builder =
  (preConfig: PreRollupConfig): RollupConfigBuilder =>
  () =>
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
