import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./reducers/notificationSlice";
import blogsReducer from "./reducers/blogsSlice";
import userReducer from "./reducers/userSlice";
import usersReducer from "./reducers/usersSlice";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
    user: userReducer,
    users: usersReducer,
  },
});

export default store;
