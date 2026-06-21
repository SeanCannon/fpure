import { curry } from '../function/curry';
export const over = curry((l: { getter: any; setter: any }, fn: (v: any) => any, o: any): any => l.setter(fn(l.getter(o)), o));
