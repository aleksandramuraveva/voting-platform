import { RowDataPacket } from 'mysql2';
import { PoolConnection } from 'mysql2/promise';
import config from '../config/index';

const MAX_VOTES_PER_IP = config.app.maxVotesPerIp;

export async function getOrCreateIpCounter(
  connection: PoolConnection,
  ip: string,
): Promise<number> {
  //solve gap lock, raw should exist before locking
  await connection.query(
    'INSERT IGNORE INTO ip_counters (voter_ip, votes_count) VALUES (INET6_ATON(?), 0)',
    [ip],
  );

  const [rows] = await connection.query<RowDataPacket[]>(
    'SELECT votes_count FROM ip_counters WHERE voter_ip = INET6_ATON(?) FOR UPDATE',
    [ip],
  );

  if (rows.length === 0) {
    throw new Error(
      `Critical: ip_counters row missing for IP ${ip} after INSERT IGNORE`,
    );
  }

  return rows[0].votes_count;
}

export async function incrementIpCounter(
  connection: PoolConnection,
  ip: string,
): Promise<void> {
  await connection.query(
    'UPDATE ip_counters SET votes_count = votes_count + 1 WHERE voter_ip = INET6_ATON(?)',
    [ip],
  );
}

export function checkIpLimit(votesCount: number): void {
  if (votesCount >= MAX_VOTES_PER_IP) {
    throw new Error('limit_exceeded');
  }
}
