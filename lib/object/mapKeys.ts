import { curry } from '../function/curry';
export const mapKeys = curry(<K extends string, V>(fn: (key: K) => string, obj: Record<K, V>): Record<string, V> => {
  const result: Record<string, V> = {};
  for (const k in obj) if (Object.prototype.hasOwnProperty.call(obj, k)) result[fn(k)] = obj[k];
  return result;
});
