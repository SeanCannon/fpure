import { curry } from '../function/curry';
export const allPass = curry(<A>(preds: Array<(a: A) => boolean>, x: A): boolean => preds.every(p => p(x)));
