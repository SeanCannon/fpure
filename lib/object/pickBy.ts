import { curry } from '../function/curry';
export const pickBy = curry((fn: (v: any, k: string) => boolean, o: Record<string, any>): Record<string, any> =>
  Object.entries(o).reduce((acc, [k, v]) => (fn(v, k) ? { ...acc, [k]: v } : acc), {} as Record<string, any>)
);
