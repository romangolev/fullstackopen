import { Link } from "react-router-dom";
import { ListGroup, Badge } from "react-bootstrap";

const Blog = ({ blog }) => {
  const likes = Number.isFinite(blog.likes) ? blog.likes : 0;

  return (
    <ListGroup.Item className="d-flex justify-content-between align-items-center">
      <div>
        <Link to={`/blogs/${blog.id}`} className="fw-semibold text-decoration-none">
          {blog.title}
        </Link>
        <div className="text-muted small">
          by <span className="text-dark">{blog.author}</span>
        </div>
      </div>
      <Badge bg="primary" pill>
        {likes} likes
      </Badge>
    </ListGroup.Item>
  );
};

export default Blog;
