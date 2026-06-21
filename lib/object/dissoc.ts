import { curry } from '../function/curry';
export const dissoc = curry(<K extends string>(k: K, o: Record<K, any>): Record<string, any> => {
  const { [k]: _, ...rest } = o;
  return rest as Record<string, any>;
});
