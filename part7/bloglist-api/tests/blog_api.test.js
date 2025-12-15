const { test, after, beforeEach, afterEach } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const assert = require("node:assert");
const User = require("../models/user");
const Blog = require("../models/blog");
const api = supertest(app);

let token;
let user;

beforeEach(async () => {
  await User.deleteMany({});
  await Blog.deleteMany({});

  const newUser = {
    username: `test_user_${Date.now()}`,
    name: "Test User",
    password: "secret123",
  };

  const createRes = await api.post("/api/users").send(newUser).expect(201);

  user = createRes.body;

  const loginRes = await api
    .post("/api/login")
    .send({ username: newUser.username, password: newUser.password })
    .expect(200)
    .expect("Content-Type", /application\/json/);

  token = loginRes.body.token;
});

test.only("correct amount of blogs returned", async () => {
  await Blog.deleteMany({});
  await Blog.insertMany([
    {
      title: "First blog",
      author: "Author One",
      url: "http://first.com",
      likes: 1,
    },
    {
      title: "Second blog",
      author: "Author Two",
      url: "http://second.com",
      likes: 2,
    },
  ]);
  const res = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
  assert.strictEqual(res.body.length, 2);
});

test.only("verify that blog has unique identifier property", async () => {
  const res = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  res.body.forEach((blog) => {
    assert.ok(blog.id, "blog should have an id property");
    assert.strictEqual(
      blog._id,
      undefined,
      "internal _id for blogshould be undefined",
    );
  });
});

test.only("fetching a single blog returns full details", async () => {
  const newBlog = {
    title: "Detailed blog",
    author: "Detail Author",
    url: "http://detailed.com",
    likes: 42,
  };

  const created = await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const result = await api
    .get(`/api/blogs/${created.body.id}`)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(result.body.title, newBlog.title);
  assert.strictEqual(result.body.author, newBlog.author);
  assert.strictEqual(result.body.url, newBlog.url);
  assert.strictEqual(result.body.likes, newBlog.likes);
});

test.only("new blog includes empty comments array", async () => {
  const newBlog = {
    title: "Blog with comments",
    author: "Commenter",
    url: "http://comments.com",
  };

  const created = await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const fetched = await api
    .get(`/api/blogs/${created.body.id}`)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  assert.deepStrictEqual(fetched.body.comments, []);
});

test.only("adding a comment to a blog stores it", async () => {
  const newBlog = {
    title: "Blog to comment on",
    author: "Comment Target",
    url: "http://commenttarget.com",
  };

  const created = await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const commentText = "Great read!";

  const commentResponse = await api
    .post(`/api/blogs/${created.body.id}/comments`)
    .send({ comment: commentText })
    .expect(201)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(commentResponse.body.comments.length, 1);
  assert.strictEqual(commentResponse.body.comments[0], commentText);

  const fetched = await api
    .get(`/api/blogs/${created.body.id}`)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(fetched.body.comments.length, 1);
  assert.strictEqual(fetched.body.comments[0], commentText);
});

test.only("verify that post request successfully creates new blogpost", async () => {
  const newblog = {
    title: "Test title",
    author: "Linus Torvalds",
    url: "http://canonical.com",
    likes: 100500,
  };

  const res = await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newblog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const saved = await Blog.findById(res.body.id);

  assert.strictEqual(saved.title, "Test title");
});

test.only("verify that missing likes defaults to 0", async () => {
  const newblog = {
    title: "Test blog without lines",
    author: "Test Author",
    url: "http://example.com",
    // likes are not defined
  };
  const res = await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newblog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(res.body.likes, 0, "Likes should default to 0");
});

test.only("creating a blog without title returns 400", async () => {
  const newBlog = {
    author: "No Title",
    url: "http://example.com/no-title",
  };

  const res = await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newBlog)
    .expect(400)
    .expect("Content-Type", /application\/json/);
});

test.only("creating a blog without url returns 400", async () => {
  const newBlog = {
    title: "No URL",
    author: "No Url Author",
  };
  const res = await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newBlog)
    .expect(400)
    .expect("Content-Type", /application\/json/);
});

test.only("deleting element by id", async () => {
  const newblog = {
    title: "Test title",
    author: "Linus Torvalds",
    url: "http://canonical.com",
    likes: 100500,
    user: user.id,
  };

  const created = await new Blog(newblog).save();
  const res = await api
    .delete(`/api/blogs/${created._id.toString()}`)
    .set("Authorization", `Bearer ${token}`)
    .expect(204);

  const deleted = await Blog.findById(created._id);
  assert.strictEqual(deleted, null);
});

test.only("updating a blogpost likes", async () => {
  const newblog = {
    title: "Test title",
    author: "Linus Torvalds",
    url: "http://canonical.com",
    likes: 100500,
  };

  const created = await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newblog)
    .expect(201);

  const updatedNewblog = {
    ...newblog,
    likes: 300500,
  };

  const updated = await api
    .put(`/api/blogs/${created.body.id}`)
    .send(updatedNewblog)
    .expect(200);

  assert.strictEqual(
    updated.body.likes,
    300500,
    "Likes should be updated to 300500",
  );

  const res = await api
    .delete(`/api/blogs/${updated.body.id}`)
    .set("Authorization", `Bearer ${token}`)
    .expect(204);
});

afterEach(async () => {
  await Blog.deleteMany({});
});

after(async () => {
  await User.deleteMany({});
  await mongoose.connection.close();
});
