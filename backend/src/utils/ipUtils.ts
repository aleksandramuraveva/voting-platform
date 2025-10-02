import { Request } from 'express';

export function getClientIp(req: Request): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') {
    const firstIp = forwarded.split(',')[0].trim();
    if (isValidIp(firstIp)) return normalizeIp(firstIp);
  }

  return normalizeIp(req.socket.remoteAddress) || '0.0.0.0';
}

function normalizeIp(ip: string | undefined): string {
  if (!ip) return '0.0.0.0';
  if (ip === '::1') return '127.0.0.1';
  if (ip.startsWith('::ffff:')) return ip.substring(7);
  return ip;
}

function isValidIp(ip: string): boolean {
  return !!ip && ip !== 'unknown';
}
