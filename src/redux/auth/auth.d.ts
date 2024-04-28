import { UserType } from '../users/user';

export interface UserLoginType {
  email: string;
  password: string;
}

export interface UserLoginResponseType {
  tokens: Tokens;
  user: UserType;
}

export interface InitalLoginStateType {
  accessToken: string;
  isAuthenticated: boolean;
  role: 'customer' | 'admin' | null;
  user: UserType | null;
}

export interface AuthType {
  Authorization: string;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}
