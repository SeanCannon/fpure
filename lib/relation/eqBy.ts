import { curry } from '../function/curry';
export const eqBy = curry(<A, B>(fn: (a: A) => B, x: A, y: A): boolean => fn(x) === fn(y));
