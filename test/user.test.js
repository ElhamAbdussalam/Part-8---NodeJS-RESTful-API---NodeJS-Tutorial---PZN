import supertest from "supertest";
import { web } from "../src/application/web.js";
import { prismaClient } from "../src/application/database.js";

describe("POST /api/users", function () {
  afterEach(async () => {
    await prismaClient.user.deleteMany({
      where: {
        username: "elham",
      },
    });
  });

  it("should can register new user", async () => {
    const result = await supertest(web).post("/api/users").send({
      username: "elham",
      password: "rahasia",
      name: "elham",
    });

    console.log(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("elham");
    expect(result.body.data.name).toBe("elham");
    expect(result.body.data.password).toBeUndefined();
  });
});
