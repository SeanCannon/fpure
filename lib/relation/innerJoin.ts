import { curry } from '../function/curry';
export const innerJoin = curry(<A, B>(pred: (a: A, b: B) => boolean, list1: A[], list2: B[]): A[] => list1.filter(a => list2.some(b => pred(a, b))));
