import { curry } from '../function/curry';
export const dropRepeatsBy = curry(<A>(fn: (a: A) => unknown, arr: A[]): A[] => arr.filter((x, i) => i === 0 || fn(x) !== fn(arr[i - 1])));