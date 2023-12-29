import { z } from "zod";

export const massageServiceSchema = z.object({
  massage_service_id: z.optional(z.number()),
  duration: z.number(),
  name: z.string(),
  description: z.string(),
});

export type MassageService = z.infer<typeof massageServiceSchema>;
