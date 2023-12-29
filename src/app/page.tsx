"use client";

import styles from "./page.module.css";
import Card from "../components/Card/Card";
import Tabs from "../components/Tabs/Tabs";
import EmptyState from "../components/EmptyState/EmptyState";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { getBookings } from "./services/booking";
import { Booking } from "@/types/Booking";

const BookingList: React.FC<{ bookings: Booking[] }> = ({ bookings }) => {
  return (
    <div className={styles.cards}>
      {bookings.length ? (
        bookings.map((booking: Booking) => (
          <Card
            key={booking.booking.booking_id}
            title={booking.booking.massage_service.name}
            subtitle={
              format(new Date(booking.booking.booking_date), "E dd LLLL Y") +
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
    </div>
  );
};

const Page: React.FC = () => {
  const [data, setData] = useState<{ bookings: Booking[] }>({
    bookings: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setData(await getBookings());
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchData();
  }, []);

  const upcomingBookings: Booking[] = [];
  const completedBookings: Booking[] = [];

  for (const booking of data?.bookings) {
    if (new Date(booking.booking.booking_date) > new Date()) {
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
            content: <BookingList bookings={upcomingBookings} />,
          },
          {
            id: "tab-completed",
            title: "Completed",
            content: <BookingList bookings={completedBookings} />,
          },
        ]}
      />
    </section>
  );
};

export default Page;
