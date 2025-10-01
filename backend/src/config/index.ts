import dotenv from 'dotenv';

dotenv.config();

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required env variable: ${key}`);
  }
  return value;
}

const config = {
  app: {
    port: parseInt(process.env.PORT || '5000', 10),
    whiteList: (process.env.WHITE_LIST || '')
      .split(',')
      .map((url) => url.trim())
      .filter((url) => url.length > 0),
    trustProxy: process.env.TRUST_PROXY === '1',
    maxVotesPerIp: parseInt(process.env.MAX_VOTES_PER_IP || '10', 10),
  },
  db: {
    host: requireEnv('DB_HOST'),
    port: parseInt(process.env.DB_PORT || '3306', 10),
    user: requireEnv('DB_USER'),
    password: process.env.DB_PASSWORD || '',
    database: requireEnv('DB_NAME'),
    poolLimit: parseInt(process.env.DB_POOL_LIMIT || '10', 10),
  },
} as const;

export type AppConfig = typeof config;

export default config;
