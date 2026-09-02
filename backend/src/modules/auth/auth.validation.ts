import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2).max(100),

  email: z.email(),

  password: z.string().min(8).max(100),

  phone: z.string().min(7).max(30).optional(),

  businessName: z.string().min(2).max(200).optional(),
});

export const loginSchema = z.object({
  email: z.email(),

  password: z.string().min(1),
});