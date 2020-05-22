import { RollupConfigBuilder } from "./types";

/**
 * The `input` helper designates the entrypoint to Rollup.
 *
 * @see https://rollupjs.org/guide/en/#input
 */
export default (input: string): RollupConfigBuilder => {
  return config => ({ input });
};
