import { curry } from '../function/curry';
export const whereEq = curry((spec: Record<string, any>, o: Record<string, any>): boolean =>
  Object.entries(spec).every(([k, v]) => k in o && o[k] === v)
);
