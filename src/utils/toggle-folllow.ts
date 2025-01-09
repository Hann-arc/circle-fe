import { number, z } from "zod";

export const toggleFollowSchema = z.object({
    followingId: number()
  })
;

export type toggleFollow = z.infer<typeof toggleFollowSchema>;