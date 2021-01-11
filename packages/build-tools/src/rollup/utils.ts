import { RollupConfigBuilder } from './types';

export function merge(
  builderResults: RollupConfigBuilder[]
): RollupConfigBuilder[] {
  const merged = builderResults.reduce(
    (results: Record<string, RollupConfigBuilder>, r) => ({
      ...results,
      [r.name]:
        results[r.name] != null && results[r.name].options != null
          ? {
              ...results[r.name],
              options: {
                ...results[r.name].options,
                ...r.options,
              },
            }
          : r,
    }),
    {}
  );

  return Object.keys(merged).map(key => merged[key]);
}
