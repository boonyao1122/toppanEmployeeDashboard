const request = require("supertest");
const app = require("../../index.js");

const userData = {
  id: "e0001",
  login: "byao",
  name: "Boon Yao",
  salary: 39234.5,
  createdAt: "2023-04-26 13:56:43",
  updatedAt: "2023-04-26 13:56:43",
};

const newUserData = {
  login: "newLogin",
  name: "newName",
  salary: 12345,
};

jest.mock("../../sequelize/models/index.js", () => {
  const SequelizeMock = require("sequelize-mock");
  const dbMock = new SequelizeMock();

  const userMock = dbMock.define("User", userData);
  userMock.findByPk = jest.fn().mockResolvedValue(userData);

  return {
    User: userMock,
    sequelize: {
      sync: jest.fn(() => Promise.resolve()),
    },
  };
});

describe("GET /user:id", () => {
  test("good parameter", async () => {
    const response = await request(app).get("/api/users/e0002");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(userData);
  });
});

describe("GET /users", () => {
  test("good parameters", async () => {
    const response = await request(app).get("/api/users?minSalary=0&maxSalary=4000000&offset=1&limit=30&sort=+name");
    expect(response.status).toBe(200);
  });

  test("bad parameters", async () => {
    const response = await request(app).get("/api/users?minSalary=0&maxSalary=4000000&offset=1&limit=30&sort=+fake");
    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({ error: "sort column is invalid" });
  });
});

describe("PATCH /users", () => {
  test("good parameter", async () => {
    userData.update = jest.fn().mockResolvedValue(newUserData);
    const response = await request(app).patch("/api/users/e0001", newUserData);
    expect(response.status).toBe(200);
  });
});

describe("Delete /users", () => {
  test("good parameter", async () => {
    userData.destroy = jest.fn();
    const response = await request(app).delete("/api/users/e0001");
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual({ message: "User deleted successfully" });
  });
});
