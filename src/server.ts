import dotenv from 'dotenv';
const result = dotenv.config();
if (result.error) {
  dotenv.config({ path: '.env' });
}

import app from './app';
import logger from './logger';

app.listen(app.get('port'), (): void => {
  logger.info(`*🌏 Express server started at http://localhost:${app.get('port')}*`);
  if (process.env.NODE_ENV === 'development') {
    logger.debug(`*⚙️  Swagger UI hosted at http://localhost:${app.get('port')}/dev/api-docs*`);
  }
});

// Close the Mongoose connection, when receiving SIGINT
process.on('SIGINT', () => {
  logger.info('Gracefully shutting down');
});
