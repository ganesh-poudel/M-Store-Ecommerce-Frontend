export interface UserLoginType {
  email: string;
  password: string;
}

export interface UserLoginResponseType {
  access_token: string;
  refresh_token: string;
}
