export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
}

export interface IUser {
  userId: string;
  displayName: string | null;
  email: string | null;
  photoUrl: string | null;
}

export interface AuthContextValue {
  user: IUser | null;
  isAuth: boolean;
  isLoading: boolean;
  register: (credentials: RegisterCredentials) => Promise<void>;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
}
