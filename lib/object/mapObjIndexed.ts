import { curry } from '../function/curry';
export const mapObjIndexed = curry(<K extends string, V, R>(fn: (val: V, key: K, obj: Record<K, V>) => R, obj: Record<K, V>): Record<K, R> => {
  const result: Record<K, R> = {} as Record<K, R>;
  for (const k in obj) if (Object.prototype.hasOwnProperty.call(obj, k)) result[k] = fn(obj[k], k, obj);
  return result;
});
