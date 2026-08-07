import { curry } from '../function/curry';
export const indexOf = curry(<A>(value: A, arr: A[]): number => arr.indexOf(value));