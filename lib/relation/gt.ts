import { curry } from '../function/curry';
export const gt = curry((a: number, b: number): boolean => b > a);
