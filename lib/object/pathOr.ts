import { curry } from '../function/curry';
import { path } from './path';
export const pathOr = curry((def: any, ps: string[], o: object): any => {
  const v = path(ps, o);
  return v === undefined ? def : v;
});
