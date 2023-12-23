import { defineField, defineType } from "sanity";

export default defineType({
  name: "massageBooking",
  title: "Massage Booking",
  type: "document",
  fields: [
    defineField({
      name: "massageService",
      title: "Massage Service",
      type: "reference",
      to: [{ type: "massageService" }],
    }),
    defineField({
      name: "bookingDate",
      title: "Booking Date",
      type: "date",
    }),
    defineField({
      name: "startTime",
      title: "Start Time",
      type: "string",
    }),
  ],
});
