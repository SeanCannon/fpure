import { curry } from '../function/curry';
export const mergeDeepLeft = curry(<A extends Record<string, any>, B extends Record<string, any>>(left: A, right: B): A & B => {
  const result: any = { ...left };
  for (const k of Object.keys(right)) {
    if (typeof left[k] === 'object' && left[k] !== null && !Array.isArray(left[k]) && typeof right[k] === 'object' && right[k] !== null && !Array.isArray(right[k]))
      result[k] = mergeDeepLeft(left[k], right[k]);
    else if (!(k in left)) result[k] = right[k];
  }
  return result;
});
