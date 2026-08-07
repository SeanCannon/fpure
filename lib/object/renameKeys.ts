import { curry } from '../function/curry';
export const renameKeys = curry(<K extends string, V>(keyMap: Record<string, string>, obj: Record<K, V>): Record<string, V> => {
  const result: Record<string, V> = {};
  for (const k in obj) if (Object.prototype.hasOwnProperty.call(obj, k)) result[keyMap[k] || k] = obj[k];
  return result;
});
