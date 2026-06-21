import { curry } from '../function/curry';
export const assoc = curry(<K extends string, V>(k: K, v: V, o: Record<K, V>): Record<K, V> => ({ ...o, [k]: v }));
