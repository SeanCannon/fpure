import { curry } from '../function/curry';
export const union = curry(<A>(a: A[], b: A[]): A[] => [...a, ...b.filter(x => !a.includes(x))]);
