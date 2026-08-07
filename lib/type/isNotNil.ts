import { isNil } from './isNil';
export const isNotNil = <A>(x: A): x is NonNullable<A> => !isNil(x);
