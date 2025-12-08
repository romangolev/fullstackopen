import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./reducers/notificationSlice";
import blogsReducer from "./reducers/blogsSlice";
import userReducer from "./reducers/userSlice";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
    user: userReducer,
  },
});

export default store;
