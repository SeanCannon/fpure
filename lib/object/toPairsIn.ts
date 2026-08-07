export const toPairsIn = (obj: any): [string, unknown][] => {
  const result: [string, unknown][] = [];
  for (const k in obj) result.push([k, (obj as any)[k]]);
  return result;
};
