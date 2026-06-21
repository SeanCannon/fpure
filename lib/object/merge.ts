import { curry } from '../function/curry';
export const merge = curry(<A extends Record<string, any>, B extends Record<string, any>>(a: A, b: B): A & B => ({ ...a, ...b }));
