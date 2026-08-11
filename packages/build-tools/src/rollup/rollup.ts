import * as Copyright from './copyright.js';
import * as External from './external.js';
import * as Input from './input.js';
import * as Output from './output.js';
import * as CommonJs from './resolve.js';
import type { PreRollupConfig, RollupConfig } from './types.js';
import * as Typescript from './typescript.js';

export const rollup = (preConfig: PreRollupConfig): RollupConfig =>
  // The order of the builders in this list will be the order that they
  // appear in the Rollup config plugin list. Plugins that need to be at
  // the end of that list should appear at the end of this list (e.g. minify)
  [
    CommonJs.builder(preConfig),
    Copyright.builder(preConfig),
    External.builder(preConfig),
    Input.builder(preConfig),
    Output.builder(preConfig),
    Typescript.builder(preConfig),
  ].reduce(
    (config: RollupConfig, builder) => {
      const partialConfig = builder(config);
      return {
        ...config,
        ...(partialConfig.input && { input: partialConfig.input }),
        ...(partialConfig.output && { output: partialConfig.output }),
        ...(partialConfig.plugins && {
          plugins: config.plugins
            ? [...config.plugins, ...partialConfig.plugins]
            : [...partialConfig.plugins],
        }),
        ...(partialConfig.external && {
          external: partialConfig.external,
        }),
      };
    },
    { plugins: [] }
  );
