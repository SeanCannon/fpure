import { curry } from '../function/curry';
export const pickAll = curry(<K extends string, V>(keys: K[], obj: Record<K, V>): Record<K, V | undefined> => {
  const result: Record<string, V | undefined> = {};
  for (const k of keys) result[k] = obj[k];
  return result;
});
