import teachersRepository from "../repositories/teachers.repository";

const findById = async (id: number) => teachersRepository.findById(id);

export default {
  findById,
};
