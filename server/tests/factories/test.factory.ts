import { faker } from "@faker-js/faker";
import { prismaService } from "../../src/prisma";

export class TestFactory {
  teacherId: number;
  categoryId: number;
  disciplineId: number;

  constructor() {}

  async setup() {
    const { id: teacherId } = await prismaService.teacher.create({
      data: { name: faker.name.firstName() },
    });
    const { id: disciplineId } = await prismaService.discipline.create({
      data: {
        name: faker.word.noun(),
        Term: { create: { number: +faker.random.numeric(10) } },
      },
    });
    const { id: categoryId } = await prismaService.category.create({
      data: { name: faker.word.verb() },
    });

    this.teacherId = teacherId;
    this.categoryId = categoryId;
    this.disciplineId = disciplineId;
  }

  async newMockTest({
    nameLength = 6,
    invalidPdfUrl = false,
    invalidCategory = false,
    invalidDiscipline = false,
    invalidTeacher = false,
  } = {}) {
    const name = faker.internet.password(nameLength);
    let pdfUrl = faker.internet.url();
    let categoryId = this.categoryId;
    let teacherId = this.teacherId;
    let disciplineId = this.disciplineId;

    if (invalidPdfUrl) pdfUrl = faker.random.alpha();
    if (invalidCategory) categoryId = -1;
    if (invalidDiscipline) disciplineId = -1;
    if (invalidTeacher) teacherId = -1;

    return {
      name,
      pdfUrl,
      categoryId,
      teacherId,
      disciplineId,
    };
  }
}
