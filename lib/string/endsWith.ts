import { curry } from '../function/curry';
export const endsWith = curry((search: string, s: string): boolean => s.endsWith(search));
