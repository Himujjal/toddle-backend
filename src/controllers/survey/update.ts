import { RequestHandler } from 'express';
import { updateASurvey } from '../../models/Survey';
import logger from '../../logger';
import { IUpdateSurveyReqBody } from './types';
import { updateSurveyValidator } from '../../utils/validators';

const updateSurvey: RequestHandler = async (req, res, next) => {
  const { surveyId, question } = req.body as IUpdateSurveyReqBody;

  try {
    const updateSurveyErrors = updateSurveyValidator(surveyId, question);
    if (updateSurveyErrors.length > 0) throw new Error(updateSurveyErrors.join(' || '));

    const num = await updateASurvey(surveyId, question);
    return res.status(200).json({ success: num > -1 });
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

export default updateSurvey;
