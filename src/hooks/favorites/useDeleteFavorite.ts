import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteTeacherFromFavorites } from '../../services/favorites/favoritesService';

export const useDeleteFavorite = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (teacherId: string) =>
      deleteTeacherFromFavorites(teacherId, userId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['favorites', userId],
      });
    },
  });
};
