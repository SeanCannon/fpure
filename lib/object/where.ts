import { curry } from '../function/curry';
export const where = curry((spec: Record<string, (v: any) => boolean>, o: Record<string, any>): boolean =>
  Object.entries(spec).every(([k, fn]) => k in o && fn(o[k]))
);
