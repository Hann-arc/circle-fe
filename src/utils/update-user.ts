import { z } from "zod";

export const updateUserProfileSchema = z.object({
  userName: z.string().optional(), 
  fullName: z.string().optional(),   
    bio: z.any(),   
    avatar: z.any(),  
    cover: z.any() 
});

export type UpdatePRofile = z.infer<typeof updateUserProfileSchema>;
