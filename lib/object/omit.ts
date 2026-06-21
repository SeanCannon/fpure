import { curry } from '../function/curry';
export const omit = curry(<K extends string>(ks: K[], o: Record<K, any>): Record<string, any> => {
  const result = { ...o };
  for (const k of ks) delete result[k];
  return result;
});
