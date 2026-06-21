import { curry } from '../function/curry';
export const maxBy = curry(<A>(fn: (x: A) => number, a: A, b: A): A => fn(a) > fn(b) ? a : b);
