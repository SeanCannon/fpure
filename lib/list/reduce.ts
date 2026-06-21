import { curry } from '../function/curry';
export const reduce = curry(<A, B>(fn: (acc: B, a: A) => B, init: B, arr: A[]): B => arr.reduce(fn, init));
