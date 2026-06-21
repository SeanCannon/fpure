import { curry } from '../function/curry';
export const uniqBy = curry(<A, B>(fn: (x: A) => B, arr: A[]): A[] => {
  const seen = new Set<B>();
  return arr.filter(x => { const k = fn(x); return seen.has(k) ? false : (seen.add(k), true); });
});
