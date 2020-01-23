import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import uuidV1 from 'uuid/v1';
import { verifyIfUserExists, refreshTokens } from '../../models/User';
import { validateLoginForm } from '../../utils/validators';
import logger from '../../logger';
import { tokenExpiryTime } from '../../utils/config';

const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  // form validation
  const formErrors = validateLoginForm(email, password);
  if (formErrors.length > 0) {
    return res.status(400).send({
      error: formErrors,
    });
  }

  try {
    // get user from database and verify its existence
    const user = await verifyIfUserExists(email, password);
    if (user) {
      const token = jwt.sign(
        { _id: user._id, email: user.email, name: user.name },
        process.env.JWT_KEY,
        { expiresIn: tokenExpiryTime },
      );

      const refreshToken = uuidV1();
      const { _id, name, email } = user;
      refreshTokens[refreshToken] = { _id, email, name };

      return res.status(200).json({ id: _id, email, name, token, refreshToken });
    }

    throw new Error('No User found');
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

export default login;
