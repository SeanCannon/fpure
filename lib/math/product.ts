import { mul } from './mul';
export const product = (arr: number[]): number => arr.reduce(mul, 1);
