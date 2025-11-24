import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import userService from "../services/users";

const initialState = [];

const hydrateBlogs = (rawBlogs, users) => {
  const usersById = users.reduce((acc, user) => {
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

  hydrated.sort((a, b) => b.likes - a.likes);
  return hydrated;
};

const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setBlogs(_, action) {
      return action.payload;
    },
  },
});

export const initializeBlogs = () => async (dispatch) => {
  const [rawBlogs, users] = await Promise.all([
    blogService.getAll(),
    userService.getAll(),
  ]);
  dispatch(setBlogs(hydrateBlogs(rawBlogs, users)));
};

export const addBlog = (blogObject) => async (dispatch) => {
  await blogService.create(blogObject);
  dispatch(initializeBlogs());
};

export const { setBlogs } = blogsSlice.actions;
export default blogsSlice.reducer;
