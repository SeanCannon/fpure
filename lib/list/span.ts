import { curry } from '../function/curry';
export const span = curry(<A>(fn: (a: A) => boolean, arr: A[]): [A[], A[]] => {
  const i = arr.findIndex(x => !fn(x));
  return i === -1 ? [arr, []] : [arr.slice(0, i), arr.slice(i)];
});
