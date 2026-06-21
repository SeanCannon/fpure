import { curry } from '../function/curry';
export const any = curry(<A>(fn: (a: A) => boolean, arr: A[]): boolean => arr.some(fn));
