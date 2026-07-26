import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import Button from '../../ui/Button/Button';
import Input from '../../ui/Input/Input';
import { useAuth } from '../../../hooks/useAuth';
import { registrationSchema } from '../../../schemas/authSchemas';
import type { RegistrationFormValues } from '../../../types/authForms';

import css from './RegistrationForm.module.css';
import toast from 'react-hot-toast';

interface RegistrationFormProps {
  onSuccess?: () => void;
}

export default function RegistrationForm({ onSuccess }: RegistrationFormProps) {
  const { register: registerUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationFormValues>({
    resolver: yupResolver(registrationSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: RegistrationFormValues) => {
    try {
      await registerUser(values);
      toast.success('Welcome! Your account has been created.');
      onSuccess?.();
    } catch {
      toast.error('Registration failed. Please check your details and try again.');
    }
  };

  return (
    <div className={css.wrapper}>
      <div className={css.header}>
        <h2 className={css.title}>Registration</h2>
        <p className={css.text}>
          Thank you for your interest in our platform! In order to register, we
          need some information. Please provide us with the following
          information
        </p>
      </div>

      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          placeholder="Name"
          error={errors.name?.message}
          {...register('name')}
        />

        <Input
          type="email"
          placeholder="Email"
          error={errors.email?.message}
          {...register('email')}
        />

        <Input
          type="password"
          placeholder="Password"
          error={errors.password?.message}
          {...register('password')}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className={css.submitButton}
        >
          {isSubmitting ? 'Loading...' : 'Sign Up'}
        </Button>
      </form>
    </div>
  );
}
