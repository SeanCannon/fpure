import { curry } from '../function/curry';
export const unionWith = curry(<A>(pred: (a: A, b: A) => boolean, list1: A[], list2: A[]): A[] => {
  const result = [...list1];
  for (const a of list2) if (!result.some(b => pred(a, b))) result.push(a);
  return result;
});
