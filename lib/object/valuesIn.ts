export const valuesIn = (obj: any): unknown[] => {
  const result: unknown[] = [];
  for (const k in obj) result.push((obj as any)[k]);
  return result;
};
