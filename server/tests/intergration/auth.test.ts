import supertest from "supertest";
import app from "../../src/app";
import { UserFactory } from "../factories/user.factory";

const agent = supertest(app);

describe("Auth routes integration tests", () => {
  const factory = new UserFactory();

  afterAll(async () => {
    await factory.deleteRegisteredUsers();
  });

  describe("POST /signup tests", () => {
    it("Should return jwt token with status 201 on successful signup", async () => {
      const response = await agent.post("/signup").send(factory.newMockUser());
      const { body } = response;

      expect(response.statusCode).toBe(201);
      expect(body).toHaveProperty("token");
      expect(body.token).not.toBeNull();
    });

    it("Should return 422 if body if email format is invalid", async () => {
      const response = await agent
        .post("/signup")
        .send(factory.newMockUser({ wrongEmail: true }));

      expect(response.statusCode).toBe(422);
    });

    it("Should return 422 if body if password is less than 6 characters", async () => {
      const response = await agent
        .post("/signup")
        .send(factory.newMockUser({ passwordLength: 3 }));

      expect(response.statusCode).toBe(422);
    });

    it("Should return 409 if email is already registered", async () => {
      const mockUser = await factory.registerNewUser();
      const response = await agent.post("/signup").send(mockUser);
      expect(response.statusCode).toBe(409);
    });
  });

  describe("POST /signin tests", () => {
    it("Should return 201 with jwt token on successful signin", async () => {
      const mockUser = await factory.registerNewUser();
      const response = await agent.post("/signin").send(mockUser);
      const { body } = response;

      expect(response.statusCode).toBe(201);
      expect(body).toHaveProperty("token");
      expect(body.token).not.toBeNull();
    });

    it("Should return 422 if body if email format is invalid", async () => {
      const response = await agent
        .post("/signin")
        .send(factory.newMockUser({ wrongEmail: true }));

      expect(response.statusCode).toBe(422);
    });

    it("Should return 422 if body if password is less than 6 characters", async () => {
      const response = await agent
        .post("/signin")
        .send(factory.newMockUser({ passwordLength: 3 }));

      expect(response.statusCode).toBe(422);
    });

    it("Should return 401 if email is not registered", async () => {
      const response = await agent.post("/signin").send(factory.newMockUser());
      expect(response.statusCode).toBe(401);
    });

    it("Should return 401 if password is wrong", async () => {
      const { email } = await factory.registerNewUser();
      const password = factory.randomPassword();

      const response = await agent.post("/signin").send({ email, password });
      expect(response.statusCode).toBe(401);
    });
  });
});
