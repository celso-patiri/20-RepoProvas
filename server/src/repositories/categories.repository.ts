import { prismaService } from "../prisma";

const findById = async (id: number) => {
  return prismaService.category.findUnique({ where: { id } });
};

export default {
  findById,
};
