// import config from '../config/index';
import { db } from '../database/db';
import { IdeaDbRow, IdeaWithVoteAndCount } from '../types/app.types';

export async function getAllIdeasService(
  clientIp: string,
): Promise<IdeaWithVoteAndCount[]> {
  console.log('IP:', clientIp);
  const [rows] = await db.query<IdeaDbRow[]>(
    `
    SELECT 
      i.id,
      i.title,
      i.description,
      i.created_at,
      COUNT(v_all.id) AS votesCount,
      CASE WHEN v.id IS NOT NULL THEN TRUE ELSE FALSE END AS voted
    FROM ideas i
    LEFT JOIN votes v 
      ON v.idea_id = i.id 
     AND v.ip_address = INET6_ATON(?)
    LEFT JOIN votes v_all
      ON v_all.idea_id = i.id
    GROUP BY i.id
    ORDER BY i.created_at DESC
    `,
    [clientIp],
  );

  return rows.map((row) => ({
    id: row.id,
    title: row.title,
    description: row.description,
    created_at: row.created_at,
    hasVoted: Boolean(row.voted),
    votesCount: Number(row.votesCount),
  }));
}
