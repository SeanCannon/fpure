import { curry } from '../function/curry';
export const scan = curry(<A, B>(fn: (acc: A, x: B) => A, init: A, arr: B[]): A[] => {
  const result: A[] = [init];
  for (const x of arr) result.push(fn(result[result.length - 1], x));
  return result;
});