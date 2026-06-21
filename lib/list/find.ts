import { curry } from '../function/curry';
export const find = curry(<A>(fn: (a: A) => boolean, arr: A[]): A | undefined => arr.find(fn));
