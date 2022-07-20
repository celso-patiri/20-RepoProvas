import { NotFoundException } from "../common/exceptions";
import { CreateTestDto } from "../interfaces/models";

import categoryService from "./categories.service";
import disciplinesService from "./disciplines.service";
import teachersService from "./teachers.service";
import termsService from "./terms.service";

import testsRepository from "../repositories/tests.repository";

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

const getAllByDiscipline = async () => {
  return termsService.getAllTestsByDisciplines();
};

export default {
  create,
  getAllByDiscipline,
};
