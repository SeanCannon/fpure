import { curry } from './curry';
export const otherwise = curry(<A, B>(onReject: (err: any) => B, promise: Promise<A>): Promise<A | B> =>
  promise.catch(onReject));
