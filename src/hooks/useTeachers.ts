import { useQuery } from '@tanstack/react-query';

import { getTeachers } from '../services/teachers/teacherService';
import type { GetTeachersParams } from '../types/teacher';

export const useTeachers = ({
  page = 1,
  limit = 4,
  filters,
}: GetTeachersParams) => {
  return useQuery({
    queryKey: ['teachers', page, limit, filters],
    queryFn: () =>
      getTeachers({
        page,
        limit,
        filters,
      }),
  });
};
