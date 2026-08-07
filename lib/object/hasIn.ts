import { curry } from '../function/curry';
export const hasIn = curry((prop: string, obj: unknown): boolean => prop in Object(obj));
