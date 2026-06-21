import { curry } from '../function/curry';
export const zip = curry(<A, B>(a: A[], b: B[]): [A, B][] => a.slice(0, b.length).map((x, i) => [x, b[i]]));
