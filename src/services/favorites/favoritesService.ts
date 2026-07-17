import axios from 'axios';
import { getFireBaseUrl } from '../../api/firebaseRest';

export type FavoritesResponse = Record<string, true>;

export const getFavoritesTeachersIds = async (
  userId: string
): Promise<string[]> => {
  const { data } = await axios.get<FavoritesResponse | null>(
    getFireBaseUrl(`users/${userId}/favorites`)
  );

  if (!data) return [];

  return Object.keys(data);
};

export const addTeacherToFavorites = async (
  teacherId: string,
  userId: string
): Promise<void> => {
  await axios.put(
    getFireBaseUrl(`users/${userId}/favorites/${teacherId}`),
    true
  );
};

export const deleteTeacherFromFavorites = async (
  teacherId: string,
  userId: string
): Promise<void> => {
  await axios.delete(getFireBaseUrl(`users/${userId}/favorites/${teacherId}`));
};
