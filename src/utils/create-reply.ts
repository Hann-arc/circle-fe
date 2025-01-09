import { z } from "zod";

export const createReplySchema = z.object({
  content: z.any(),
  media: z.any()
  })
;

export type createReply = z.infer<typeof createReplySchema>;
