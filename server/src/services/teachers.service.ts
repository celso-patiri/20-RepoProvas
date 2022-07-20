import { mapTestsToCategories, ICategory } from "../common/utils/tests";
import teachersRepository from "../repositories/teachers.repository";

const findById = async (id: number) => teachersRepository.findById(id);

const getAllTestsGroupByTeacher = async () => {
  const results = await teachersRepository.getAllTestsGroupByTeacher();

  const teachers = results.map((teacher) => {
    const { name, TeacherDisciplines } = teacher;

    const categories: ICategory[] = [];

    TeacherDisciplines.forEach((teacherDiscipline) => {
      const { Discipline, Test: tests } = teacherDiscipline;
      const testCategories = mapTestsToCategories(tests, { discipline: Discipline.name });
      testCategories.forEach((category) => categories.push(category));
    });

    return {
      name,
      categories,
    };
  });

  return { teachers };
};

export default {
  findById,
  getAllTestsGroupByTeacher,
};
