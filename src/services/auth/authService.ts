import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
  type Unsubscribe,
  updateProfile,
} from 'firebase/auth';

import { auth } from '../../api/firebase';

import type {
  LoginCredentials,
  RegisterCredentials,
  IUser,
} from '../../types/auth';

const mapFireBaseUser = (user: User): IUser => {
  return {
    userId: user.uid,
    displayName: user.displayName,
    email: user.email,
    photoUrl: user.photoURL,
  };
};

export const registerUser = async ({
  name,
  email,
  password,
}: RegisterCredentials): Promise<IUser> => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  await updateProfile(userCredential.user, { displayName: name });

  return mapFireBaseUser(userCredential.user);
};

export const loginUser = async ({
  email,
  password,
}: LoginCredentials): Promise<IUser> => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  return mapFireBaseUser(userCredential.user);
};

export const logoutUser = async (): Promise<void> => {
  await signOut(auth);
};

export const subscribeToAuthChanges = (
  callback: (user: IUser | null) => void
): Unsubscribe => {
  return onAuthStateChanged(auth, firebaseUser => {
    callback(firebaseUser ? mapFireBaseUser(firebaseUser) : null);
  });
};
