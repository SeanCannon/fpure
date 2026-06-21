import { curry } from '../function/curry';
export const lt = curry((a: number, b: number): boolean => b < a);
