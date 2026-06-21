import { curry } from '../function/curry';
export const findLast = curry(<A>(fn: (a: A) => boolean, arr: A[]): A | undefined => [...arr].reverse().find(fn));
