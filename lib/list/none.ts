import { curry } from '../function/curry';
export const none = curry(<A>(fn: (a: A) => boolean, arr: A[]): boolean => !arr.some(fn));
