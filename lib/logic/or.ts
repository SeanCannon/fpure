import { curry } from '../function/curry';
export const or = curry(<A, B>(a: A, b: B): A | B => (a ? a : b));
