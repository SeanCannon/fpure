import { curry } from '../function/curry';
export const min = curry((a: number, b: number): number => a < b ? a : b);
