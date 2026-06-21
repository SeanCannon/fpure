import { curry } from '../function/curry';
export const test = curry((pattern: RegExp, s: string): boolean => pattern.test(s));
