import {
  InputPluginOption,
  ModuleFormat,
  OutputOptions,
  RollupOptions,
} from 'rollup';

export type RollupConfig = Omit<RollupOptions, 'output' | 'plugins'> & {
  output?: OutputOptions | OutputOptions[];
  plugins?: InputPluginOption[];
};

export type RollupConfigBuilder = (config: RollupConfig) => RollupConfig;

export interface PreRollupConfig {
  external?: RollupConfig['external'][];
  input?: string | string[];
  output?: OutputOptions | OutputOptions[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  plugins?: Record<string, any>;
}

export { InputPluginOption, ModuleFormat, OutputOptions };
