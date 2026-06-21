import { curry } from '../function/curry';
export const interpose = curry(<A>(sep: A, arr: A[]): A[] => arr.flatMap((v, i) => i < arr.length - 1 ? [v, sep] : [v]));
