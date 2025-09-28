import dotenv from 'dotenv';

dotenv.config();

// function requireEnv(key: string): string {
//   const value = process.env[key];
//   if (!value) {
//     throw new Error(`Missing required env variable: ${key}`);
//   }
//   return value;
// }

const config = {
  port: parseInt(process.env.PORT || '5000', 10),
};

export default config;
