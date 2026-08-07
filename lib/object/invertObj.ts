export const invertObj = <K extends string, V extends string | number | symbol>(obj: Record<K, V>): Record<string, K> => {
  const result: Record<string, K> = {};
  for (const k in obj) if (Object.prototype.hasOwnProperty.call(obj, k)) result[String(obj[k])] = k;
  return result;
};
