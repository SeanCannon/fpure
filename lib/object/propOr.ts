import { curry } from '../function/curry';
export const propOr = curry(<V>(def: V, k: string, o: Record<string, V>): V => (k in o ? o[k] : def));
