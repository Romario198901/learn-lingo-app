import axios from 'axios';

import { getFireBaseUrl } from '../../api/firebaseRest';
import type {
  GetTeachersParams,
  GetTeachersResult,
  TeachersFilters,
  Teacher,
  TeachersResponse,
} from '../../types/teacher';

const mapTeachers = (data: TeachersResponse | null): Teacher[] => {
  if (!data) return [];

  if (Array.isArray(data)) {
    return data.map((teacher, index) => ({
      id: String(index),
      ...teacher,
    }));
  }
  return Object.entries(data).map(([id, teacher]) => ({
    id,
    ...teacher,
  }));
};

const filterTeachers = (
  teachers: Teacher[],
  filters?: TeachersFilters
): Teacher[] => {
  if (!filters) return teachers;

  return teachers.filter(teacher => {
    const matchesLanguage = filters.language
      ? teacher.languages.includes(filters.language)
      : true;

    const matchesLevel = filters.level
      ? teacher.levels.includes(filters.level)
      : true;

    const matchesPrice = filters.price
      ? teacher.price_per_hour <= filters.price
      : true;

    return matchesLanguage && matchesLevel && matchesPrice;
  });
};

export const getTeachers = async ({
  page = 1,
  limit = 4,
  filters,
}: GetTeachersParams): Promise<GetTeachersResult> => {
  const { data } = await axios.get<TeachersResponse | null>(
    getFireBaseUrl('teachers')
  );
  const teachers = mapTeachers(data);
  const filteredTeachers = filterTeachers(teachers, filters);

  const start = (page - 1) * limit;
  const end = start + limit;

  const paginatedTeachers = filteredTeachers.slice(start, end);

  return {
    teachers: paginatedTeachers,
    total: filteredTeachers.length,
    page,
    limit,
    hasMore: end < filteredTeachers.length,
  };
};

export const getTeacherById = async (
  teacherId: string
): Promise<Teacher | null> => {
  const { data } = await axios.get<Omit<Teacher, 'id'>>(
    getFireBaseUrl(`teachers/${teacherId}`)
  );
  if (!data) return null;

  return {
    id: teacherId,
    ...data,
  };
};
