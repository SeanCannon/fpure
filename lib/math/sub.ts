import { curry } from '../function/curry';
export const sub = curry((a: number, b: number): number => b - a);
