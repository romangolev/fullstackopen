import { Card, ListGroup } from "react-bootstrap";
import Blog from "../components/Blog";

const BlogForm = ({ blogs }) => {
  const hasBlogs = Array.isArray(blogs) && blogs.length > 0;

  return (
    <Card className="shadow-sm">
      <Card.Header className="bg-white">
        <Card.Title className="mb-0">Latest blogs</Card.Title>
      </Card.Header>
      {hasBlogs ? (
        <ListGroup variant="flush">
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </ListGroup>
      ) : (
        <Card.Body>
          <div className="text-muted">No blogs yet. Be the first to publish!</div>
        </Card.Body>
      )}
    </Card>
  );
};

export default BlogForm;
