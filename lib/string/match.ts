import { curry } from '../function/curry';
export const match = curry((pattern: RegExp, s: string): RegExpMatchArray | null => s.match(pattern));
