import { curry } from '../function/curry';
export const dissocPath = curry((ps: string[], o: Record<string, any>): Record<string, any> => {
  if (ps.length === 0) return o;
  const [k, ...rest] = ps;
  if (!(k in o)) return o;
  if (rest.length === 0) { const { [k]: _, ...rest2 } = o; return rest2; }
  return { ...o, [k]: dissocPath(rest, o[k]) };
});
