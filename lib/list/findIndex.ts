import { curry } from '../function/curry';
export const findIndex = curry(<A>(fn: (a: A) => boolean, arr: A[]): number => arr.findIndex(fn));
