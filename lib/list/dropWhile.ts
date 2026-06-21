import { curry } from '../function/curry';
export const dropWhile = curry(<A>(fn: (a: A) => boolean, arr: A[]): A[] => {
  let i = 0;
  while (i < arr.length && fn(arr[i])) i++;
  return arr.slice(i);
});
