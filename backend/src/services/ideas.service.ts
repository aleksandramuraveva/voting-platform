// import config from '../config/index';
import { db } from '../database/db';
import { IdeaWithVote, IdeaDbRow } from '../types/app.types';

export async function getAllIdeasService(
  clientIp: string,
): Promise<IdeaWithVote[]> {
  console.log('IP:', clientIp);
  const [rows] = await db.query<IdeaDbRow[]>(
    `
    SELECT 
      i.id,
      i.title,
      i.description,
      i.created_at,
      CASE WHEN v.id IS NOT NULL THEN TRUE ELSE FALSE END AS voted
    FROM ideas i
    LEFT JOIN votes v 
      ON v.idea_id = i.id 
     AND v.ip_address = INET6_ATON(?)
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
  }));
}
