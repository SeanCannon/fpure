import { curry } from '../function/curry';
export const findLastIndex = curry(<A>(fn: (a: A) => boolean, arr: A[]): number => {
  for (let i = arr.length - 1; i >= 0; i--) if (fn(arr[i])) return i;
  return -1;
});
