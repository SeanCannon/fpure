import { curry } from '../function/curry';
export const join = curry((sep: string, arr: string[]): string => arr.join(sep));
