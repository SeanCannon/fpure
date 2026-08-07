import { curry } from '../function/curry';
export const xprod = curry(<A, B>(arr1: A[], arr2: B[]): [A, B][] => {
  const result: [A, B][] = [];
  for (const a of arr1) for (const b of arr2) result.push([a, b]);
  return result;
});