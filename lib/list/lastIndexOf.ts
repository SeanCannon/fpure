import { curry } from '../function/curry';
export const lastIndexOf = curry(<A>(value: A, arr: A[]): number => arr.lastIndexOf(value));