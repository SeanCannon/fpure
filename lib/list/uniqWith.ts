import { curry } from '../function/curry';
export const uniqWith = curry(<A>(fn: (a: A, b: A) => boolean, arr: A[]): A[] =>
  arr.filter((x, i) => !arr.slice(0, i).some(y => fn(x, y)))
);
