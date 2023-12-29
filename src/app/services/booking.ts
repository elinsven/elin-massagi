import { Booking } from "@/schemas/booking";
import axios from "axios";

const url = "/api/bookings";

export const getBookings = async () => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getBookingById = async (id: string) => {
  try {
    const { data } = await axios.get(`${url}/${id}`);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const createBooking = async (booking: Booking) => {
  try {
    const { data } = await axios.post(url, booking);
    return data;
  } catch (error) {
    console.error(error);
  }
};
