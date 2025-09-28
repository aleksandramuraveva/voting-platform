import express from 'express';
import cors, { CorsOptions } from 'cors';

const app = express();

const whitelist = (process.env.WHITE_LIST || '')
  .split(',')
  .map((url) => url.trim());

const corsOptions: CorsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void,
  ) => {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

console.log('All good!');

export default app;
