import { curry } from '../function/curry';
export const splitWhen = curry(<A>(pred: (a: A) => boolean, arr: A[]): [A[], A[]] => {
  const idx = arr.findIndex(pred);
  return idx === -1 ? [arr, []] : [arr.slice(0, idx), arr.slice(idx)];
});