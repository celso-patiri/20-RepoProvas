import supertest from "supertest";
import app from "../../src/app";
import { TestFactory, UserFactory } from "../factories";

const agent = supertest(app);

describe("Tests routes integration tests", () => {
  const factory = new TestFactory();
  const authHeader = { authorization: "" };

  beforeAll(async () => {
    const userFactory = new UserFactory();
    const { body } = await agent.post("/signup").send(userFactory.newMockUser());
    const { token } = body;
    authHeader.authorization = `Bearer ${token}`;
  });

  describe("POST /tests => test creation", () => {
    beforeAll(async () => {
      await factory.setup();
    });

    it("should return 401 if jwt token header is not present", async () => {
      const mockTest = await factory.newMockTest();
      const response = await agent.post("/tests").send(mockTest);
      expect(response.statusCode).toBe(401);
    });

    it("should return 422 if name length is less than 2", async () => {
      const mockTest = await factory.newMockTest({ nameLength: 1 });
      const response = await agent.post("/tests").set(authHeader).send(mockTest);
      expect(response.statusCode).toBe(422);
    });

    it("should return 422 if pdfUrl is invalid", async () => {
      const mockTest = await factory.newMockTest({ invalidPdfUrl: true });
      const response = await agent.post("/tests").set(authHeader).send(mockTest);
      expect(response.statusCode).toBe(422);
    });

    it("should return 404 if teacherId is invalid", async () => {
      const mockTest = await factory.newMockTest({ invalidTeacher: true });
      const response = await agent.post("/tests").set(authHeader).send(mockTest);
      expect(response.statusCode).toBe(404);
    });

    it("should return 404 if categoryId is invalid", async () => {
      const mockTest = await factory.newMockTest({ invalidCategory: true });
      const response = await agent.post("/tests").set(authHeader).send(mockTest);
      expect(response.statusCode).toBe(404);
    });

    it("should return 404 if disciplineId is invalid", async () => {
      const mockTest = await factory.newMockTest({ invalidDiscipline: true });
      const response = await agent.post("/tests").set(authHeader).send(mockTest);
      expect(response.statusCode).toBe(404);
    });

    it("should return 201 in success", async () => {
      const mockTest = await factory.newMockTest();
      const response = await agent.post("/tests").set(authHeader).send(mockTest);
      expect(response.statusCode).toBe(201);
    });
  });

  describe("GET /tests/disciplines", () => {
    it("should return 401 if jwt token header is not present", async () => {
      const response = await agent.get("/tests/disciplines");
      expect(response.statusCode).toBe(401);
    });

    it("should return 200 with terms array in sucess", async () => {
      const response = await agent.get("/tests/disciplines").set(authHeader);
      expect(response.statusCode).toBe(200);

      const { terms } = response.body;
      expect(terms).toBeInstanceOf(Array);
    });
  });

  describe("GET /tests/teachers", () => {
    it("should return 401 if jwt token header is not present", async () => {
      const response = await agent.get("/tests/teachers");
      expect(response.statusCode).toBe(401);
    });

    it("should return 200 with teachers array in sucess", async () => {
      const response = await agent.get("/tests/teachers").set(authHeader);
      expect(response.statusCode).toBe(200);

      const { teachers } = response.body;
      expect(teachers).toBeInstanceOf(Array);
    });
  });
});
