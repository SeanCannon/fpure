import { curry } from '../function/curry';
export const cond = curry(<T, U>(pairs: Array<[(x: T) => boolean, (x: T) => U]>, value: T): U | undefined => {
  for (const [pred, fn] of pairs) if (pred(value)) return fn(value);
  return undefined;
});
