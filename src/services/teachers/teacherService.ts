import axios from 'axios';

import { getFireBaseUrl } from '../../api/firebaseRest';
import type { Teacher, TeachersResponse } from '../../types/teacher';

const mapTeachers = (data: TeachersResponse | null): Teacher[] => {
  if (!data) return [];

  return Object.entries(data).map(([id, teacher]) => ({
    id,
    ...teacher,
  }));
};

export const getTeachers = async (): Promise<Teacher[]> => {
  const { data } = await axios.get<TeachersResponse | null>(
    getFireBaseUrl('teachers')
  );
console.log(data);
  return mapTeachers(data);
};
