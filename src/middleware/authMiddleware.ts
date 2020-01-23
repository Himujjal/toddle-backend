import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { IUserFullInfo } from '../models/user.d';

interface IModifiedReq extends Request {
  user: IUserFullInfo;
}

const protectedRoute: RequestHandler = async (
  req: IModifiedReq,
  res: Response,
  next: NextFunction,
) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, process.env.JWT_KEY, async (error, decoded) => {
      if (error) return res.status(500).send({ error: error.message });

      const user = decoded as IUserFullInfo;

      req.user = user;

      if (user) next();
    });
  }
  return res.status(401).json({ error: 'Auth failed' });
};

export default protectedRoute;
