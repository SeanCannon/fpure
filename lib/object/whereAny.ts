import { curry } from '../function/curry';
export const whereAny = curry(<A>(spec: { [K in keyof A]?: (val: A[K]) => boolean }, obj: A): boolean => {
  for (const k in spec) if (Object.prototype.hasOwnProperty.call(spec, k) && spec[k]!(obj[k])) return true;
  return false;
});
