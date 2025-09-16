export function flattenObject(ob: any, prefix = ''): Record<string, any> {
  const result: Record<string, any> = {};
  if (!ob || typeof ob !== 'object') return result;
  Object.keys(ob).forEach(k => {
    const val = ob[k];
    const key = prefix ? `${prefix}.${k}` : k;
    if (val && typeof val === 'object' && !Array.isArray(val)) {
      Object.assign(result, flattenObject(val, key));
    } else {
      result[key] = val;
    }
  });
  return result;
}

export function deepValue(obj: any, path: string) {
  if (!obj) return null;
  return path.split('.').reduce((acc: any, p: string) => {
    if (acc === undefined || acc === null) return null;
    const v = acc[p];
    if (Array.isArray(v)) {
      return v
        .map(item => (typeof item === 'object' ? JSON.stringify(item) : item))
        .join(', ');
    }
    return v;
  }, obj);
}

export function prettifyHeader(key: string) {
  return key.split('.').map(k => k.replace(/_/g, ' ')).join(' › ');
}
