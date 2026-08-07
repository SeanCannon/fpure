import { curry } from '../function/curry';
export const complement = curry(<A>(f: (a: A) => boolean, x: A): boolean => !f(x));
