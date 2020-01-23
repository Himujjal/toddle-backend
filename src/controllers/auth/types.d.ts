export interface IRefreshTokenReqBody {
  refreshToken: string;
  userId: string;
}

export interface ILoginReqBody {
  email: string;
  password: string;
}

export interface ISignUpReqBody extends ILoginReqBody {
  name: string;
}
