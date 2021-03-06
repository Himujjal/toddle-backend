import { RequestHandler } from 'express';
import { getAllSurveys } from '../../models/Survey';
import logger from '../../logger';

const getAllSurveysController: RequestHandler = async (req, res, next) => {
  try {
    const allSurveys = await getAllSurveys();

    return res.status(200).json({ surveys: allSurveys });
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      logger.log({
        level: 'error',
        message: 'Error in request handler',
        error: error.message,
      });
    }
    return res.status(400).json({ error: error.message });
  }
};

export default getAllSurveysController;
