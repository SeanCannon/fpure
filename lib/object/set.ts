import { curry } from '../function/curry';
export const set = curry((l: { getter: any; setter: any }, v: any, o: any): any => l.setter(v, o));
