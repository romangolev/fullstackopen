const bcrypt = require("bcrypt");
const { test, after, describe, beforeEach } = require("node:test");
const mongoose = require("mongoose");
const User = require("../models/user");
const app = require("../app");
const supertest = require("supertest");
const helper = require("./test_helper");
const assert = require("node:assert");

const api = supertest(app);

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("usesrpass", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    assert(usernames.includes(newUser.username));
  });

  test("creating an invalid user with short username", async () => {
    const usersAtStart = await helper.usersInDb();

    const userShortName = {
      username: "bo",
      name: "Bob Trueman",
      password: "123132",
    };

    await api.post("/api/users").send(userShortName).expect(400);
  });
});
