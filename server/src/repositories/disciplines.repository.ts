import { prismaService } from "../prisma";

const findById = async (id: number) => {
  return prismaService.discipline.findUnique({ where: { id } });
};

export default {
  findById,
};
