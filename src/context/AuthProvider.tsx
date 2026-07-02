import { useEffect, useState, type ReactNode } from 'react';

import { AuthContext } from './authContext';

import {
  loginUser,
  logoutUser,
  registerUser,
  subscribeToAuthChanges,
} from '../services/auth/authService';

import type {
  LoginCredentials,
  RegisterCredentials,
  IUser,
} from '../types/auth';

interface AuthProvilderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProvilderProps) {
  const [user, setUser] = useState<IUser | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges(currentUser => {
      setUser(currentUser);
      setIsLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const register = async (credentials: RegisterCredentials): Promise<void> => {
    const registeredUser = await registerUser(credentials);
    setUser(registeredUser);
  };

  const login = async (credentials: LoginCredentials): Promise<void> => {
    const loggedUser = await loginUser(credentials);
    setUser(loggedUser);
  };

  const logout = async (): Promise<void> => {
    await logoutUser();
    setUser(null);
  };

  const value = {
    user,
    isAuth: Boolean(user),
    isLoading,
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
