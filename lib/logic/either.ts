import { curry } from '../function/curry';
export const either = curry(<A>(p: (a: A) => boolean, q: (a: A) => boolean, x: A): boolean => p(x) || q(x));
