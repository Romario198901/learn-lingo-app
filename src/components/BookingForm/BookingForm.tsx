import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import Button from '../ui/Button/Button';
import Input from '../ui/Input/Input';

import { useCreateBooking } from '../../hooks/useCreateBooking';
import { bookingSchema } from '../../schemas/bookingSchema';
import { LEARNING_REASONS } from '../../constants/booking';

import type { BookingFormValues } from '../../types/booking';
import type { Teacher } from '../../types/teacher';

import css from './BookingForm.module.css';

interface BookingFormProps {
  teacher: Teacher;
  onSuccess?: () => void;
}

export default function BookingForm({ teacher, onSuccess }: BookingFormProps) {
  const createBookingMutation = useCreateBooking();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: yupResolver(bookingSchema),
    defaultValues: {
      reason: '',
      fullName: '',
      email: '',
      phone: '',
    },
  });

  const onSubmit = (values: BookingFormValues) => {
    createBookingMutation.mutate(
      {
        teacherId: teacher.id,
        teacherName: `${teacher.name} ${teacher.surname}`,
        ...values,
      },
      {
        onSuccess: () => {
          toast.success('Trial lesson booked successfully');
          reset();
          onSuccess?.();
        },
        onError: () => {
          toast.error('Failed to book trial lesson');
        },
      }
    );
  };

  return (
    <div className={css.wrapper}>
      <div className={css.header}>
        <h2 className={css.title}>Book trial lesson</h2>

        <p className={css.description}>
          Our experienced tutor will assess your current language level, discuss
          your learning goals, and tailor the lesson to your specific needs.
        </p>
      </div>

      <div className={css.teacher}>
        <img
          className={css.teacherAvatar}
          src={teacher.avatar_url}
          alt={`${teacher.name} ${teacher.surname}`}
        />

        <div>
          <p className={css.teacherLabel}>Your teacher</p>

          <p className={css.teacherName}>
            {teacher.name} {teacher.surname}
          </p>
        </div>
      </div>

      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <fieldset className={css.reasonsFieldset}>
          <legend className={css.reasonsTitle}>
            What is your main reason for learning{' '}
            {teacher.languages.join(' or ')}?
          </legend>

          <div className={css.reasonsList}>
            {LEARNING_REASONS.map(reason => (
              <label className={css.reasonLabel} key={reason}>
                <input
                  className={css.reasonInput}
                  type="radio"
                  value={reason}
                  {...register('reason')}
                />

                <span className={css.customRadio}></span>

                <span>{reason}</span>
              </label>
            ))}
          </div>

          {errors.reason?.message && (
            <p className={css.errorText}>{errors.reason.message}</p>
          )}
        </fieldset>

        <div className={css.inputs}>
          <Input
            placeholder="Full Name"
            error={errors.fullName?.message}
            {...register('fullName')}
          />

          <Input
            type="email"
            placeholder="Email"
            error={errors.email?.message}
            {...register('email')}
          />

          <Input
            type="tel"
            placeholder="Phone number"
            error={errors.phone?.message}
            {...register('phone')}
          />
        </div>

        <Button
          type="submit"
          className={css.submitButton}
          disabled={createBookingMutation.isPending}
        >
          {createBookingMutation.isPending ? 'Booking...' : 'Book'}
        </Button>
      </form>
    </div>
  );
}
