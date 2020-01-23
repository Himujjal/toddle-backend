import { RequestHandler } from 'express';
import logger from '../../logger';
import { deleteASurvey } from '../../models/Survey';
import { IUser } from '../../models/user.d';

const deleteSurvey: RequestHandler = async (req, res, next) => {
  // @ts-ignore
  const { _id, creatorUserId } = req['user'] as IUser;

  const { surveyId } = req.params;
  try {
    const num = await deleteASurvey(surveyId, creatorUserId);
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

export default deleteSurvey;
