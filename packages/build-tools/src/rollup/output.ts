import { ModuleFormat, PreRollupConfig, RollupConfigBuilder } from './types';

interface Options {
  bundleName?: string;
  formats?: ModuleFormat[];
  sourcemaps?: boolean;
  name?: string;
  globals?: Record<string, string>;
}

/**
 * The `output()` helper defines the module formats that should be generated.
 * Supports formats include: `amd`, `cjs`, `commonjs`, `es`, `esm`, `iife`,
 * `module`, `system`, and `umd`.
 *
 * By default, this helper will include `cjs` and `esm` formats with sourcemaps.
 */
export function output({
  bundleName = 'bundle',
  formats = ['cjs', 'esm'],
  sourcemaps = true,
  name,
  globals,
}: Options = {}): Partial<PreRollupConfig> {
  return {
    ...formats.reduce(
      (partialConfig, format) =>
        format
          ? {
              ...partialConfig,
              output: [
                ...(partialConfig.output || []),
                {
                  file: `dist/${bundleName}.${format}.js`,
                  format,
                  sourcemap: sourcemaps,
                  name,
                  globals,
                },
              ],
            }
          : partialConfig,
      {
        output: [],
      }
    ),
  };
}

export const builder =
  (preConfig: PreRollupConfig): RollupConfigBuilder =>
  (config) =>
    preConfig.output != null ? { output: preConfig.output } : {};
