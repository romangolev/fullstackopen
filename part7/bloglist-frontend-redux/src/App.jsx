import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
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
  addCommentToBlog,
} from "./reducers/blogsSlice";
import { initializeUser, logoutUser } from "./reducers/userSlice";

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

  const handleAddComment = async (blogId, comment) => {
    try {
      await dispatch(addCommentToBlog(blogId, comment));
      dispatch(
        showNotification({
          message: "comment added",
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
      <Container className="py-4">
        <h2 className="mb-3 text-primary fw-semibold">Blog app</h2>
        <Notification />
        <Routes>
          <Route path="/users" element={<UsersView />} />
          <Route path="/users/:id" element={<UserView />} />
          <Route
            path="/"
            element={
              <div className="d-grid gap-3">
                {!user && <LoginForm />}
                {user && <NewBlogForm onCreate={handleCreate} />}
                <BlogForm
                  blogs={blogs}
                />
              </div>
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
                onAddComment={handleAddComment}
              />
            }
          />
        </Routes>
      </Container>
    </>
  );
};

export default App;
