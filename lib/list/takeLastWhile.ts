import { curry } from '../function/curry';
export const takeLastWhile = curry(<A>(fn: (a: A) => boolean, arr: A[]): A[] => {
  let i = arr.length - 1;
  while (i >= 0 && fn(arr[i])) i--;
  return arr.slice(i + 1);
});