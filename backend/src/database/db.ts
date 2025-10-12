import mysql from 'mysql2/promise';
import config from '../config/index';

export const db = mysql.createPool({
  host: config.db.host,
  port: config.db.port,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
  waitForConnections: true,
  connectionLimit: config.db.poolLimit,
  queueLimit: 0,
});

export const closeDatabase = async (): Promise<void> => {
  await db.end();
};
