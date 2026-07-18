import * as yup from 'yup';

import type { BookingFormValues } from '../types/booking';

const PHONE_REGEXP = /^\+?[0-9\s()-]{10,20}$/;

export const bookingSchema: yup.ObjectSchema<BookingFormValues> = yup.object({
  reason: yup
    .string()
    .required('Please select your main reason for learning English'),

  fullName: yup
    .string()
    .trim()
    .min(2, 'Full name must contain at least 2 characters')
    .max(50, 'Full name must contain no more than 50 characters')
    .required('Full name is required'),

  email: yup
    .string()
    .trim()
    .email('Please enter a valid email address')
    .required('Email is required'),

  phone: yup
    .string()
    .trim()
    .matches(PHONE_REGEXP, 'Please enter a valid phone number')
    .required('Phone number is required'),
});
