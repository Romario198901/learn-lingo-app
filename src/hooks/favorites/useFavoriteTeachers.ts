import { useInfiniteQuery } from '@tanstack/react-query';

import { getTeachersByIds } from '../../services/teachers/teacherService';

import type { TeachersFilters } from '../../types/teacher';

interface UseFavoriteTeachersParams {
  teacherIds: string[];
  userId?: string;
  limit?: number;
  filters?: TeachersFilters;
}

export const useFavoriteTeachers = ({
  teacherIds,
  userId,
  limit = 4,
  filters,
}: UseFavoriteTeachersParams) => {
  return useInfiniteQuery({
    queryKey: [
      'favorite-teachers',
      userId,
      teacherIds,
      limit,
      filters,
    ],

    queryFn: ({ pageParam }) =>
      getTeachersByIds({
        teacherIds,
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

    enabled: Boolean(userId) && teacherIds.length > 0,
  });
};