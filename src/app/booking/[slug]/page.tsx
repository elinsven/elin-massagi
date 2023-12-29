"use client";

import { getBookingById } from "@/app/services/booking";
import EmptyState from "@/components/EmptyState/EmptyState";
import { Booking } from "@/types/Booking";
import { format } from "date-fns";
import { useEffect, useState } from "react";

const Page: React.FC<{ params: { slug: string } }> = ({ params }) => {
  const [data, setData] = useState<{ booking: Booking | null }>({
    booking: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setData(await getBookingById(params.slug));
      } catch (error) {
        console.error("Error fetching booking:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section>
      {data.booking ? (
        <>
          <h1>{data.booking?.booking.massage_service.name}</h1>
          <p className="subtitle">
            {` Date: ${format(
              new Date(data.booking?.booking.booking_date),
              "E dd LLLL Y"
            )},
          ${data.booking?.booking.start_time}`}
          </p>
        </>
      ) : (
        <EmptyState title="Booking not found" body="Could not find booking" />
      )}
    </section>
  );
};

export default Page;
