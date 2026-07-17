import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addTeacherToFavorites } from '../../services/favorites/favoritesService';

export const useAddFavorite = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (teacherId: string) => addTeacherToFavorites(teacherId, userId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['favorites', userId],
      });
    },
  });
};
