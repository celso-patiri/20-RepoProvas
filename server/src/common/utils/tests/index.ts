interface NameObject {
  name: string;
}

interface ITest {
  name: string;
  createdAt: Date;
  Category: NameObject;
}

interface ITestTeacher {
  Test: ITest[];
  Teacher: NameObject;
}

interface IDisciplineTeacher {
  name: string;
  TeachersDiscipline: ITestTeacher[];
}

type ITestIdentifier = { teacher: string } | { discipline: string };

type IMappedTest = {
  name: string;
  createdAt: Date;
} & ITestIdentifier;

export interface ICategory {
  name: string;
  tests: IMappedTest[];
}

const createTest = (name: string, createdAt: Date, testIdentifier: ITestIdentifier) => {
  return { name, createdAt, ...testIdentifier };
};

export const mapTestsToCategories = (tests: ITest[], testIdentifier: ITestIdentifier) => {
  const categoriesMap = new Map<string, IMappedTest[]>();

  tests.forEach((test) => {
    const { name, createdAt, Category } = test;

    if (categoriesMap.has(Category.name)) {
      categoriesMap.get(Category.name)?.push(createTest(name, createdAt, testIdentifier));
    } else {
      categoriesMap.set(Category.name, [createTest(name, createdAt, testIdentifier)]);
    }
  });

  let testsByCategory: Array<{ name: string; tests: IMappedTest[] }> = [];

  categoriesMap.forEach((tests, category) =>
    testsByCategory.push({ name: category, tests }),
  );

  return testsByCategory;
};

export const mapCategoriesToDiscipline = (Disciplines: IDisciplineTeacher[]) => {
  const disciplines = Disciplines.map((discipline) => {
    const { name, TeachersDiscipline: teachersInDiscipline } = discipline;

    const categories = teachersInDiscipline.map((teacher) => {
      const { Test, Teacher } = teacher;

      return mapTestsToCategories(Test, { teacher: Teacher.name });
    });

    return {
      name,
      categories,
    };
  });
  return disciplines;
};
