import { PrismaClient } from "@prisma/client";
import request from "supertest";
import app from "../../src/app";
import { prismaService } from "../../src/prisma";

describe("Auth routes integration tests", () => {
  const prisma = new PrismaClient();
  const mockUser = {
    email: "integration_test@test.com",
    password: "123456",
  };

  beforeEach(async () => {
    await prisma.user.delete({ where: { email: mockUser.email } }).catch(() => true);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe("POST /signup tests", () => {
    it("Should return jwt token with status 201 on successful signup", async () => {
      const response = await request(app).post("/signup").send(mockUser);
      const { body } = response;

      expect(response.statusCode).toBe(201);
      expect(body).toHaveProperty("token");
      expect(body.token).not.toBeNull();
    });

    it("Should return 422 if body if email format is invalid", async () => {
      let { email, password } = mockUser;
      email = "testwrongemail.com";

      const response = await request(app).post("/signup").send({ email, password });
      expect(response.statusCode).toBe(422);
    });

    it("Should return 422 if body if password is less than 6 characters", async () => {
      let { email, password } = mockUser;
      password = "123";

      const response = await request(app).post("/signup").send({ email, password });
      expect(response.statusCode).toBe(422);
    });

    it("Should return 409 if email is already registered", async () => {
      await prismaService.user.create({ data: { ...mockUser } });
      const response = await request(app).post("/signup").send(mockUser);
      expect(response.statusCode).toBe(409);
    });
  });

  describe("POST /signin tests", () => {
    it("Should return jwt token with status 201 on successful signin", async () => {
      await request(app).post("/signup").send(mockUser);
      const response = await request(app).post("/signin").send(mockUser);
      const { body } = response;

      expect(response.statusCode).toBe(201);
      expect(body).toHaveProperty("token");
      expect(body.token).not.toBeNull();
    });

    it("Should return 422 if body if email format is invalid", async () => {
      let { email, password } = mockUser;
      email = "testwrongemail.com";

      const response = await request(app).post("/signin").send({ email, password });
      expect(response.statusCode).toBe(422);
    });

    it("Should return 422 if body if password is less than 6 characters", async () => {
      let { email, password } = mockUser;
      password = "123";

      const response = await request(app).post("/signin").send({ email, password });
      expect(response.statusCode).toBe(422);
    });

    it("Should return 401 if email is not registered", async () => {
      const response = await request(app).post("/signin").send(mockUser);
      expect(response.statusCode).toBe(401);
    });

    it("Should return 401 if password is wrong", async () => {
      await request(app).post("/signup").send(mockUser);

      let { email, password } = mockUser;
      password = "jonatanTester";

      const response = await request(app).post("/signin").send({ email, password });
      expect(response.statusCode).toBe(401);
    });
  });
});
