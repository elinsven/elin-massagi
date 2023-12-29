import { bookingSchema } from "@/schemas/booking";
import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
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
      massage_services ON bookings.massage_service_id = massage_services.massage_service_id;`;

    return NextResponse.json({ bookings: rows }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const response = bookingSchema.safeParse(await request.json());

    if (!response.success) {
      return NextResponse.json(
        { error: { message: "Invalid request" } },
        { status: 400 }
      );
    }

    const { booking_date, start_time, massage_service_id } = response.data;
    const { rows } =
      await sql`INSERT INTO bookings (booking_date, start_time, massage_service_id) VALUES (${booking_date}, ${start_time}, ${massage_service_id}) RETURNING booking_id;`;

    return NextResponse.json(
      { booking_id: rows[0].booking_id },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
