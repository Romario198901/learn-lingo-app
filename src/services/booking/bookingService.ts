import axios from 'axios';
import type {
  BookingRequest,
  CreatedBookingRequest,
} from '../../types/booking';
import { getFireBaseUrl } from '../../api/firebaseRest';

interface FireBaseCreateResponse {
  name: string;
}

export const createBookingRequest = async (
  payload: CreatedBookingRequest
): Promise<BookingRequest> => {
  const bookingData = {
    ...payload,
    createdAt: Date.now(),
  };

  const response = await axios.post<FireBaseCreateResponse>(
    getFireBaseUrl('bookingRequests'),
    bookingData
  );

  return {
    id: response.data.name,
    ...bookingData,
  };
};
