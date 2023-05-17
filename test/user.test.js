const request = require("supertest");
const { expect } = require("chai");
const app = require("../app");

describe("User API", () => {
  it("should return a health check message", async () => {
    const response = await request(app).get("/health");
    expect(response.status).to.equal(200);
    expect(response.text).to.equal("API is running");
  });

  it("should create a new user", async () => {
    const newUser = {
      name: "John",
      lastName: "Doe",
    };

    const response = await request(app).post("/users").send(newUser);

    expect(response.status).to.equal(201);
    expect(response.body).to.have.property("id");
    expect(response.body.name).to.equal(newUser.name);
    expect(response.body.lastName).to.equal(newUser.lastName);
  });

  it("should retrieve all users", async () => {
    const response = await request(app).get("/users");
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an("array");
    expect(response.body).to.have.lengthOf(1);
  });
});
