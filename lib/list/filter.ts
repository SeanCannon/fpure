import { curry } from '../function/curry';
export const filter = curry(<A>(fn: (a: A) => boolean, arr: A[]): A[] => arr.filter(fn));
