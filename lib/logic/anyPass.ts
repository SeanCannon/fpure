import { curry } from '../function/curry';
export const anyPass = curry(<A>(preds: Array<(a: A) => boolean>, x: A): boolean => preds.some(p => p(x)));
