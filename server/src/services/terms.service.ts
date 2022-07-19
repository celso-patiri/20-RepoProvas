import termsRepository from "../repositories/terms.repository";

const getAllDisciplinesAndTests = async () => {
  return termsRepository.getAllDisciplinesAndTests();
};

export default {
  getAllDisciplinesAndTests,
};
