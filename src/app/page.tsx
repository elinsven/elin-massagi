"use client";

import styles from "./page.module.css";
import Card from "../components/Card/Card";
import Tabs from "../components/Tabs/Tabs";
import EmptyState from "../components/EmptyState/EmptyState";
import { format, isAfter } from "date-fns";
import { useEffect, useState } from "react";
import { getBookings } from "./services/booking";
import { Booking } from "@/types/Booking";
import Skeleton from "@/components/Skeleton/Skeleton";

const BookingList: React.FC<{ bookings: Booking[]; isLoading: boolean }> = ({
  bookings,
  isLoading,
}) => {
  return (
    <div className={styles.cards}>
      {isLoading ? (
        <>
          <Skeleton height="4.5rem" width="100%" />
          <Skeleton height="4.5rem" width="100%" />
        </>
      ) : (
        <>
          {bookings.length ? (
            bookings.map((booking: Booking) => (
              <Card
                key={booking.booking.booking_id}
                title={booking.booking.massage_service.name}
                subtitle={
                  format(
                    new Date(booking.booking.booking_date),
                    "E dd LLLL Y"
                  ) +
                  ", " +
                  booking.booking.start_time
                }
                route={`/booking/${booking.booking.booking_id}`}
              />
            ))
          ) : (
            <EmptyState
              title="No Bookings Yet"
              body="Oh no! It seems there are no massage bookings scheduled right now. Feel free to book a relaxing massage session and treat yourself to some well-deserved pampering."
              buttonText="Book massage"
              url="/new-booking"
            />
          )}
        </>
      )}
    </div>
  );
};

const Page: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<{ bookings: Booking[] }>({
    bookings: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        setData(await getBookings());
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchData();
  }, []);

  const upcomingBookings: Booking[] = [];
  const completedBookings: Booking[] = [];

  for (const booking of data?.bookings) {
    const bookingDate: Date = new Date(booking.booking.booking_date);
    const [hours, minutes] = booking.booking.start_time.split(":");
    bookingDate.setHours(parseInt(hours));
    bookingDate.setMinutes(parseInt(minutes));

    if (isAfter(bookingDate, new Date())) {
      upcomingBookings.push(booking);
    } else {
      completedBookings.push(booking);
    }
  }

  return (
    <section>
      <h1>Welcome</h1>
      <p className="subtitle">
        Browse and manage your massage bookings with ease.
      </p>

      <Tabs
        tabs={[
          {
            id: "tab-upcoming",
            title: "Upcoming",
            content: (
              <BookingList bookings={upcomingBookings} isLoading={isLoading} />
            ),
          },
          {
            id: "tab-completed",
            title: "Completed",
            content: (
              <BookingList bookings={completedBookings} isLoading={isLoading} />
            ),
          },
        ]}
      />
    </section>
  );
};

export default Page;
