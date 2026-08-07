import { curry } from '../function/curry';
export const unless = curry(<A>(pred: (a: A) => boolean, fn: (a: A) => A, x: A): A => pred(x) ? x : fn(x));
