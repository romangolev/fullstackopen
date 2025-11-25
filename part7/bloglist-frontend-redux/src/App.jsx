import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm";
import blogService from "./services/blogs";
import { showNotification } from "./reducers/notificationSlice";
import {
  initializeBlogs,
  addBlog,
  likeBlog,
  deleteBlog,
} from "./reducers/blogsSlice";
import "./index.css";

const App = () => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(initializeBlogs());
    const loggedUserJSON = window.localStorage.getItem("loggedBlogsappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
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
      setUser(null);
      window.localStorage.removeItem("loggedBlogsappUser");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h2>blogs</h2>
      <Notification />
      {!user && <LoginForm onSuccess={setUser} />}
      {user && (
        <>
          <div>
            <p>
              Logged in as {user.name}
              <button onClick={handleLogout}>logout</button>
            </p>
          </div>
          <NewBlogForm onCreate={handleCreate} />
        </>
      )}
      <BlogForm
        blogs={blogs}
        user={user}
        handleLike={handleLike}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default App;
