const bcrypt = require("bcrypt");
const { test, after, describe, beforeEach } = require("node:test");
const mongoose = require("mongoose");
const Blog = require("../models/blog");
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

describe("listing blogs created by user", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    await Blog.deleteMany({});
  });

  test("returns blog titles for given user", async () => {
    const passwordHash = await bcrypt.hash("secret123", 10);
    const savedUser = await new User({
      username: "author",
      name: "Author Name",
      passwordHash,
    }).save();

    await Blog.insertMany([
      {
        title: "First blog post",
        author: "Author Name",
        url: "http://example.com/first",
        user: savedUser._id,
      },
      {
        title: "Second blog post",
        author: "Author Name",
        url: "http://example.com/second",
        user: savedUser._id,
      },
      {
        title: "Someone else's post",
        author: "Other Author",
        url: "http://example.com/other",
      },
    ]);

    const res = await api
      .get(`/api/users/${savedUser._id.toString()}/blogs`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const sortedTitles = [...res.body].sort();
    assert.deepStrictEqual(sortedTitles, [
      "First blog post",
      "Second blog post",
    ]);
  });
});

after(async () => {
  await User.deleteMany({});
  await Blog.deleteMany({});
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
  }
});
