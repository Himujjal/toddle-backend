import { RequestHandler } from 'express';
import logger from '../../logger';
import { voteForSurvey } from '../../models/Survey';
import { IVoteReqBody } from './types';

const voteHandler: RequestHandler = async (req, res, next) => {
  try {
    const { newAnswer, surveyId } = req.body as IVoteReqBody;
    // @ts-ignore
    const { _id: userId } = req['user'];

    if (surveyId.length === 0) throw new Error(`SurveyID cannot be empty`);
    if (newAnswer == null) throw new Error('Vote cannot be null');

    const success = await voteForSurvey(newAnswer, surveyId, userId);
    return res.status(200).json({ success });
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

export default voteHandler;
