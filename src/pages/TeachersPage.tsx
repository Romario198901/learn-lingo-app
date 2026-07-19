import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';

import css from './TeachersPage.module.css';

import TeachersList from '../components/teachers/TeachersList/TeachersList';
import Loader from '../components/Loader/Loader';
import Modal from '../components/ui/Modal/Modal';
import Select, { type SelectOption } from '../components/ui/Select/Select';
import BookingForm from '../components/BookingForm/BookingForm';
import Button from '../components/ui/Button/Button';

import { useAuth } from '../hooks/useAuth';
import { useTeachers } from '../hooks/useTeachers';
import { useFavorites } from '../hooks/favorites/useFavorites';
import { useAddFavorite } from '../hooks/favorites/useAddFavorite';
import { useDeleteFavorite } from '../hooks/favorites/useDeleteFavorite';

import type { Teacher } from '../types/teacher';

export default function TeachersPage() {
  const [selectedLanguage, setSelectedLanguage] = useState<SelectOption | null>(
    null
  );

  const [selectedLevel, setSelectedLevel] = useState<SelectOption | null>(null);

  const [selectedPrice, setSelectedPrice] = useState<SelectOption | null>(null);

  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

  const { user } = useAuth();

  const userId = user?.userId;

  const {
    data,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useTeachers({
    limit: 4,
    filters: {
      language: selectedLanguage?.value,
      level: selectedLevel?.value,
      price: selectedPrice ? Number(selectedPrice.value) : undefined,
    },
  });

  const { data: favoriteTeacherIds = [] } = useFavorites(userId);

  const addFavoriteMutation = useAddFavorite(userId ?? '');
  const deleteFavoriteMutation = useDeleteFavorite(userId ?? '');

  const { teachers, languageOptions, levelOptions, priceOptions } =
    useMemo(() => {
      if (!data) {
        return {
          teachers: [],
          languageOptions: [],
          levelOptions: [],
          priceOptions: [],
        };
      }

      const firstPage = data.pages[0];

      const teachers = data.pages.flatMap(page => page.teachers);

      const languageOptions: SelectOption[] =
        firstPage?.availableLanguages.map(language => ({
          value: language,
          label: language,
        })) ?? [];

      const levelOptions: SelectOption[] =
        firstPage?.availableLevels.map(level => ({
          value: level,
          label: level,
        })) ?? [];

      const priceOptions: SelectOption[] =
        firstPage?.availablePrices.map(price => ({
          value: String(price),
          label: `${price} $`,
        })) ?? [];

      return {
        teachers,
        languageOptions,
        levelOptions,
        priceOptions,
      };
    }, [data]);

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

  const handleBookTrial = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
  };

  const handleCloseBooking = () => {
    setSelectedTeacher(null);
  };

  const handleLoadMore = () => {
    fetchNextPage();
  };

  if (isPending) {
    return <Loader />;
  }

  if (isError || !data) {
    return (
      <p className={css.errorMessage}>
        Something went wrong. Please try again later.
      </p>
    );
  }

  return (
    <main className={css.page}>
      <div className={css.filters}>
        <Select
          className={css.filterLanguage}
          label="Languages"
          placeholder="Language"
          options={languageOptions}
          value={selectedLanguage}
          onChange={setSelectedLanguage}
        />

        <Select
          className={css.filterLevel}
          label="Level of knowledge"
          placeholder="Level"
          options={levelOptions}
          value={selectedLevel}
          onChange={setSelectedLevel}
        />

        <Select
          className={css.filterPrice}
          label="Price"
          placeholder="Price"
          options={priceOptions}
          value={selectedPrice}
          onChange={setSelectedPrice}
        />
      </div>

      {teachers.length > 0 ? (
        <>
          <TeachersList
            teachers={teachers}
            favoriteTeacherIds={favoriteTeacherIds}
            onFavoriteToggle={handleFavoriteToggle}
            onBookTrial={handleBookTrial}
          />

          {hasNextPage && (
            <div className={css.loadMore}>
              <Button
                className={css.loadMoreButton}
                onClick={handleLoadMore}
                disabled={isFetchingNextPage}
              >
                {isFetchingNextPage ? 'Loading...' : 'Load more'}
              </Button>
            </div>
          )}
        </>
      ) : (
        <p className={css.emptyState}>
          No teachers found matching your filters.
        </p>
      )}

      <Modal isOpen={selectedTeacher !== null} onClose={handleCloseBooking}>
        {selectedTeacher && (
          <BookingForm
            teacher={selectedTeacher}
            onSuccess={handleCloseBooking}
          />
        )}
      </Modal>
    </main>
  );
}
