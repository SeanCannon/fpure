import { isEmpty } from './isEmpty';

export const isNotEmpty = (x: unknown): boolean => !isEmpty(x);
