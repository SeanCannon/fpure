import { curry } from '../function/curry';
export const modifyPath = curry(<V, R>(path: string[], fn: (val: V) => R, obj: any): any => {
  if (path.length === 0) return fn(obj);
  const [head, ...rest] = path;
  return { ...obj, [head]: rest.length === 0 ? fn(obj[head]) : modifyPath(rest, fn, obj[head]) };
});
