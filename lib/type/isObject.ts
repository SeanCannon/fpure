export const isObject = (v: unknown): v is Record<string, any> => v != null && typeof v === 'object' && !Array.isArray(v);
