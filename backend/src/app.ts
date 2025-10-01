import express from 'express';
import cors, { CorsOptions } from 'cors';
import config from './config/index';
import ideasRouter from './routes/ideas.routes';
import { errorHandler } from './middlewares/errorHandler';

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

app.use('/api/ideas', ideasRouter);

app.use(errorHandler);

//DB
initDatabase().catch((err) => {
  console.error('❌ DB init failed:', err);
  process.exit(1);
});

console.log('All good!');

export default app;
