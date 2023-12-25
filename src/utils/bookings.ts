import { Booking } from "@/types/Booking";
import { massageServices } from "./massageServices";

export const getBookings: Booking[] = [
  {
    id: "1",
    bookingDate: new Date(),
    startTime: "20:00",
    massageService: massageServices[0],
  },
  {
    id: "2",
    bookingDate: new Date(),
    startTime: "21:00",
    massageService: massageServices[0],
  },
];
