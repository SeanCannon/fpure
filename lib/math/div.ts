import { curry } from '../function/curry';
export const div = curry((a: number, b: number): number => b / a);
