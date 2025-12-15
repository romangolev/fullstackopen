import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Card, ListGroup, Badge } from "react-bootstrap";
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
    <Card className="shadow-sm">
      <Card.Header className="bg-white d-flex align-items-center justify-content-between">
        <Card.Title className="mb-0">{user.name}</Card.Title>
        <Badge bg="info" text="dark">
          {user.blogCount ?? user.blogs?.length ?? 0} blogs
        </Badge>
      </Card.Header>
      <Card.Body className="d-grid gap-2">
        <h5 className="mb-2">Added blogs</h5>
        {loading && <p className="text-muted mb-0">Loading blogs...</p>}
        {error && <p className="text-danger mb-0">{error}</p>}
        {!loading && !error && !hasBlogs && <p className="text-muted mb-0">No blogs added yet.</p>}
        {!loading && !error && hasBlogs && (
          <ListGroup variant="flush">
            {blogs.map((blog) => (
              <ListGroup.Item key={blog.id ?? blog.title}>{blog.title}</ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Card.Body>
    </Card>
  );
};

export default UserView;
