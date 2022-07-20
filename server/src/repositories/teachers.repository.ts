import { prismaService } from "../prisma";

const findById = async (id: number) => {
  return prismaService.teacher.findUnique({ where: { id } });
};

const getAllTestsGroupByTeacher = async () => {
  return prismaService.teacher.findMany({
    select: {
      name: true,
      TeacherDisciplines: {
        select: {
          Discipline: { select: { name: true } },
          Test: {
            select: {
              name: true,
              createdAt: true,
              Category: { select: { name: true } },
            },
          },
        },
        where: { Test: { some: { id: { not: undefined } } } },
      },
    },
  });
};

export default {
  findById,
  getAllTestsGroupByTeacher,
};
