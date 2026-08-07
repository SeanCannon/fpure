import { curry } from '../function/curry';
export const sortWith = curry(<A>(comparators: Array<(a: A, b: A) => number>, arr: A[]): A[] => [...arr].sort((a, b) => {
  for (const cmp of comparators) { const result = cmp(a, b); if (result !== 0) return result; }
  return 0;
}));
