import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import userService from "../services/users";
import { setUsers } from "./usersSlice";

const initialState = [];

const sortBlogs = (blogs) => {
  return [...blogs].sort((a, b) => b.likes - a.likes);
};

const hydrateBlogs = (rawBlogs, users) => {
  const safeUsers = Array.isArray(users) ? users : [];

  const usersById = safeUsers.reduce((acc, user) => {
    acc[user.id] = user;
    return acc;
  }, {});

  const hydrated = rawBlogs.map((blog) => {
    const userId = typeof blog.user === "string" ? blog.user : blog.user?.id;
    const userObj = usersById[userId];

    return {
      ...blog,
      user: userObj
        ? { id: userObj.id, name: userObj.name, username: userObj.username }
        : blog.user && typeof blog.user === "object"
          ? blog.user
          : { id: userId, name: "Unknown user" },
    };
  });

  return sortBlogs(hydrated);
};

const normalizeUser = (blog, fallbackUser) => {
  if (blog.user && typeof blog.user === "object") {
    const { id, name, username } = blog.user;
    return { id, name, username };
  }

  if (blog.user && typeof blog.user === "string") {
    if (fallbackUser) {
      const { id, name, username } = fallbackUser;
      return { id, name, username };
    }
    return { id: blog.user, name: "Unknown user" };
  }

  return fallbackUser;
};

const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setBlogs(_, action) {
      return action.payload;
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload;
      const replaced = state.map((blog) =>
        blog.id !== updatedBlog.id ? blog : updatedBlog,
      );
      return sortBlogs(replaced);
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload);
    },
  },
});

export const initializeBlogs = () => async (dispatch) => {
  const [rawBlogs, users] = await Promise.all([
    blogService.getAll(),
    userService.getAll(),
  ]);
  const safeUsers = Array.isArray(users) ? users : [];
  dispatch(setUsers(safeUsers));
  dispatch(setBlogs(hydrateBlogs(rawBlogs, safeUsers)));
};

export const addBlog = (blogObject) => async (dispatch) => {
  await blogService.create(blogObject);
  dispatch(initializeBlogs());
};

export const likeBlog = (blog) => async (dispatch, getState) => {
  const payload = {
    ...blog,
    likes: blog.likes + 1,
    user: blog.user?.id ?? blog.user,
  };

  const updatedBlog = await blogService.update(blog.id, payload);
  const fallbackUser =
    getState().blogs.find((storedBlog) => storedBlog.id === blog.id)?.user ??
    blog.user;

  dispatch(
    updateBlog({
      ...updatedBlog,
      user: normalizeUser(updatedBlog, fallbackUser),
    }),
  );
};

export const deleteBlog = (blogId) => async (dispatch) => {
  await blogService.deleteBlog(blogId);
  dispatch(initializeBlogs());
};

export const addCommentToBlog = (blogId, comment) => async (
  dispatch,
  getState,
) => {
  const updatedBlog = await blogService.addComment(blogId, comment);
  const fallbackUser =
    getState().blogs.find((storedBlog) => storedBlog.id === blogId)?.user ??
    updatedBlog.user;

  dispatch(
    updateBlog({
      ...updatedBlog,
      user: normalizeUser(updatedBlog, fallbackUser),
    }),
  );
};

export const { setBlogs, updateBlog, removeBlog } = blogsSlice.actions;
export default blogsSlice.reducer;
