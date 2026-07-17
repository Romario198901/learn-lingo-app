import { useQuery } from '@tanstack/react-query';

import { getFavoritesTeachersIds } from '../../services/favorites/favoritesService';

export const useFavorites = (userId?: string) => {
  return useQuery({
    queryKey: ['favorites', userId],
    queryFn: () => getFavoritesTeachersIds(userId!),
    enabled: Boolean(userId),
  });
};
