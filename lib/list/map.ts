import { curry } from '../function/curry';
export const map = curry(<A, B>(fn: (a: A) => B, arr: A[]): B[] => arr.map(fn));
