export type AuthHandleFn = (login: string, password: string) => void;

export interface AuthFormProps {
  loading: boolean;
  authHandle: AuthHandleFn;
}
