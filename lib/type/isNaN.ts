export const isNaNVal = (v: unknown): boolean => typeof v === 'number' && isNaN(v);
