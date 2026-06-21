import { curry } from '../function/curry';
export const includes = curry(<A>(x: A, arr: A[]): boolean => arr.includes(x));
