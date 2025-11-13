export interface Users {
  id: number;
  email: string;
  login: string;
  role: number;
  name: string;
  surname: string;
  phone: string;
  object: [];
  team: [];
}
export interface UsersState {
  loading: boolean;
  error: string | null;
  DATA: Users[];
}

export interface UsersResponse {
  success: boolean;
  message?: string;
  DATA?: Users[] | string;
}

export interface UserFormData {
  id: number | undefined;
  email: string;
  login: string;
  password?: string; // уберем потом ?
  role?: number;
  name: string;
  surname: string;
  phone: string;
  object?: []; // уберем потом ?
  teams?: []; // уберем потом ?
}
