export const keysIn = (obj: any): string[] => { const keys: string[] = []; for (const k in obj) keys.push(k); return keys; };
