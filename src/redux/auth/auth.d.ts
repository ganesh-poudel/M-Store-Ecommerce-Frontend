import { UserType } from "../users/user";

export interface UserLoginType {
  email: string;
  password: string;
}

export interface UserLoginResponseType {
  access_token: string;
  refresh_token: string;
}

export interface InitalLoginStateType {
  accessToken: string;
  isAuthenticated: boolean;
  role: "customer" | "admin" | null;
  user: UserType | null;
}

export interface AuthType {
  Authorization: string;
}
