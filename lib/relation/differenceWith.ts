import { curry } from '../function/curry';
export const differenceWith = curry(<A>(pred: (a: A, b: A) => boolean, list1: A[], list2: A[]): A[] => list1.filter(a => !list2.some(b => pred(a, b))));
