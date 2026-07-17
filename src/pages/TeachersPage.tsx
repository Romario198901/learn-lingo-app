import toast from 'react-hot-toast';

import TeachersList from '../components/teachers/TeachersList/TeachersList';

import { useAuth } from '../hooks/useAuth';
import { useTeachers } from '../hooks/useTeachers';
import { useFavorites } from '../hooks/favorites/useFavorites';
import { useAddFavorite } from '../hooks/favorites/useAddFavorite';
import { useDeleteFavorite } from '../hooks/favorites/useDeleteFavorite';

export default function TeachersPage() {
  const { user } = useAuth();

  const userId = user?.userId;

  const { data, isPending, isError } = useTeachers({
    page: 1,
    limit: 4,
  });

  const { data: favoriteTeacherIds = [] } = useFavorites(userId);

  const addFavoriteMutation = useAddFavorite(userId ?? '');

  const deleteFavoriteMutation = useDeleteFavorite(userId ?? '');

  const handleFavoriteToggle = (teacherId: string) => {
    if (!userId) {
      toast.error('This functionality is available only to authorized users.');

      return;
    }
    const isFavorite = favoriteTeacherIds.includes(teacherId);
    if (isFavorite) {
      deleteFavoriteMutation.mutate(teacherId);
      return;
    }

    addFavoriteMutation.mutate(teacherId);
  };

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (isError || !data) {
    return <p>Something went wrong.</p>;
  }

  return (
    <TeachersList
      teachers={data.teachers}
      favoriteTeacherIds={favoriteTeacherIds}
      onFavoriteToggle={handleFavoriteToggle}
    />
  );
}
