export const isFiniteNum = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v);
