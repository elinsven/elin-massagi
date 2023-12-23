import { type SchemaTypeDefinition } from "sanity";
import massageBooking from "./schemas/massageBooking";
import massageService from "./schemas/massageService";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [massageBooking, massageService],
};
