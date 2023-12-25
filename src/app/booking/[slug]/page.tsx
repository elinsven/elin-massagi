import { Booking } from "@/types/Booking";
import { groq } from "next-sanity";
import { client } from "../../../../sanity/lib/client";
import { format } from "date-fns";

const Page: React.FC<{
  params: { slug: string };
}> = async ({ params }) => {
  const query = groq`*[_id == "${params.slug}"]  {...,massageService->{...}}`;
  const booking: Booking[] = await client.fetch(query);

  return (
    <section>
      <h1>{booking[0].massageService.name}</h1>
      <p className="subtitle">
        {` Date: ${format(new Date(booking[0].bookingDate), "E dd LLLL Y")},
          ${booking[0].startTime}`}
      </p>
    </section>
  );
};

export default Page;
