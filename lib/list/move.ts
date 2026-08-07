import { curry } from '../function/curry';
export const move = curry(<A>(from: number, to: number, arr: A[]): A[] => {
  const result = [...arr];
  const [item] = result.splice(from, 1);
  result.splice(to, 0, item);
  return result;
});