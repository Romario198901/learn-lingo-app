import { push, ref, set } from 'firebase/database';

import { database } from '../../api/firebase';

import type {
  BookingRequest,
  CreatedBookingRequest,
} from '../../types/booking';

export const createBookingRequest = async (
  payload: CreatedBookingRequest
): Promise<BookingRequest> => {
  const bookingData = {
    ...payload,
    createdAt: Date.now(),
  };

  const bookingRequestsRef = ref(database, 'bookingRequests');

  const newBookingRef = push(bookingRequestsRef);

  await set(newBookingRef, bookingData);

  return {
    id: newBookingRef.key!,
    ...bookingData,
  };
};
