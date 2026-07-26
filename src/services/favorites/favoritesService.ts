import { get, ref, remove, set } from 'firebase/database';

import { database } from '../../api/firebase';

export type FavoritesResponse = Record<string, true>;

export const getFavoritesTeachersIds = async (
  userId: string
): Promise<string[]> => {
  const favoritesRef = ref(database, `users/${userId}/favorites`);

  const snapshot = await get(favoritesRef);

  if (!snapshot.exists()) {
    return [];
  }

  const favorites = snapshot.val() as FavoritesResponse;

  return Object.keys(favorites);
};

export const addTeacherToFavorites = async (
  teacherId: string,
  userId: string
): Promise<void> => {
  const favoriteRef = ref(database, `users/${userId}/favorites/${teacherId}`);

  await set(favoriteRef, true);
};

export const deleteTeacherFromFavorites = async (
  teacherId: string,
  userId: string
): Promise<void> => {
  const favoriteRef = ref(database, `users/${userId}/favorites/${teacherId}`);

  await remove(favoriteRef);
};
