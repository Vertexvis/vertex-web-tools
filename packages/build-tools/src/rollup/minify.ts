import { terser, Options } from 'rollup-plugin-terser';
import { PreRollupConfig, RollupConfigBuilder } from './types';
import * as path from 'path';

/**
 * Returns a new file path where the minified output should be written. Result
 * will be returned in the following structure:
 * `some/dir/bundleName.format.min.js`.
 */
function minifiedFilePath(filePath: string): string {
  const directory = path.dirname(filePath);
  const ext = path.extname(filePath);
  const basename = path.basename(filePath, ext);
  const minifiedBasename = `${basename}.min${ext}`;
  return path.join(directory, minifiedBasename);
}

/**
 * The `minify()` helper applies a minification process on the resulting
 * bundles. This helper uses `rollup-plugin-terser` internally.
 *
 * @see https://github.com/TrySound/rollup-plugin-terser
 */
export function minify(
  options?: Options,
  onlyMinFiles = false
): Partial<PreRollupConfig> {
  return {
    plugins: {
      minify: {
        options,
        onlyMinFiles,
      },
    },
  };
}

export const builder = (
  preConfig: PreRollupConfig
): RollupConfigBuilder => config => {
  if (preConfig.plugins?.minify == null) {
    return {};
  }

  const { options, onlyMinFiles } = preConfig.plugins.minify;
  const plugins = [terser({ include: /^.+\.min\.js$/, ...options })];

  if (config.output != null) {
    const output =
      config.output instanceof Array
        ? [
            ...(onlyMinFiles ? [] : config.output),
            ...config.output.map(entry => {
              return {
                ...entry,
                file:
                  entry.file != null ? minifiedFilePath(entry.file) : undefined,
              };
            }),
          ]
        : [
            ...(onlyMinFiles ? [] : [config.output]),
            {
              ...config.output,
              file:
                config.output != null && config.output.file != null
                  ? minifiedFilePath(config.output.file)
                  : undefined,
            },
          ];

    return {
      output,
      plugins,
    };
  }

  return {
    plugins,
  };
};
