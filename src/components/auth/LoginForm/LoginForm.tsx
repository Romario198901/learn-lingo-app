import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import Button from '../../ui/Button/Button';
import Input from '../../ui/Input/Input';
import { useAuth } from '../../../hooks/useAuth';
import { loginSchema } from '../../../schemas/authSchemas';
import type { LoginFormValues } from '../../../types/authForms';

import css from './LoginForm.module.css';
import toast from 'react-hot-toast';

interface LoginFormProps {
  onSuccess?: () => void;
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      await login(values);
      toast.success('You have successfully signed in.');
      onSuccess?.();
    } catch {
      toast.error('Invalid email or password.');
    }
  };

  return (
    <div className={css.wrapper}>
      <div className={css.header}>
        <h2 className={css.title}>Log In</h2>
        <p className={css.text}>
          Welcome back! Please enter your credentials to access your account and
          continue your search for a teacher.
        </p>
      </div>

      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
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
          {isSubmitting ? 'Loading...' : 'Log In'}
        </Button>
      </form>
    </div>
  );
}
