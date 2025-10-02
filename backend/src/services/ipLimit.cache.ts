type CacheEntry = {
  expiresAt: number;
};

const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour
const ipCache = new Map<string, CacheEntry>();


export function isIpBlocked(ip: string): boolean {
  const entry = ipCache.get(ip);
  if (!entry) return false;

  if (Date.now() > entry.expiresAt) {
    ipCache.delete(ip);
    return false;
  }

  return true;
}

export function blockIp(ip: string): void {
  ipCache.set(ip, { expiresAt: Date.now() + CACHE_TTL_MS });
}
