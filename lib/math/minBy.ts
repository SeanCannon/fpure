import { curry } from '../function/curry';
export const minBy = curry(<A>(fn: (x: A) => number, a: A, b: A): A => fn(a) < fn(b) ? a : b);
