import { RequestHandler } from 'express';
import { ICreateSurveyReqBody } from './types.d';
import { createASurvey } from '../../models/Survey';
import logger from '../../logger';
import { addSurveyValidator } from '../../utils/validators';
import { IUser } from '../../models/user.d';

const addSurvey: RequestHandler = async (req, res, next) => {
  const { question } = req.body as ICreateSurveyReqBody;

  // @ts-ignore
  const creatorUserId = (req['user'] as IUser)._id;

  try {
    const addSurveyErrors = addSurveyValidator(question, creatorUserId);
    if (addSurveyErrors.length > 0) throw new Error(addSurveyErrors.join(' || '));

    const newSurvey = await createASurvey({ question, creatorUserId, result: [] });
    const { _id } = newSurvey;

    return res.status(200).json({ survey: { id: _id, question, creatorUserId, result: [] } });
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

export default addSurvey;
