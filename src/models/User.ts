import DataStore from 'nedb';
import bcrypt from 'bcryptjs';

import logger from '../logger';
import { comparePasswords } from '../utils/bcrypt';
import { hashPassword } from '../utils/bcrypt';

import { IUserFullInfo, IDBCallback, ISignUpForm, IUser, IRefreshTokenDB } from './user.d';

export const refreshTokens: IRefreshTokenDB = {};

const userDb = new DataStore({
  filename: './users.db',
  autoload: true,
  onload: (error: Error) => {
    if (error) {
      logger.log({
        level: 'error',
        message: `Database connection failed!`,
      });
    }
    logger.info('Database connection for Users successful');
  },
});

export const addUser = async (user: ISignUpForm) => {
  user.password = hashPassword(user.password);

  return new Promise<IUserFullInfo>((resolve, reject) => {
    userDb.findOne({ email: user.email }, (error, doc) => {
      if (error) return reject(error);
      if (doc) return reject(new Error('User already exists. Check your email!'));

      userDb.insert<ISignUpForm>(user, (error: Error, newDoc: IUserFullInfo) => {
        if (error) return reject(error);
        return resolve(newDoc);
      });
    });
  });
};

export const verifyIfUserExists = async (email: string, password: string) => {
  return new Promise<IUserFullInfo>((resolve, reject) => {
    userDb.findOne({ email }, async (error: Error, doc: IUserFullInfo) => {
      if (error) return reject(error);

      if (doc) {
        if (comparePasswords(password, doc.password)) return resolve(doc);
        else return reject(new Error(`Passwords incorrect`));
      }

      return reject(new Error("User doesn't exist"));
    });
  });
};

export const findUser = (userID: string) => {
  return new Promise<IUserFullInfo>((resolve, reject) => {
    userDb.findOne({ _id: userID }, (error: Error, doc: IUserFullInfo) => {
      if (error) reject(error);
      else resolve(doc);
    });
  });
};

export const updateUser = (userId: string, newUserInfo: IUserFullInfo) => {
  return new Promise<IUserFullInfo>((resolve, reject) => {
    userDb.update<IUserFullInfo>(
      { _id: userId },
      newUserInfo,
      {},
      (error: Error, numberOfUpdated: number) => {
        if (error) return reject(error);

        return resolve(newUserInfo);
      },
    );
  });
};
