import disciplinesRepository from "../repositories/disciplines.repository";

const findById = async (id: number) => disciplinesRepository.findById(id);

export default {
  findById,
};
