import { curry } from '../function/curry';
export const omitBy = curry((fn: (v: any, k: string) => boolean, o: Record<string, any>): Record<string, any> =>
  Object.entries(o).reduce((acc, [k, v]) => (fn(v, k) ? acc : { ...acc, [k]: v }), {} as Record<string, any>)
);
