import { mapCategoriesToDiscipline } from "../common/utils/tests/formatting";
import termsRepository from "../repositories/terms.repository";

const getAllTestsByDisciplines = async () => {
  const terms = await termsRepository.getAllDisciplinesAndTests();

  return {
    terms: terms.map((term) => {
      const { number, Disciplines } = term;

      const disciplines = mapCategoriesToDiscipline(Disciplines);

      return {
        number,
        disciplines,
      };
    }),
  };
};

export default {
  getAllTestsByDisciplines,
};
