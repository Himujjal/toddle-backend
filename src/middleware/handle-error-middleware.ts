import { RequestHandler } from 'express';
import logger from '../logger';

/**
 * This router wrapper catches any error from async await
 * and throws it to the default express error handler,
 * instead of crashing the app
 *
 * @param handler Request handler to check for error
 */
const handleErrorMiddleware = (handler: RequestHandler): RequestHandler => async (
  req,
  res,
  next,
) => {
  try {
    handler(req, res, next);
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      logger.log({
        level: 'error',
        message: 'Error in request handler',
        error: err,
      });
    }
    res.status(400).json({ error: err });
  }
};

export default handleErrorMiddleware;
