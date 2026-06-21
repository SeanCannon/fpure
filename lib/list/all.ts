import { curry } from '../function/curry';
export const all = curry(<A>(fn: (a: A) => boolean, arr: A[]): boolean => arr.every(fn));
