import { curry } from '../function/curry';
export const prop = curry(<K extends string, V>(k: K, o: Record<K, V>): V => o[k]);
