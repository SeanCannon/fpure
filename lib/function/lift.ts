import { curry } from './curry';
export const lift = curry(<A, B, C>(fn: (a: A, b: B) => C, arr1: A[], arr2: B[]): C[] => {
  const result: C[] = [];
  for (const a of arr1) for (const b of arr2) result.push(fn(a, b));
  return result;
});
