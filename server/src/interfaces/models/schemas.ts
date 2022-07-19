import { z } from "zod";

export { User } from "@prisma/client";

export const SignUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(10),
});

export type SignUserDto = z.infer<typeof SignUserSchema>;
export type DecodedJwt = { id: string; email: string };
