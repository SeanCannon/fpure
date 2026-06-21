export const applySpec = (spec: Record<string, (...args: any[]) => any>) => (...args: any[]): Record<string, any> =>
  Object.entries(spec).reduce((acc, [k, fn]) => ({ ...acc, [k]: fn(...args) }), {} as Record<string, any>);
