import { curry } from '../function/curry';
export const hasPath = curry((path: string[], obj: unknown): boolean => {
  let cur: any = obj;
  for (const key of path) { if (cur == null || !(key in Object(cur))) return false; cur = cur[key]; }
  return true;
});
