import { useState, useEffect, useRef } from "react";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm";
import blogService from "./services/blogs";
import userService from "./services/users";
import "./index.css";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notificationmsg, setNotificationmsg] = useState(null);
  const timeoutIdRef = useRef(null);

  useEffect(() => {
    setAllBlogs();
    const loggedUserJSON = window.localStorage.getItem("loggedBlogsappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const setAllBlogs = async () => {
    const [rawBlogs, users] = await Promise.all([
      blogService.getAll(),
      userService.getAll(),
    ]);
    const usersById = users.reduce((acc, u) => {
      acc[u.id] = u;
      return acc;
    }, {});

    const hydrated = rawBlogs.map((b) => {
      const userId = typeof b.user === "string" ? b.user : b.user?.id;
      const userObj = usersById[userId];

      return {
        ...b,
        user: userObj
          ? { id: userObj.id, name: userObj.name, username: userObj.username }
          : b.user && typeof b.user === "object"
            ? b.user // already an object but maybe missing name
            : { id: userId, name: "Unknown user" },
      };
    });
    hydrated.sort((a, b) => b.likes - a.likes);
    setBlogs(hydrated);
  };

  const handleCreate = async (blogObject) => {
    try {
      await blogService.create(blogObject);
      await setAllBlogs();
      showNotification({
        message: `a new blog ${blogObject.title} added`,
        type: "info",
      });
    } catch (err) {
      showNotification({ message: `error: ${err}`, type: "error" });
    }
  };

  const handleLike = async (blog) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    await blogService.update(blog.id, updatedBlog);
    setAllBlogs();
  };

  const handleDelete = async (blog) => {
    if (window.confirm(`Removing blog ${blog.name}`)) {
      try {
        await blogService.deleteBlog(blog.id);
        setAllBlogs();
        showNotification({
          message: `a ${blog.title} blog has been deleted`,
          type: "info",
        });
      } catch (err) {
        showNotification({ message: `error: ${err}`, type: "error" });
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

  const showNotification = (msg) => {
    setNotificationmsg(msg);

    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }

    timeoutIdRef.current = setTimeout(() => {
      setNotificationmsg(null);
      timeoutIdRef.current = null;
    }, 5000);
  };

  return (
    <>
      <h2>blogs</h2>
      <Notification notification={notificationmsg} />
      {!user && (
        <LoginForm onSuccess={setUser} showNotification={showNotification} />
      )}
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
