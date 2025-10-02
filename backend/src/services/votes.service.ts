import { db } from '../database/db';
import { RowDataPacket, OkPacket } from 'mysql2';
import { PoolConnection } from 'mysql2/promise';
import {
  getOrCreateIpCounter,
  incrementIpCounter,
  checkIpLimit,
} from './ipCounters.service';
import { blockIp, isIpBlocked } from './ipLimit.cache';
import { incrAndCheckRate } from './rateLimiter';

export async function voteForIdeaService(
  ideaId: number,
  ip: string,
): Promise<number> {
  //if more than 20 times per minute
  if (incrAndCheckRate(ip, 20)) {
  throw new Error('rate_limited');
}
  //no db requests, error
  if (isIpBlocked(ip)) {
    console.log('!temporary cash worked =)');
    throw new Error('limit_exceeded');
  }

  const connection: PoolConnection = await db.getConnection();
  try {
    await connection.beginTransaction();

    const votesCount = await getOrCreateIpCounter(connection, ip);

    try {
      checkIpLimit(votesCount);
    } catch (err) {
      //10+ votes and we send IP to in-memory cach
      blockIp(ip);
      throw err;
    }

    try {
      await connection.query<OkPacket>(
        'INSERT INTO votes (idea_id, ip_address) VALUES (?, INET6_ATON(?))',
        [ideaId, ip],
      );
    } catch (err: unknown) {
      if (err.code === 'ER_DUP_ENTRY') {
        await connection.rollback();
        throw new Error('already_voted');
      }
      throw err;
    }

    await incrementIpCounter(connection, ip);

    await connection.commit();

    const [voteRows] = await connection.query<RowDataPacket[]>(
      'SELECT COUNT(*) AS votesCount FROM votes WHERE idea_id = ?',
      [ideaId],
    );
    return voteRows[0].votesCount as number;
  } catch (err) {
    console.log('err in main, rollback', err);
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }
}
