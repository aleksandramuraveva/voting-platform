import { db } from './db.js';
import { readFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const initDatabase = async () => {
  try {
    const [schema, seed] = await Promise.all([
      readFile(join(__dirname, 'schema.sql'), 'utf8'),
      readFile(join(__dirname, 'seed.sql'), 'utf8'),
    ]);

    const schemaQueries = schema
      .split(';')
      .map((query) => query.trim())
      .filter((query) => query && !query.startsWith('--'));

    for (const query of schemaQueries) {
      await db.execute(query);
    }

    // SEED
    const seedQueries = seed
      .split(';')
      .map((query) => query.trim())
      .filter((query) => query && !query.startsWith('--'));

    for (const query of seedQueries) {
      await db.execute(query);
    }

    console.log('✅ Database initialized successfully');
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    throw new Error(`Database init failed: ${error.message}`);
  }
};
