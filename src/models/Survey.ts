import DataStore from 'nedb';
import logger from '../logger';
import { ISurveyDB, ISurvey } from './survey.d';

const SurveyDB = new DataStore({
  filename: './surveys.db',
  autoload: true,
  onload: (error: Error) => {
    if (error) {
      logger.log({
        level: 'error',
        message: 'Error loading the survey database',
        error: error.message,
      });
    }
  },
});

export const getAllSurveys = async (userId?: string) => {
  return new Promise<ISurveyDB[]>((resolve, reject) => {
    const query = userId == null ? {} : { creatorUserId: userId };
    console.log(query);
    SurveyDB.find<ISurveyDB>(query, (error: Error, docs: ISurveyDB[]) => {
      if (error) return reject(error);
      return resolve(docs);
    });
  });
};

export const getAParticularSurvey = async (userId: string, surveyId: string) => {
  return new Promise<ISurveyDB>((resolve, reject) => {
    SurveyDB.findOne(
      { creatorUserId: userId, _id: surveyId },
      (error: Error, survey: ISurveyDB) => {
        if (error) return reject(error);
        return resolve(survey);
      },
    );
  });
};

export const createASurvey = async (survey: ISurvey) => {
  return new Promise<ISurveyDB>((resolve, reject) => {
    SurveyDB.insert<ISurvey>(survey, (error: Error, survey: ISurvey) => {
      if (error) return reject(error);
      return resolve(survey as ISurveyDB);
    });
  });
};

export const deleteASurvey = async (surveyId: string, creatorUserId: string) => {
  return new Promise<number>((resolve, reject) => {
    SurveyDB.remove({ _id: surveyId, creatorUserId }, (error: Error, indexOfRemoved: number) => {
      if (error) return reject(error);
      return resolve(indexOfRemoved);
    });
  });
};

export const updateASurvey = (surveyId: string, question: string) => {
  return new Promise<number>((resolve, reject) => {
    SurveyDB.update<ISurveyDB>(
      { _id: surveyId },
      { $set: { question } },
      {},
      (error: Error, numberOfUpdated: number) => {
        if (error) return reject(error);

        return resolve(numberOfUpdated);
      },
    );
  });
};

export const voteForSurvey = async (voteRes: boolean, surveyId: string, userId: string) => {
  const survey = await new Promise<ISurveyDB>((resolve, reject) => {
    SurveyDB.findOne({ _id: surveyId }, (error: Error, survey: ISurveyDB) => {
      if (error) return reject(error);
      return resolve(survey);
    });
  });

  if (survey != null) {
    let isSurveyResultPresent = false;

    survey.result = survey.result.map(res => {
      if (res.userId === userId) {
        isSurveyResultPresent = true;
        return { userId, answer: voteRes };
      }
      return res;
    });
    if (!isSurveyResultPresent) survey.result.push({ userId, answer: voteRes });

    return new Promise<boolean>((resolve, reject) => {
      SurveyDB.update<ISurveyDB>(
        { _id: surveyId },
        survey,
        {},
        (error: Error, numberOfUpdated: number) => {
          if (error) return reject(error);
          return resolve(numberOfUpdated > -1);
        },
      );
    });
  }
  throw new Error('No Such Survey present!');
};
