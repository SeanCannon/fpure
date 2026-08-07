import { curry } from '../function/curry';
export const reduceBy = curry(<A, V>(fn: (acc: V, x: A) => V, init: V, keyFn: (a: A) => string, arr: A[]): Record<string, V> => {
  const result: Record<string, V> = {};
  for (const x of arr) { const k = keyFn(x); result[k] = result[k] === undefined ? fn(init, x) : fn(result[k], x); }
  return result;
});