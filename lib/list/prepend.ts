import { curry } from '../function/curry';
export const prepend = curry(<A>(x: A, arr: A[]): A[] => [x, ...arr]);
