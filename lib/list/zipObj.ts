import { curry } from '../function/curry';
export const zipObj = curry(<K extends string, V>(keys: K[], values: V[]): Record<K, V> =>
  keys.reduce((acc, k, i) => ({ ...acc, [k]: values[i] }), {} as Record<K, V>)
);
