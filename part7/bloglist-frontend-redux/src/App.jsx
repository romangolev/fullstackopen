import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm";
import UsersView from "./components/UsersView";
import UserView from "./components/UserView";
import BlogView from "./components/BlogView";
import Navigation from "./components/Navigation";
import { showNotification } from "./reducers/notificationSlice";
import {
  initializeBlogs,
  addBlog,
  likeBlog,
  deleteBlog,
} from "./reducers/blogsSlice";
import { initializeUser, logoutUser } from "./reducers/userSlice";
import "./index.css";

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUser());
  }, [dispatch]);

  const handleCreate = async (blogObject) => {
    try {
      await dispatch(addBlog(blogObject));
      dispatch(
        showNotification({
          message: `a new blog ${blogObject.title} added`,
          type: "info",
        }),
      );
    } catch (err) {
      dispatch(
        showNotification({
          message: `error: ${err}`,
          type: "error",
        }),
      );
    }
  };

  const handleLike = async (blog) => {
    try {
      await dispatch(likeBlog(blog));
    } catch (err) {
      dispatch(
        showNotification({
          message: `error: ${err}`,
          type: "error",
        }),
      );
    }
  };

  const handleDelete = async (blog) => {
    if (window.confirm(`Removing blog ${blog.title}`)) {
      try {
        await dispatch(deleteBlog(blog.id));
        dispatch(
          showNotification({
            message: `a ${blog.title} blog has been deleted`,
            type: "info",
          }),
        );
      } catch (err) {
        dispatch(
          showNotification({
            message: `error: ${err}`,
            type: "error",
          }),
        );
      }
    }
  };

  const handleLogout = () => {
    try {
      dispatch(logoutUser());
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navigation user={user} onLogout={handleLogout} />
      <h2>blog app</h2>
      <Notification />
      <Routes>
        <Route path="/users" element={<UsersView />} />
        <Route path="/users/:id" element={<UserView />} />
        <Route
          path="/"
          element={
            <>
              {!user && <LoginForm />}
              {user && <NewBlogForm onCreate={handleCreate} />}
              <BlogForm
                blogs={blogs}
              />
            </>
          }
        />
    <Route
      path="/blogs/:id"
      element={
        <BlogView
          blogs={blogs}
          user={user}
          onLike={handleLike}
          onDelete={handleDelete}
        />
      }
    />
      </Routes>
    </>
  );
};

export default App;
