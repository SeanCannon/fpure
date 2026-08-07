import { curry } from '../function/curry';
export const symmetricDifference = curry(<A>(list1: A[], list2: A[]): A[] => [
  ...list1.filter(a => !list2.includes(a)),
  ...list2.filter(a => !list1.includes(a)),
]);
