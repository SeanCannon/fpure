import { curry } from '../function/curry';
export const repeat = curry(<A>(x: A, n: number): A[] => Array(n).fill(x));
