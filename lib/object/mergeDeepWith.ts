import { curry } from '../function/curry';
export const mergeDeepWith = curry(<A, B, C>(fn: (a: any, b: any) => any, left: A, right: B): any => {
  const result: any = {};
  const keys = new Set([...Object.keys(left || {}), ...Object.keys(right || {})]);
  for (const k of keys) {
    const lv = (left as any)?.[k], rv = (right as any)?.[k];
    if (lv !== undefined && rv !== undefined && typeof lv === 'object' && typeof rv === 'object' && !Array.isArray(lv) && !Array.isArray(rv)) result[k] = mergeDeepWith(fn, lv, rv);
    else if (rv !== undefined) result[k] = lv !== undefined ? fn(lv, rv) : rv;
    else result[k] = lv;
  }
  return result;
});
