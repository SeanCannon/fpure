import { curry } from '../function/curry';

export const pathSatisfies = curry(<A>(pred: (a: unknown) => boolean, path: string[], obj: A): boolean => {
  let val: any = obj;
  for (const key of path) { if (val == null) return false; val = val[key]; }
  return pred(val);
});
