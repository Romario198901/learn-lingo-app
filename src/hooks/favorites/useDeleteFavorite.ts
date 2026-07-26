import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { deleteTeacherFromFavorites } from '../../services/favorites/favoritesService';

export const useDeleteFavorite = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (teacherId: string) =>
      deleteTeacherFromFavorites(teacherId, userId),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['favorites', userId],
      });

      toast.success('Teacher removed from favorites.');
    },

    onError: () => {
      toast.error('Failed to remove teacher from favorites.');
    },
  });
};
