import { curry } from '../function/curry';
export const both = curry(<A>(p: (a: A) => boolean, q: (a: A) => boolean, x: A): boolean => p(x) && q(x));
