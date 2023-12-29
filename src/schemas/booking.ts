import { z } from "zod";

export const bookingSchema = z.object({
  booking_id: z.optional(z.number()),
  booking_date: z.string(),
  start_time: z.string(),
  massage_service_id: z.number(),
});

export type Booking = z.infer<typeof bookingSchema>;
