import { SignUserDto } from "../interfaces/models";
import { prismaService } from "../prisma";

const findById = async (id: number) => {
  return prismaService.user.findUnique({ where: { id } });
};

const findByEmail = async (email: string) => {
  return prismaService.user.findUnique({ where: { email } });
};

const create = async (data: SignUserDto) => {
  return prismaService.user.create({ data });
};

export default {
  findById,
  findByEmail,
  create,
};
