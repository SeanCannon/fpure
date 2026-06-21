import { curry } from '../function/curry';
export const forEach = curry(<A>(fn: (a: A) => void, arr: A[]): A[] => (arr.forEach(fn), arr));
