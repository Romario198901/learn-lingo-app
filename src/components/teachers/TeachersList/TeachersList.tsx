import TeacherCard from '../TeacherCard/TeacherCard';

import type { Teacher } from '../../../types/teacher';
import css from './TeachersList.module.css';

interface TeachersListProps {
  teachers: Teacher[];
  favoriteTeacherIds: string[];
  onFavoriteToggle: (teacherId: string) => void;
}

export default function TeachersList({
  teachers,
  favoriteTeacherIds,
  onFavoriteToggle,
}: TeachersListProps) {
  return (
    <ul className={css.list}>
      {teachers.map(teacher => {
        const isFavorite = favoriteTeacherIds.includes(teacher.id);

        return (
          <li className={css.item} key={teacher.id}>
            <TeacherCard
              teacher={teacher}
              isFavorite={isFavorite}
              onFavoriteToggle={onFavoriteToggle}
            />
          </li>
        );
      })}
    </ul>
  );
}
