import { prismaService } from "../prisma";

const findById = async (id: number) => {
  return prismaService.teacher.findUnique({ where: { id } });
};

export default {
  findById,
};
