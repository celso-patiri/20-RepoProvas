export * from "./schemas";

import { Term, Teacher, Category, Discipline, TeacherDiscipline } from "@prisma/client";

export type CreateTermDto = Omit<Term, "id" | "createdAt" | "updatedAt">;
export type CreateTeacherDto = Omit<Teacher, "id" | "createdAt" | "updatedAt">;
export type CreateDisciplineDto = Omit<Discipline, "id" | "createdAt" | "updatedAt">;
export type CreateCategoryDto = Omit<Category, "id" | "createdAt" | "updatedAt">;

export type CreateTeacherDisciplineDto = Omit<
  TeacherDiscipline,
  "id" | "createdAt" | "updatedAt"
>;
