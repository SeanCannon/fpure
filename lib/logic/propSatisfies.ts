import { curry } from '../function/curry';

export const propSatisfies = curry(<A, K extends keyof A>(pred: (a: A[K]) => boolean, prop: K, obj: A): boolean => pred(obj[prop]));
