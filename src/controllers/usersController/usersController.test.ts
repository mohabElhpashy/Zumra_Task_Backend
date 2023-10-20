import request from "supertest";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { app } from "../../app";
import { generateTestToken } from "../../utils/generateTestToken";

describe("GET /api/users ", () => {
  beforeAll(async () => {
    dotenv.config();
    await mongoose.connect(process.env.MONGO_URI!);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("It should return status code 401", async () => {
    const response = await request(app).get("/api/users");

    expect(response.statusCode).toBe(401);
  });

  it("It should return a list of users with status code 200 when authenticated", async () => {
    const userId = "userId";
    const token = generateTestToken(userId);

    const response = await request(app)
      .get("/api/users")
      .set("Authorization", `Bearer ${token}`);

    const users = response.body.users;

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(users)).toBe(true);
  });
});
