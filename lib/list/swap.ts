import { curry } from '../function/curry';
export const swap = curry(<A>(i: number, j: number, arr: A[]): A[] => {
  const result = [...arr];
  [result[i], result[j]] = [result[j], result[i]];
  return result;
});