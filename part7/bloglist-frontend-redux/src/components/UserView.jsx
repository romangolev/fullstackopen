import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import userService from "../services/users";

const normalizeBlogs = (blogs) => {
  if (!Array.isArray(blogs)) {
    return [];
  }

  return blogs.map((blog, index) => {
    if (typeof blog === "string") {
      return { id: `${blog}-${index}`, title: blog };
    }
    return blog;
  });
};

const UserView = () => {
  const { id } = useParams();
  const users = useSelector((state) => state.users);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = Array.isArray(users) ? users.find((u) => u.id === id) : null;

  useEffect(() => {
    let active = true;

    const fetchUserBlogs = async () => {
      try {
        setLoading(true);
        const response = await userService.getById(id);
        if (!active) return;

        setBlogs(normalizeBlogs(response));
        setError(null);
      } catch (err) {
        if (!active) return;
        console.error("Failed to load user blogs", err);
        setBlogs([]);
        setError("Unable to load blogs for this user.");
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    if (id) {
      fetchUserBlogs();
    } else {
      setLoading(false);
    }

    return () => {
      active = false;
    };
  }, [id]);

  if (!user && (!Array.isArray(users) || !users.length)) {
    return <div>Loading user...</div>;
  }

  if (!user) {
    return <div>User not found.</div>;
  }

  const hasBlogs = blogs.length > 0;

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      {loading && <p>Loading blogs...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && !hasBlogs && <p>No blogs added yet.</p>}
      {!loading && !error && hasBlogs && (
        <ul>
          {blogs.map((blog) => (
            <li key={blog.id ?? blog.title}>{blog.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserView;
