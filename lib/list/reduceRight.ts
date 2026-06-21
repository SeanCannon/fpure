import { curry } from '../function/curry';
export const reduceRight = curry(<A, B>(fn: (acc: B, a: A) => B, init: B, arr: A[]): B => arr.reduceRight(fn, init));
