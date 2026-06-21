import { curry } from '../function/curry';
export const view = curry((l: { getter: any; setter: any }, o: any): any => l.getter(o));
