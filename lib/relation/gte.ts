import { curry } from '../function/curry';
export const gte = curry((a: number, b: number): boolean => b >= a);
