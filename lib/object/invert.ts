export const invert = <K extends string, V extends string | number | symbol>(obj: Record<K, V>): Record<string, K[]> => {
  const result: Record<string, K[]> = {};
  for (const k in obj) if (Object.prototype.hasOwnProperty.call(obj, k)) {
    const v = String(obj[k]);
    (result[v] ??= []).push(k);
  }
  return result;
};
