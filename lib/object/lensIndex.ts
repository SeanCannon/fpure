import { lens } from './lens';
export const lensIndex = (i: number) => lens(
  (o: any[]) => o[i],
  (v: any, o: any[]) => o.map((x, j) => j === i ? v : x)
);
