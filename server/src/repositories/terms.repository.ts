import { prismaService } from "../prisma";

const getAllDisciplinesAndTests = async () => {
  return prismaService.term.findMany({
    select: {
      number: true,
      Disciplines: {
        select: {
          name: true,
          TeachersDiscipline: {
            select: {
              Teacher: {
                select: {
                  name: true,
                },
              },
              Test: {
                select: {
                  name: true,
                  createdAt: true,
                  Category: {
                    select: { name: true },
                  },
                },
                orderBy: { categoryId: "asc" },
              },
            },
            where: {
              Test: { some: { id: { not: undefined } } },
            },
          },
        },
      },
    },
    orderBy: { number: "asc" },
  });
};

export default {
  getAllDisciplinesAndTests,
};
