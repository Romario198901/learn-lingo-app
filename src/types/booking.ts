export interface CreatedBookingRequest {
  userId: string;
  teacherId: string;
  name: string;
  email: string;
  phone: string;
  reason: string;
}

export interface BookingRequest extends CreatedBookingRequest {
  id: string;
  createdAt: number;
}
