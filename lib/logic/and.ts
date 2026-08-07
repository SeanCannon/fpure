import { curry } from '../function/curry';
export const and = curry(<A, B>(a: A, b: B): A | B => (!a ? a : b));
