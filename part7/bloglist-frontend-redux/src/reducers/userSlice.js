import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import blogService from "../services/blogs";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser(_, action) {
      return action.payload;
    },
    clearUser() {
      return null;
    },
  },
});

export const initializeUser = () => (dispatch) => {
  const loggedUserJSON = window.localStorage.getItem("loggedBlogsappUser");
  if (!loggedUserJSON) {
    return;
  }

  const user = JSON.parse(loggedUserJSON);
  blogService.setToken(user.token);
  dispatch(setUser(user));
};

export const loginUser = (credentials) => async (dispatch) => {
  const user = await loginService.login(credentials);
  window.localStorage.setItem("loggedBlogsappUser", JSON.stringify(user));
  blogService.setToken(user.token);
  dispatch(setUser(user));
  return user;
};

export const logoutUser = () => (dispatch) => {
  window.localStorage.removeItem("loggedBlogsappUser");
  blogService.setToken(null);
  dispatch(clearUser());
};

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
