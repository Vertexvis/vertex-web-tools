import { RollupOptions, OutputOptions, ModuleFormat } from 'rollup';

export type RollupConfig = Omit<RollupOptions, 'output'> & {
  output?: OutputOptions | OutputOptions[];
};

export type RollupConfigBuilder = (config: RollupConfig) => RollupConfig;

export interface PreRollupConfig {
  external?: string[];
  input?: string | string[];
  output?: OutputOptions | OutputOptions[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  plugins?: Record<string, any>;
}

export { OutputOptions, ModuleFormat };
