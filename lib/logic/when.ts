import { curry } from '../function/curry';
export const when = curry(<A>(pred: (a: A) => boolean, fn: (a: A) => A, x: A): A => pred(x) ? fn(x) : x);
