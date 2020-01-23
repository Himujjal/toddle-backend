export interface IUserFullInfo extends IUser {
  password: string;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
}

export interface ISignUpForm extends ILoginForm {
  name: string;
}

export interface ILoginForm {
  email: string;
  password: string;
}

export type IDBCallback<T> = (err: Error, document: T) => void;

export interface IRefreshTokenDB {
  [key: string]: IUser;
}
