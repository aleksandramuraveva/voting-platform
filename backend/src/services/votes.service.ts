import { db } from '../database/db';
import { RowDataPacket, OkPacket } from 'mysql2';
import { PoolConnection } from 'mysql2/promise';
import {
  getOrCreateIpCounter,
  incrementIpCounter,
  checkIpLimit,
} from './ipCounters.service';

export async function voteForIdeaService(
  ideaId: number,
  ip: string,
): Promise<number> {
  const connection: PoolConnection = await db.getConnection();
  try {
    await connection.beginTransaction();

    const votesCount = await getOrCreateIpCounter(connection, ip);
    checkIpLimit(votesCount);

    try {
      await connection.query<OkPacket>(
        'INSERT INTO votes (idea_id, ip_address) VALUES (?, INET6_ATON(?))',
        [ideaId, ip],
      );
    } catch (err: unknown) {
      if (err.code === 'ER_DUP_ENTRY') {
        console.log('already voted');
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
