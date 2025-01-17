import { z } from "zod";

export const createThreadSchema = z.object({
  content: z.string(),
  media: z.any()
  })
;

export type CreateThread = z.infer<typeof createThreadSchema>;
