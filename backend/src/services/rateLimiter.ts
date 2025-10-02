const shortWindowMs = 60_000; // 1 min
const shortWindowMap = new Map<string, { count: number; expiresAt: number }>();

export function incrAndCheckRate(ip: string, limit = 20): boolean {
  const now = Date.now();
  const entry = shortWindowMap.get(ip);
  if (!entry || now > entry.expiresAt) {
    shortWindowMap.set(ip, { count: 1, expiresAt: now + shortWindowMs });
    return false;
  }
  entry.count += 1;
  if (entry.count > limit) return true;
  return false;
}