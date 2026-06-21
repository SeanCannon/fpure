import { curry } from '../function/curry';
export const zipWith = curry(<A, B, C>(fn: (a: A, b: B) => C, a: A[], b: B[]): C[] =>
  a.slice(0, b.length).map((x, i) => fn(x, b[i]))
);
