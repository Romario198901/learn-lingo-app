import { useMutation } from '@tanstack/react-query';

import { createBookingRequest } from '../services/booking/bookingService';
import type { CreatedBookingRequest } from '../types/booking';

export const useCreateBooking = () => {
  return useMutation({
    mutationFn: (bookingData: CreatedBookingRequest) =>
      createBookingRequest(bookingData),
  });
};
