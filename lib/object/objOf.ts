import { curry } from '../function/curry';
export const objOf = curry(<K extends string, V>(key: K, val: V): Record<K, V> => ({ [key]: val } as Record<K, V>));
