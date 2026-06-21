import { curry } from '../function/curry';
export const concat = curry(<A>(a: A[], b: A[]): A[] => a.concat(b));
