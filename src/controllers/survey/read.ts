import { RequestHandler } from 'express';
import logger from '../../logger';
import { getAParticularSurvey } from '../../models/Survey';

const readSurvey: RequestHandler = async (req, res, next) => {
  // @ts-ignore
  const { userId } = req['user'];
  const { surveyId } = req.body as { surveyId: string };

  try {
    const survey = await getAParticularSurvey(userId, surveyId);

    return res.status(200).json({ survey });
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      logger.log({
        level: 'error',
        message: 'Error in request handler',
        error: error.message,
      });
    }
    res.status(400).json({ error: error.message });
  }
};

export default readSurvey;
