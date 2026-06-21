import { curry } from '../function/curry';
export const props = curry(<K extends string>(ks: K[], o: Record<K, any>): any[] => ks.map(k => o[k]));
