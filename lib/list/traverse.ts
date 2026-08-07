import { curry } from '../function/curry';
export const traverse = curry(<A, B>(fn: (a: A) => B[], arr: A[]): B[][] => {
  const result = arr.map(fn);
  return result[0]?.map((_, i) => result.map(r => r[i])) ?? [];
});