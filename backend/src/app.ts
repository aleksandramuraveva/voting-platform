import express from 'express';
import cors, { CorsOptions } from 'cors';
import config from './config/index';

import { initDatabase } from './database/init';

const app = express();

const corsOptions: CorsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void,
  ) => {
    if (!origin || config.app.whiteList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

//DB
initDatabase().catch(console.error);

console.log('All good!');

export default app;
