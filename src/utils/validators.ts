export function validateEmail(email: string) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function validatePassword(password: string): boolean {
  var letter = /[a-zA-Z]/;
  var number = /[0-9]/;
  return (
    password.length > 7 && password.length < 20 && letter.test(password) && number.test(password)
  );
}

export function validateName(name: string): boolean {
  return name.length > 0;
}

export function validateSignUpForm(name: string, email: string, password: string) {
  const error: string[] = [];
  if (!validateName(name)) error.push('Name must not be empty');
  if (!validateEmail(email)) error.push('Email must not be empty & be of proper format');
  if (!validatePassword(password)) error.push('Password should be between 7 to 14 characters');
  return error;
}

export function validateLoginForm(email: string, password: string) {
  const error: string[] = [];
  if (!validateEmail(email)) error.push('Email must not be empty & be of proper format');
  if (!validatePassword(password)) error.push('Password should be between 7 to 14 characters');
  return error;
}

export function addSurveyValidator(question: string, creatorUserId: string) {
  const error: string[] = [];
  if (question === null) error.push(`Question can't be empty`);
  else if (question.length === 0) error.push(`Question can't be empty`);

  if (creatorUserId === null) error.push(`creatorUserId can't be empty`);
  else if (creatorUserId.length === 0) error.push(`creatorUserId can't be empty`);

  return error;
}

export function updateSurveyValidator(surveyId: string, question: string) {
  const error: string[] = [];
  if (question === null) error.push(`Question can't be empty`);
  else if (question.length === 0) error.push(`Question can't be empty`);

  if (surveyId === null) error.push(`surveyId can't be empty`);
  else if (surveyId.length === 0) error.push(`surveyId can't be empty`);

  return error;
}
