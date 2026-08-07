import { curry } from '../function/curry';
export const unwind = curry(<K extends string>(key: K, obj: Record<K, any>): any[] => {
  const arr = obj[key];
  if (!Array.isArray(arr)) return [obj];
  return arr.map((val: any) => ({ ...obj, [key]: val }));
});
