import axios from 'axios';

import { getFireBaseUrl } from '../../api/firebaseRest';
import type {
  GetTeachersParams,
  GetTeachersResult,
  TeachersFilters,
  Teacher,
  TeachersResponse,
} from '../../types/teacher';

interface GetTeachersByIdsParams extends GetTeachersParams {
  teacherIds: string[];
}

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

    const matchesPrice =
      filters.price !== undefined
        ? teacher.price_per_hour <= filters.price
        : true;

    return matchesLanguage && matchesLevel && matchesPrice;
  });
};

const getAvailableLanguages = (teachers: Teacher[]): string[] => {
  return [...new Set(teachers.flatMap(teacher => teacher.languages))].sort(
    (firstLanguage, secondLanguage) =>
      firstLanguage.localeCompare(secondLanguage)
  );
};

const getAvailableLevels = (teachers: Teacher[]): string[] => {
  return [...new Set(teachers.flatMap(teacher => teacher.levels))].sort(
    (firstLevel, secondLevel) => firstLevel.localeCompare(secondLevel)
  );
};

const getAvailablePrices = (teachers: Teacher[]): number[] => {
  return [...new Set(teachers.map(teacher => teacher.price_per_hour))].sort(
    (firstPrice, secondPrice) => firstPrice - secondPrice
  );
};

const buildTeachersResult = (
  teachers: Teacher[],
  page: number,
  limit: number,
  filters?: TeachersFilters
): GetTeachersResult => {
  const availableLanguages = getAvailableLanguages(teachers);
  const availableLevels = getAvailableLevels(teachers);
  const availablePrices = getAvailablePrices(teachers);

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
    availableLanguages,
    availableLevels,
    availablePrices,
  };
};

const fetchTeachers = async (): Promise<Teacher[]> => {
  const { data } = await axios.get<TeachersResponse | null>(
    getFireBaseUrl('teachers')
  );

  return mapTeachers(data);
};

export const getTeachers = async ({
  page = 1,
  limit = 4,
  filters,
}: GetTeachersParams): Promise<GetTeachersResult> => {
  const teachers = await fetchTeachers();

  return buildTeachersResult(teachers, page, limit, filters);
};

export const getTeacherById = async (
  teacherId: string
): Promise<Teacher | null> => {
  const { data } = await axios.get<Omit<Teacher, 'id'> | null>(
    getFireBaseUrl(`teachers/${teacherId}`)
  );

  if (!data) return null;

  return {
    id: teacherId,
    ...data,
  };
};

export const getTeachersByIds = async ({
  teacherIds,
  page = 1,
  limit = 4,
  filters,
}: GetTeachersByIdsParams): Promise<GetTeachersResult> => {
  if (teacherIds.length === 0) {
    return buildTeachersResult([], page, limit, filters);
  }

  const teachers = await fetchTeachers();

  const favoriteTeachers = teachers.filter(teacher =>
    teacherIds.includes(teacher.id)
  );

  return buildTeachersResult(favoriteTeachers, page, limit, filters);
};