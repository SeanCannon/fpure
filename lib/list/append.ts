import { curry } from '../function/curry';
export const append = curry(<A>(x: A, arr: A[]): A[] => [...arr, x]);
