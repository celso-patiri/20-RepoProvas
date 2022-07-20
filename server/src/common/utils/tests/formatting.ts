interface ICategory {
  name: string;
}

interface ITeacher {
  name: string;
}

interface ITest {
  name: string;
  createdAt: Date;
  Category: ICategory;
}

interface IMappedTest {
  name: string;
  createdAt: Date;
  teacherName: string;
}

interface ITeacherDiscipline {
  Test: ITest[];
  Teacher: ITeacher;
}

interface IDiscipline {
  name: string;
  TeachersDiscipline: ITeacherDiscipline[];
}

const mapTestsToCategory = (tests: ITest[], teacherName: string) => {
  const categoriesMap = new Map<string, IMappedTest[]>();

  tests.forEach((test) => {
    const { name, createdAt, Category } = test;

    if (categoriesMap.has(Category.name)) {
      categoriesMap.get(Category.name)?.push({ name, createdAt, teacherName });
    } else {
      categoriesMap.set(Category.name, [{ name, createdAt, teacherName }]);
    }
  });

  let testsByCategory: Array<{ name: string; tests: IMappedTest[] }> = [];

  categoriesMap.forEach((tests, category) =>
    testsByCategory.push({ name: category, tests }),
  );

  return testsByCategory;
};

export const mapCategoriesToDiscipline = (Disciplines: IDiscipline[]) => {
  const disciplines = Disciplines.map((discipline) => {
    const { name, TeachersDiscipline: teachersInDiscipline } = discipline;

    const categories = teachersInDiscipline.map((teacher) => {
      const { Test, Teacher } = teacher;

      return mapTestsToCategory(Test, Teacher.name);
    });

    return {
      name,
      categories,
    };
  });
  return disciplines;
};
