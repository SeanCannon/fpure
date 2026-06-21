import { curry } from '../function/curry';
export const max = curry((a: number, b: number): number => a > b ? a : b);
