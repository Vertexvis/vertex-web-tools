import { OutputOptions } from 'rollup';
import { terser } from 'rollup-plugin-terser';
import { ModuleFormat, PreRollupConfig, RollupConfigBuilder } from './types';

interface Options {
  /**
   * The name of the bundle used in the output file name. The outputted file
   * uses the following naming convention:
   * `[bundleName].[format].[minified].js`.
   */
  bundleName?: string;

  /**
   * The output format. Supported formats include `amd`, `cjs`, `commonjs`,
   * `es`, `esm`, `iife`, `module`, `system`, and `umd`.
   */
  formats?: ModuleFormat[];

  /**
   * Indicates if a sourcemap should be generated.
   */
  sourcemaps?: boolean;

  /**
   * By default, a non-minified version of the bundle will be generated. When
   * this is `true`, a minified bundle will be generated along with a
   * non-minified version.
   */
  minify?: boolean;

  /**
   * The global variable name for `iife` or `umd` bundles.
   */
  name?: string;

  /**
   * The global variable names used for imports when using `iife` or `umd`
   * bundles.
   *
   * @see https://rollupjs.org/guide/en/#outputglobals
   */
  globals?: Record<string, string>;
}

/**
 * The `output()` helper defines the module formats that should be generated.
 * Supports formats include: `amd`, `cjs`, `commonjs`, `es`, `esm`, `iife`,
 * `module`, `system`, and `umd`. By default, this helper will include `cjs` and
 * `esm` formats with sourcemaps.
 *
 * The outputted file name will have the following naming convention:
 * `dist/[bundleName].[format].[minified].js`.
 */
export function output({
  bundleName = 'bundle',
  formats = ['cjs', 'esm'],
  sourcemaps = true,
  minify = false,
  name,
  globals,
}: Options = {}): Partial<PreRollupConfig> {
  function getOutput(format: ModuleFormat, minified: boolean): OutputOptions {
    return {
      file: getFilename(bundleName, format, minified),
      format,
      sourcemap: sourcemaps,
      name,
      globals,
      plugins: minified ? [terser()] : [],
    };
  }

  return {
    ...formats.reduce(
      (partialConfig, format) => {
        const output = [getOutput(format, false)];

        if (minify) {
          output.push(getOutput(format, true));
        }

        return format
          ? {
              ...partialConfig,
              output: [...(partialConfig.output || []), ...output],
            }
          : partialConfig;
      },
      {
        output: [],
      }
    ),
  };
}

function getFilename(
  bundleName: string,
  format: string,
  minified: boolean
): string {
  return minified
    ? `dist/${bundleName}.${format}.min.js`
    : `dist/${bundleName}.${format}.js`;
}

export const builder =
  (preConfig: PreRollupConfig): RollupConfigBuilder =>
  (config) =>
    preConfig.output != null ? { output: preConfig.output } : {};
