import { CreateTestDto } from "../interfaces/models";
import { prismaService } from "../prisma";

const create = async (data: CreateTestDto) => {
  const { disciplineId, teacherId, categoryId, ...test } = data;

  await prismaService.test.create({
    data: {
      ...test,
      Category: {
        connect: {
          id: categoryId,
        },
      },
      TeacherDiscipline: {
        connectOrCreate: {
          where: { teacherId_disciplineId: { teacherId, disciplineId } },
          create: { teacherId, disciplineId },
        },
      },
    },
  });
};

export default {
  create,
};
