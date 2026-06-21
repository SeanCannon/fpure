import { curry } from '../function/curry';
export const sort = curry(<A>(fn: (a: A, b: A) => number, arr: A[]): A[] => [...arr].sort(fn));
