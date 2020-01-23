import { RequestHandler } from 'express';

import { addUser } from '../../models/User';
import { validateSignUpForm } from '../../utils/validators';
import { ISignUpReqBody } from './types.d';
import logger from '../../logger';

const signUp: RequestHandler = async (req, res) => {
  let { name, email, password } = req.body as ISignUpReqBody;

  const formErrors = validateSignUpForm(name, email, password);
  if (formErrors.length > 0) {
    return res.status(400).send({
      error: formErrors,
    });
  }

  try {
    const user = await addUser({ name, email, password });

    if (user) return res.status(200).json({ name, email, id: user._id });
    else throw new Error('Error in registering user');
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

export default signUp;
