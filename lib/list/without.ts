import { curry } from '../function/curry';
export const without = curry(<A>(xs: A[], arr: A[]): A[] => arr.filter(x => !xs.includes(x)));
