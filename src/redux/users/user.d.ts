export interface UserRegistrationType {
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  password: string;
  avatar: string;
  address: string;
}

export enum UserRole {
  Customer = 'customer',
  Admin = 'admin',
}

export type UserType = {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  username: string;
  role: UserRole;
  avatar: string;
  address: string;
  active: boolean;
  __v: number;
};

export type UserActiveAndRole = {
  role: UserRole;
  active: boolean;
};

export interface InitialState {
  users: UserType[] | null;
}

export interface UserUpdate {
  name: string;
  email: string;
}

export interface UpdateQueryType {
  id: number;
  rest: UserUpdate;
}
