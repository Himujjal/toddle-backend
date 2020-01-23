import { ISurvey } from '../../models/survey.d';

export interface IUpdateSurveyReqBody {
  surveyId: string;
  question: string;
}

export interface ICreateSurveyReqBody {
  question: string;
}

export interface IVoteReqBody {
  newAnswer: boolean;
  surveyId: string;
}
