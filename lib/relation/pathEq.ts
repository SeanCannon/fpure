import { curry } from '../function/curry';
export const pathEq = curry(<A>(target: any, pathArr: string[], obj: A): boolean => {
  let cur: any = obj;
  for (const key of pathArr) { if (cur == null) return false; cur = cur[key]; }
  return Object.is(cur, target);
});
