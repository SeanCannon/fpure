import { curry } from '../function/curry';
export const forEachObjIndexed = curry(<A>(fn: (val: A[keyof A], key: keyof A, obj: A) => void, obj: A): A => { for (const k in obj) if (Object.prototype.hasOwnProperty.call(obj, k)) fn(obj[k], k, obj); return obj; });
