import { curry } from '../function/curry';
export const chain = curry(<A, B>(fn: (a: A) => B[], arr: A[]): B[] => arr.flatMap(fn));
