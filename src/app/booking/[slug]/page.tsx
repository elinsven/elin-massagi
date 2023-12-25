import EmptyState from "@/components/EmptyState/EmptyState";
import { Booking } from "@/types/Booking";
import { getBookings } from "@/utils/bookings";
import { format } from "date-fns";

const Page: React.FC<{ params: { slug: string } }> = ({ params }) => {
  const booking = getBookings.find((booking: Booking) => {
    return booking.id === params.slug;
  });

  return (
    <section>
      {booking ? (
        <>
          <h1>{booking?.massageService.name}</h1>
          <p className="subtitle">
            {` Date: ${format(
              new Date(booking?.bookingDate as Date),
              "E dd LLLL Y"
            )},
          ${booking?.startTime}`}
          </p>
        </>
      ) : (
        <EmptyState title="Booking not found" body="Could not find booking" />
      )}
    </section>
  );
};

export default Page;
