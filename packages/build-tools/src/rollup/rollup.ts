import { PreRollupConfig, RollupConfig } from './types';
import * as AutoExternal from './autoExternal';
import * as CommonJs from './commonJs';
import * as Copyright from './copyright';
import * as External from './external';
import * as Input from './input';
import * as Minify from './minify';
import * as Output from './output';
import * as Typescript from './typescript';

export const rollup = (preConfig: PreRollupConfig): RollupConfig =>
  // The order of the builders in this list will be the order that they
  // appear in the Rollup config plugin list. Plugins that need to be at
  // the end of that list should appear at the end of this list (e.g. minify)
  [
    AutoExternal.builder(preConfig),
    CommonJs.builder(preConfig),
    Copyright.builder(preConfig),
    External.builder(preConfig),
    Input.builder(preConfig),
    Output.builder(preConfig),
    Typescript.builder(preConfig),
    Minify.builder(preConfig),
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
