import categoriesRepository from "../repositories/categories.repository";

const findById = async (id: number) => categoriesRepository.findById(id);

export default {
  findById,
};
