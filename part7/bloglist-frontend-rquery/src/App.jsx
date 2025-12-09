import { useState, useEffect, useMemo } from "react";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm";
import blogService from "./services/blogs";
import userService from "./services/users";
import { useNotify } from "./context/NotificationContext";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import "./index.css";

const App = () => {
  const [user, setUser] = useState(null);
  const notify = useNotify();
  const queryClient = useQueryClient();

  const fetchBlogs = useMemo(
    () => async () => {
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
              ? b.user
              : { id: userId, name: "Unknown user" },
        };
      });
      hydrated.sort((a, b) => b.likes - a.likes);
      return hydrated;
    },
    [],
  );

  const blogsQuery = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
  });

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogsappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const createBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      notify({
        message: `a new blog ${variables.title} added`,
        type: "info",
      });
    },
    onError: (err) => {
      notify({ message: `error: ${err}`, type: "error" });
    },
  });

  const handleCreate = async (blogObject) => {
    createBlogMutation.mutate(blogObject);
  };

  const likeMutation = useMutation({
    mutationFn: async (blog) => {
      const updatedBlog = { ...blog, likes: blog.likes + 1 };
      await blogService.update(blog.id, updatedBlog);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });

  const handleLike = async (blog) => {
    likeMutation.mutate(blog);
  };

  const deleteMutation = useMutation({
    mutationFn: (blog) => blogService.deleteBlog(blog.id),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      notify({
        message: `a ${variables.title} blog has been deleted`,
        type: "info",
      });
    },
    onError: (err) => {
      notify({ message: `error: ${err}`, type: "error" });
    },
  });

  const handleDelete = async (blog) => {
    if (window.confirm(`Removing blog ${blog.title}`)) {
      deleteMutation.mutate(blog);
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
      {blogsQuery.isLoading && <div>Loading blogs...</div>}
      {blogsQuery.isError && <div>Error loading blogs</div>}
      {blogsQuery.isSuccess && (
        <BlogForm
          blogs={blogsQuery.data || []}
          user={user}
          handleLike={handleLike}
          handleDelete={handleDelete}
        />
      )}
    </>
  );
};

export default App;
