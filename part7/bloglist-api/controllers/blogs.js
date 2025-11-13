const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const { userExtractor } = require("../utils/middleware");

blogsRouter.get("/", async (request, response, next) => {
  try {
    const blogs = await Blog.find({});
    response.json(blogs);
  } catch (error) {
    next(error);
  }
});

blogsRouter.post("/", userExtractor, async (request, response, next) => {
  try {
    const { title, author, url, likes } = request.body;

    if (!title || !url) {
      return response.status(400).json({
        error: "title or url are missing",
      });
    }
    const user = request.user;

    const blog = new Blog({
      title,
      author,
      url,
      user: user._id,
    });
    if (likes !== undefined) blog.likes = likes;
    const saved = await blog.save();
    const populatedUser = await saved.populate("user", {
      username: 1,
      name: 1,
    });
    response.status(201).json(populatedUser);
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete("/:id", userExtractor, async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id);
    if (!blog) {
      return response.status(404).send({ message: "entry not found" });
    }
    if (blog.user.toString() !== request.user._id.toString()) {
      return response
        .status(403)
        .json({ error: "forbidden: not the blog owner" });
    }
    await blog.deleteOne();
    return response.status(204).end();
  } catch (error) {
    next(error);
  }
});

blogsRouter.put("/:id", async (request, response, next) => {
  try {
    const { title, author, url, likes } = request.body;
    if (!title && !author && !url && !likes) {
      return response.status(400).json({ error: "Nothing has been provoded" });
    }
    const blog = await Blog.findById(request.params.id);
    if (!blog) {
      return response.send(404).json({ error: "Blog not found" });
    }
    if (title !== undefined) blog.title = title;
    if (author !== undefined) blog.author = author;
    if (url !== undefined) blog.url = url;
    if (likes !== undefined) blog.likes = likes;
    const result = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true,
    });
    response.json(result.toJSON());
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
