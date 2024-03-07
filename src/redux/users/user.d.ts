export interface UserRegistrationType {
  name: string;
  email: string;
  password: string;
  avatar: string;
}

export interface UserType {
  name: string;
  email: string;
  password: string;
  avatar: string;
  id: number;
  role: "customer" | "admin";
}

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
