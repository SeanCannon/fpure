import { lens } from './lens';
export const lensProp = (k: string) => lens(
  (o: any) => o[k],
  (v: any, o: any) => ({ ...o, [k]: v })
);
