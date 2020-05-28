import { RollupOptions, OutputOptions, ModuleFormat } from "rollup";

export type RollupConfig = Omit<RollupOptions, "output"> & {
  output?: OutputOptions | OutputOptions[];
};

export type RollupConfigBuilder = (config: RollupConfig) => RollupConfig;

export { OutputOptions, ModuleFormat };
