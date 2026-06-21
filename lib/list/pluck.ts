import { curry } from '../function/curry';
export const pluck = curry(<K extends keyof any>(k: K, arr: Record<K, any>[]): any[] => arr.map(x => x[k]));
