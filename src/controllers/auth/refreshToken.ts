import { Request, Response, NextFunction } from 'express';
import logger from '../../logger';
import jwt from 'jsonwebtoken';
import { refreshTokens, findUser } from '../../models/User';
import { IRefreshTokenReqBody } from './types.d';
import { tokenExpiryTime } from '../../utils/config';

const refreshTokenReq = async (req: Request, res: Response, next: NextFunction) => {
  const { refreshToken, userId } = req.body as IRefreshTokenReqBody;

  try {
    if (refreshToken in refreshTokens) {
      const user = await findUser(userId);

      if (user.email === refreshTokens[refreshToken].email) {
        const token = jwt.sign(user, process.env.JWT_KEY, { expiresIn: tokenExpiryTime });

        return res.json({ token });
      }
    }

    throw new Error("Couldn't authenticate user. Login again.");
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

export default refreshTokenReq;
