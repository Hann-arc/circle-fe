import { z } from "zod";

export const registerFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Pasword must be at least 6 characters"),
  userName: z.string().min(4, "Username must be at least 4 characters"),
  fullName: z.string().min(4, "Fulll name must be at least 4 characters"),
});

export type RegisterForm = z.infer<typeof registerFormSchema>;
