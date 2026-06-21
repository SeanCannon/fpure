import { curry } from '../function/curry';
export const path = curry((ps: string[], o: object): any =>
  ps.reduce((acc, p) => (acc != null ? (acc as any)[p] : undefined), o as any)
);
