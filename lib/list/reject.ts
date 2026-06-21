import { curry } from '../function/curry';
export const reject = curry(<A>(fn: (a: A) => boolean, arr: A[]): A[] => arr.filter(x => !fn(x)));
