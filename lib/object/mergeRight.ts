import { curry } from '../function/curry';
export const mergeRight = curry(<A extends Record<string, any>, B extends Record<string, any>>(a: A, b: B): A & B => ({ ...b, ...a }));
