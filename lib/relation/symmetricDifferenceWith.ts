import { curry } from '../function/curry';
export const symmetricDifferenceWith = curry(<A>(pred: (a: A, b: A) => boolean, list1: A[], list2: A[]): A[] => [
  ...list1.filter(a => !list2.some(b => pred(a, b))),
  ...list2.filter(a => !list1.some(b => pred(a, b))),
]);
