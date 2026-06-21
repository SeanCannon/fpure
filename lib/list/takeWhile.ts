import { curry } from '../function/curry';
export const takeWhile = curry(<A>(fn: (a: A) => boolean, arr: A[]): A[] => {
  for (let i = 0; i < arr.length; i++) if (!fn(arr[i])) return arr.slice(0, i);
  return arr;
});
