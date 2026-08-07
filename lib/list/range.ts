import { curry } from '../function/curry';
export const range = curry((from: number, to: number): number[] => {
  const result: number[] = [];
  for (let i = from; i < to; i++) result.push(i);
  return result;
});