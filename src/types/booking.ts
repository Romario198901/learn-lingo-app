export interface CreatedBookingRequest {
  teacherId: string;
  teacherName: string;
  reason: string;
  fullName: string;
  email: string;
  phone: string;
}

export interface BookingRequest extends CreatedBookingRequest {
  id: string;
  createdAt: number;
}

export interface BookingFormValues {
  reason: string;
  fullName: string;
  email: string;
  phone: string;
}
