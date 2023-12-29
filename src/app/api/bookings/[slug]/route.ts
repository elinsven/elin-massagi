import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { rows } = await sql`SELECT
      JSON_BUILD_OBJECT(
          'booking_id', bookings.booking_id,
          'start_time', bookings.start_time,
          'booking_date', bookings.booking_date,
          'massage_service_id', bookings.massage_service_id,
          'massage_service', JSON_BUILD_OBJECT(
              'massage_service_id', massage_services.massage_service_id,
              'duration', massage_services.duration,
              'name', massage_services.name,
              'description', massage_services.description
          )
      ) AS booking
  FROM
      bookings
  JOIN
      massage_services ON bookings.massage_service_id = massage_services.massage_service_id
  WHERE
      bookings.booking_id = ${params.slug};`;

    return NextResponse.json({ booking: rows[0] }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
