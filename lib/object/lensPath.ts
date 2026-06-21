import { lens } from './lens';
import { path } from './path';
import { assocPath } from './assocPath';
export const lensPath = (ps: string[]) => lens(
  (o: any) => path(ps, o),
  (v: any, o: any) => assocPath(ps, v, o)
);
