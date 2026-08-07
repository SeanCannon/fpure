import { curry } from '../function/curry';
export const pair = curry(<A, B>(a: A, b: B): [A, B] => [a, b]);