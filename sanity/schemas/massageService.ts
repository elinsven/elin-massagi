import { defineField, defineType } from "sanity";

export default defineType({
  name: "massageService",
  title: "Massage Service",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Service Name",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "duration",
      title: "Duration (in minutes)",
      type: "number",
    }),
  ],
});
