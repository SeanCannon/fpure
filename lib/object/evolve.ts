import { curry } from '../function/curry';
export const evolve = curry((transformations: Record<string, (v: any) => any>, o: Record<string, any>): Record<string, any> =>
  Object.entries(o).reduce((acc, [k, v]) => ({ ...acc, [k]: k in transformations ? transformations[k](v) : v }), {} as Record<string, any>)
);
