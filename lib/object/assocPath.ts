import { curry } from '../function/curry';
export const assocPath = curry((ps: string[], v: any, o: Record<string, any>): Record<string, any> => {
  if (ps.length === 0) return v;
  const [k, ...rest] = ps;
  return { ...o, [k]: rest.length ? assocPath(rest, v, ((o as any)[k] ?? {})) : v };
});
