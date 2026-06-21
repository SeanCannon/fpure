import { curry } from '../function/curry';
export const has = curry((k: string, o: object): boolean => Object.prototype.hasOwnProperty.call(o, k));
