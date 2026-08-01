import { useMemo, useState } from 'react';

import BookingForm from '../components/BookingForm/BookingForm';
import Loader from '../components/Loader/Loader';
import TeachersList from '../components/teachers/TeachersList/TeachersList';
import Button from '../components/ui/Button/Button';
import Container from '../components/ui/Container/Container';
import Modal from '../components/ui/Modal/Modal';
import Select, { type SelectOption } from '../components/ui/Select/Select';

import { useDeleteFavorite } from '../hooks/favorites/useDeleteFavorite';
import { useFavoriteTeachers } from '../hooks/favorites/useFavoriteTeachers';
import { useFavorites } from '../hooks/favorites/useFavorites';
import { useAuth } from '../hooks/useAuth';

import type { Teacher } from '../types/teacher';

import css from './FavoritesPage.module.css';

export default function FavoritesPage() {
  const [selectedLanguage, setSelectedLanguage] = useState<SelectOption | null>(
    null
  );

  const [selectedLevel, setSelectedLevel] = useState<SelectOption | null>(null);

  const [selectedPrice, setSelectedPrice] = useState<SelectOption | null>(null);

  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

  const { user } = useAuth();

  const userId = user?.userId;

  const {
    data: favoriteTeacherIds = [],
    isPending: isFavoritesPending,
    isError: isFavoritesError,
  } = useFavorites(userId);

  const {
    data,
    isPending: isTeachersPending,
    isError: isTeachersError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFavoriteTeachers({
    teacherIds: favoriteTeacherIds,
    userId,
    limit: 4,
    filters: {
      language: selectedLanguage?.value,
      level: selectedLevel?.value,
      price: selectedPrice ? Number(selectedPrice.value) : undefined,
    },
  });

  const deleteFavoriteMutation = useDeleteFavorite(userId ?? '');

  const { favoriteTeachers, languageOptions, levelOptions, priceOptions } =
    useMemo(() => {
      if (!data) {
        return {
          favoriteTeachers: [],
          languageOptions: [],
          levelOptions: [],
          priceOptions: [],
        };
      }

      const firstPage = data.pages[0];

      const favoriteTeachers = data.pages.flatMap(page => page.teachers);

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
        favoriteTeachers,
        languageOptions,
        levelOptions,
        priceOptions,
      };
    }, [data]);

  const handleFavoriteToggle = (teacherId: string) => {
    if (!userId) {
      return;
    }

    deleteFavoriteMutation.mutate(teacherId);
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

  const isLoading =
    isFavoritesPending || (favoriteTeacherIds.length > 0 && isTeachersPending);

  const isError = isFavoritesError || isTeachersError;

  const hasFavorites = favoriteTeacherIds.length > 0;
  const hasResults = favoriteTeachers.length > 0;

  return (
    <section className={css.page}>
      <Container>
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <p className={css.errorMessage}>
            Something went wrong. Please try again later.
          </p>
        ) : (
          <>
            {hasFavorites && (
              <div className={css.filters}>
                <Select
                  className={css.filterLanguage}
                  label="Languages"
                  placeholder="Language"
                  options={languageOptions}
                  value={selectedLanguage}
                  onChange={setSelectedLanguage}
                  isClearable
                />

                <Select
                  className={css.filterLevel}
                  label="Level of knowledge"
                  placeholder="Level"
                  options={levelOptions}
                  value={selectedLevel}
                  onChange={setSelectedLevel}
                  isClearable
                />

                <Select
                  className={css.filterPrice}
                  label="Price"
                  placeholder="Price"
                  options={priceOptions}
                  value={selectedPrice}
                  onChange={setSelectedPrice}
                  isClearable
                />
              </div>
            )}

            {!hasFavorites ? (
              <div className={css.emptyState}>
                <h1 className={css.emptyTitle}>No favorite teachers yet</h1>

                <p className={css.emptyText}>
                  Add teachers to your favorites to find them quickly later.
                </p>
              </div>
            ) : hasResults ? (
              <>
                <TeachersList
                  teachers={favoriteTeachers}
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
              <p className={css.noResults}>
                No favorite teachers found matching your filters.
              </p>
            )}
          </>
        )}
      </Container>

      <Modal isOpen={selectedTeacher !== null} onClose={handleCloseBooking}>
        {selectedTeacher && (
          <BookingForm
            teacher={selectedTeacher}
            onSuccess={handleCloseBooking}
          />
        )}
      </Modal>
    </section>
  );
}
