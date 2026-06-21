import { curry } from '../function/curry';
export const difference = curry(<A>(a: A[], b: A[]): A[] => b.filter(x => !a.includes(x)));
