import config from './config/index';

import app from './app';
import { closeDatabase } from './database/db';

const PORT = config.app.port || 5000;

const server = app.listen(PORT, () => console.log(`Server is running here: ${PORT}`));

const gracefulShutdown = async (signal: string) => {
  console.log(`\n📥 Received ${signal}, shutting down gracefully...`);

  try {
    await new Promise<void>((resolve, reject) => {
      server.close((err) => {
        if (err) {
          reject(err);
        } else {
          console.log('✅ HTTP server closed');
          resolve();
        }
      });
    });

    await closeDatabase();
    console.log('✅ Database connections closed');
    
    process.exit(0);
  } catch (err) {
    console.error('❌ Error during shutdown:', err);
    process.exit(1);
  }
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

process.on('uncaughtException', (error) => {
	console.error('💥 Uncaught Exception:', error);
	gracefulShutdown('UNCAUGHT_EXCEPTION');
})

process.on('unhandledRejection', (reason, promise) => {
  console.error('💥 Unhandled Rejection at:', promise, 'reason:', reason);
  gracefulShutdown('UNHANDLED_REJECTION');
});

