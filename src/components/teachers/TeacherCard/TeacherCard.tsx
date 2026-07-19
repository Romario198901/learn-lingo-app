import { useState } from 'react';
import clsx from 'clsx';
import Button from '../../ui/Button/Button';

import type { Teacher } from '../../../types/teacher';
import css from './TeacherCard.module.css';

interface TeacherCardProps {
  teacher: Teacher;
  isFavorite: boolean;
  onFavoriteToggle: (teacherId: string) => void;
  onBookTrial: (teacher: Teacher) => void;
}

export default function TeacherCard({
  teacher,
  isFavorite,
  onFavoriteToggle,
  onBookTrial,
}: TeacherCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const {
    name,
    surname,
    avatar_url,
    languages,
    lesson_info,
    conditions,
    experience,
    rating,
    reviews,
    price_per_hour,
    lessons_done,
    levels,
  } = teacher;

  const handleFavoriteClick = () => {
    onFavoriteToggle(teacher.id);
  };

  return (
    <article className={css.card}>
      <div className={css.avatarWrapper}>
        <img
          className={css.avatar}
          src={avatar_url}
          alt={`${name} ${surname}`}
        />

        <svg
          className={css.statusIcon}
          width="12"
          height="12"
          aria-hidden="true"
        >
          <use href="/sprite.svg#icon-status" />
        </svg>
      </div>

      <div className={css.content}>
        <div className={css.header}>
          <div>
            <p className={css.eyebrow}>Languages</p>

            <h2 className={css.name}>
              {name} {surname}
            </h2>
          </div>

          <div className={css.headerActions}>
            <ul className={css.statistics}>
              <li className={css.statisticItem}>
                <svg
                  className={css.bookIcon}
                  width="16"
                  height="16"
                  aria-hidden="true"
                >
                  <use href="/sprite.svg#icon-book" />
                </svg>
                Lessons online
              </li>

              <li className={css.statisticItem}>
                Lessons done: {lessons_done}
              </li>

              <li className={css.statisticItem}>
                <svg
                  className={css.ratingIcon}
                  width="16"
                  height="16"
                  aria-hidden="true"
                >
                  <use href="/sprite.svg#icon-rating" />
                </svg>
                Rating: {rating.toFixed(1)}
              </li>

              <li className={css.statisticItem}>
                Price / 1 hour:{' '}
                <span className={css.price}>{price_per_hour}$</span>
              </li>
            </ul>

            <button
              className={css.favoriteButton}
              type="button"
              onClick={handleFavoriteClick}
              aria-label={
                isFavorite
                  ? `Remove ${name} ${surname} from favorites`
                  : `Add ${name} ${surname} to favorites`
              }
              aria-pressed={isFavorite}
            >
              <svg
                className={clsx(
                  css.favoriteIcon,
                  isFavorite && css.favoriteIconActive
                )}
                width="26"
                height="26"
                aria-hidden="true"
              >
                <use href="/sprite.svg#icon-heart" />
              </svg>
            </button>
          </div>
        </div>

        <dl className={css.details}>
          <div className={css.detailRow}>
            <dt className={css.detailLabel}>Speaks:</dt>
            <dd className={`${css.detailValue} ${css.language}`}>{languages.join(', ')}</dd>
          </div>

          <div className={css.detailRow}>
            <dt className={css.detailLabel}>Lesson Info:</dt>
            <dd className={css.detailValue}>{lesson_info}</dd>
          </div>

          <div className={css.detailRow}>
            <dt className={css.detailLabel}>Conditions:</dt>
            <dd className={css.detailValue}>{conditions.join(', ')}</dd>
          </div>
        </dl>

        {!isExpanded && (
          <Button
            className={css.readMoreButton}
            variant="ghost"
            onClick={() => setIsExpanded(true)}
          >
            Read more
          </Button>
        )}

        {isExpanded && (
          <>
            <p className={css.experience}>{experience}</p>

            <ul className={css.reviews}>
              {reviews.map(review => (
                <li
                  className={css.review}
                  key={`${review.reviewer_name}-${review.comment}`}
                >
                  <div className={css.reviewHeader}>
                    <div className={css.reviewAvatar}>
                      {review.reviewer_name.charAt(0).toUpperCase()}
                    </div>

                    <div className={css.reviewInfo}>
                      <p className={css.reviewerName}>{review.reviewer_name}</p>

                      <div className={css.reviewRating}>
                        <svg
                          className={css.ratingIcon}
                          width="16"
                          height="16"
                          aria-hidden="true"
                        >
                          <use href="/sprite.svg#icon-rating" />
                        </svg>

                        <span>{review.reviewer_rating.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>

                  <p className={css.reviewComment}>{review.comment}</p>
                </li>
              ))}
            </ul>
          </>
        )}

        <ul className={css.levels}>
          {levels.map(level => (
            <li className={css.level} key={level}>
              #{level}
            </li>
          ))}
        </ul>

        {isExpanded && (
          <Button
            className={css.bookButton}
            onClick={() => onBookTrial(teacher)}
          >
            Book trial lesson
          </Button>
        )}
      </div>
    </article>
  );
}
