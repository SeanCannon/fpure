import { curry } from '../function/curry';
export const paths = curry(<V>(pathsArr: string[][], obj: any): (V | undefined)[] => pathsArr.map(p => {
  let cur: any = obj;
  for (const key of p) { if (cur == null) return undefined; cur = cur[key]; }
  return cur as V;
}));
