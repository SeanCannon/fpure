export const fromPairs = <K extends string, V>(pairs: [K, V][]): Record<K, V> =>
  pairs.reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {} as Record<K, V>);
