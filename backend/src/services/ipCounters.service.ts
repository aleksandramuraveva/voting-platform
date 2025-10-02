import { RowDataPacket, OkPacket } from 'mysql2';
import { PoolConnection } from 'mysql2/promise';
import config from '../config/index';

const MAX_VOTES_PER_IP = config.app.maxVotesPerIp;

export async function getOrCreateIpCounter(
  connection: PoolConnection,
  ip: string,
): Promise<number> {
  const [rows] = await connection.query<RowDataPacket[]>(
    'SELECT votes_count FROM ip_counters WHERE voter_ip = INET6_ATON(?) FOR UPDATE',
    [ip],
  );

  if (rows.length === 0) {
    await connection.query<OkPacket>(
      'INSERT INTO ip_counters (voter_ip, votes_count) VALUES (INET6_ATON(?), 0)',
      [ip],
    );
    return 0;
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
