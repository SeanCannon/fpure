import { curry } from '../function/curry';
export const dropRepeatsWith = curry(<A>(eq: (a: A, b: A) => boolean, arr: A[]): A[] => arr.filter((x, i) => i === 0 || !eq(x, arr[i - 1])));