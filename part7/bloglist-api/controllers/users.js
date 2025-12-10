const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

usersRouter.post("/", async (request, response, next) => {
  try {
    const { username, name, password } = request.body;

    if (!password || password.length < 3) {
      return response
        .status(400)
        .json({ error: "password length should be longer than 3" });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      name,
      passwordHash,
    });

    const savedUser = await user.save();

    response.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/", async (request, response, next) => {
  try {
    const users = await User.find({});
    const blogCounts = await Blog.aggregate([
      { $group: { _id: "$user", blogCount: { $sum: 1 } } },
    ]);
    const countByUserId = new Map(
      blogCounts
        .filter((item) => item._id)
        .map((item) => [item._id.toString(), item.blogCount])
    );

    const result = users.map((user) => {
      const serialized = user.toJSON();
      serialized.blogCount = countByUserId.get(user._id.toString()) || 0;
      return serialized;
    });

    response.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
