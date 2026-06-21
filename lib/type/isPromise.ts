export const isPromise = (v: unknown): v is Promise<any> => v != null && typeof v === 'object' && typeof (v as any).then === 'function';
