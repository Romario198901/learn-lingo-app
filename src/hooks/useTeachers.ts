import { useInfiniteQuery } from '@tanstack/react-query';

import { getTeachers } from '../services/teachers/teacherService';
import type { TeachersFilters } from '../types/teacher';

interface UseTeachersParams {
  limit?: number;
  filters?: TeachersFilters;
}

export const useTeachers = ({ limit = 4, filters }: UseTeachersParams = {}) => {
  return useInfiniteQuery({
    queryKey: ['teachers', limit, filters],

    queryFn: ({ pageParam }) =>
      getTeachers({
        page: pageParam,
        limit,
        filters,
      }),

    initialPageParam: 1,

    getNextPageParam: lastPage => {
      if (!lastPage.hasMore) {
        return undefined;
      }

      return lastPage.page + 1;
    },
  });
};
