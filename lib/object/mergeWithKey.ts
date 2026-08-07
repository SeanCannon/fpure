import { curry } from '../function/curry';
export const mergeWithKey = curry(<A, B, C>(fn: (k: string, a: any, b: any) => any, left: A, right: B): any => {
  const result: any = { ...left, ...right };
  for (const k in right) if (k in (left as any)) result[k] = fn(k, (left as any)[k], (right as any)[k]);
  return result;
});
