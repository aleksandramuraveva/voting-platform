// import config from '../config/index';
import { db } from '../database/db';
import { Idea } from '../types/app.types';

export async function getAllIdeasService(): Promise<Idea[]> {
  const [rows] = await db.query(
    'SELECT id, title, description, created_at FROM ideas ORDER BY created_at DESC',
  );
  return rows as Idea[];
}
