import { z } from "zod";

export { User } from "@prisma/client";

export const SignUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const CreateTestSchema = z.object({
  name: z.string().min(2),
  pdfUrl: z.string().url(),
  categoryId: z.number(),
  disciplineId: z.number(),
  teacherId: z.number(),
});

export type SignUserDto = z.infer<typeof SignUserSchema>;
export type CreateTestDto = z.infer<typeof CreateTestSchema>;
export type DecodedJwt = { id: string; email: string };
