import styles from "./page.module.css";
import Card from "./components/Card/Card";
import Tabs from "./components/Tabs/Tabs";
import { client } from "../../sanity/lib/client";
import { groq } from "next-sanity";
import { Booking } from "@/types/Booking";
import EmptyState from "./components/EmptyState/EmptyState";
import { format } from "date-fns";

const BookingList: React.FC<{ bookings: Booking[] }> = ({ bookings }) => {
  return (
    <div className={styles.cards}>
      {bookings.length ? (
        bookings.map((booking: Booking) => (
          <Card
            key={booking._id}
            title={booking.massageService?.name}
            subtitle={
              format(new Date(booking.bookingDate), "E dd LLLL Y") +
              ", " +
              booking.startTime
            }
            route={`/booking/${booking._id}`}
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

const Page: React.FC = async () => {
  const query = groq`*[_type == "massageBooking"] {...,massageService->{...}}`;
  const bookings: Booking[] = await client.fetch(query);

  const upcomingBookings: Booking[] = [];
  const completedBookings: Booking[] = [];

  for (const booking of bookings) {
    if (booking.bookingDate > new Date()) {
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
