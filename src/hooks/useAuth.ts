import { AuthContext } from '../context/authContext';

import { useContext } from 'react';

import {toast} from 'react-hot-toast'

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    toast.error('useAuth must be used within AuthProvider', {
      position: 'top-right',
    })
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
