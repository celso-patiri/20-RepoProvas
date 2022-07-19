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
                },
              },
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
