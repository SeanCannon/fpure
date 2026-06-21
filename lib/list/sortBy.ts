import { curry } from '../function/curry';
export const sortBy = curry(<A, B>(fn: (x: A) => B, arr: A[]): A[] =>
  [...arr].sort((a, b) => (fn(a) < fn(b) ? -1 : fn(a) > fn(b) ? 1 : 0))
);
