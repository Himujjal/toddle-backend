export interface ISurveyResult {
  userId: string;
  answer: boolean;
}

export interface ISurvey {
  creatorUserId: string;
  question: string;
  result: ISurveyResult[];
}

export interface ISurveyDB extends ISurvey {
  _id: string;
}
