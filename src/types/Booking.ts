export interface Booking {
  booking: {
    booking_date: Date;
    booking_id: number;
    massage_service_id: number;
    start_time: string;
    massage_service: {
      description: string;
      name: string;
      duration: number;
      massage_service_id: number;
    };
  };
}
