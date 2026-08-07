import { curry } from '../function/curry';
export const nth = curry(<A>(n: number, arr: A[]): A | undefined => (n >= 0 ? arr[n] : arr[arr.length + n]));