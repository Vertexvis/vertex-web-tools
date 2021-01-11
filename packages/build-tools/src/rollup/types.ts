import { RollupOptions, OutputOptions, ModuleFormat } from 'rollup';

export type RollupConfig = Omit<RollupOptions, 'output'> & {
  output?: OutputOptions | OutputOptions[];
};

export interface RollupConfigBuilder<T = Record<string, any>> {
  name: string;
  options?: T;
  fn: (config: RollupConfig, options?: T) => RollupConfig;
}

export { OutputOptions, ModuleFormat };
