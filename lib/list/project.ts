import { curry } from '../function/curry';
export const project = curry(<K extends keyof any>(ks: K[], arr: Record<K, any>[]): Record<K, any>[] =>
  arr.map(x => ks.reduce((acc, k) => ({ ...acc, [k]: x[k] }), {} as Record<K, any>))
);
