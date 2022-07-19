import { NotFoundException } from "../common/exceptions";
import { CreateTestDto } from "../interfaces/models";
import testsRepository from "../repositories/tests.repository";
import categoryService from "./categories.service";
import disciplinesService from "./disciplines.service";
import teachersService from "./teachers.service";

const create = async (test: CreateTestDto) => {
  const { categoryId, teacherId, disciplineId } = test;

  const existingCategory = await categoryService.findById(categoryId);
  if (!existingCategory) throw new NotFoundException("Category not registered");

  const existingTeacher = await teachersService.findById(teacherId);
  if (!existingTeacher) throw new NotFoundException("Teacher not registered");

  const existingDiscipline = await disciplinesService.findById(disciplineId);
  if (!existingDiscipline) throw new NotFoundException("Discipline not registered");

  await testsRepository.create(test);
};

export default {
  create,
};
