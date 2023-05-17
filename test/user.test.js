const request = require("supertest");
const app = require("../app");
const assert = require("assert");

describe("User API", () => {
  let server;

  before((done) => {
    server = app.listen(done);
  });

  after((done) => {
    server.close(() => {
      done();
      process.exit(0); // Exit the test process after the server is closed
    });
  });

  it("should create a new user", (done) => {
    request(app)
      .post("/users")
      .send({ name: "John", lastName: "Doe" })
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        assert.strictEqual(res.body.name, "John");
        assert.strictEqual(res.body.lastName, "Doe");
        done();
      });
  });

  it("should retrieve all users", (done) => {
    request(app)
      .get("/users")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert.strictEqual(res.body.length, 1);
        done();
      });
  });
});
