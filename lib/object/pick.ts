import { curry } from '../function/curry';
export const pick = curry(<K extends string>(ks: K[], o: Record<K, any>): Record<string, any> =>
  ks.reduce((acc, k) => (k in o ? { ...acc, [k]: o[k] } : acc), {} as Record<string, any>)
);
