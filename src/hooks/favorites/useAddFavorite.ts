import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { addTeacherToFavorites } from '../../services/favorites/favoritesService';

export const useAddFavorite = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (teacherId: string) => addTeacherToFavorites(teacherId, userId),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['favorites', userId],
      });

      toast.success('Teacher added to favorites.');
    },

    onError: () => {
      toast.error('Failed to add teacher to favorites.');
    },
  });
};
