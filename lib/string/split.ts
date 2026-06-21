import { curry } from '../function/curry';
export const split = curry((sep: string | RegExp, s: string): string[] => s.split(sep));
