import { curry } from '../function/curry';
export const mergeDeepRight = curry((l: Record<string, any>, r: Record<string, any>): Record<string, any> => {
  const result = { ...l, ...r };
  for (const k of Object.keys(l))
    if (k in r && typeof l[k] === 'object' && l[k] !== null && typeof r[k] === 'object' && r[k] !== null && !Array.isArray(l[k]) && !Array.isArray(r[k]))
      result[k] = mergeDeepRight(l[k], r[k]);
  return result;
});
