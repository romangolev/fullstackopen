import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Button, ListGroup, Form, Badge } from "react-bootstrap";

const BlogView = ({ blogs, user, onLike, onDelete, onAddComment }) => {
  const { id } = useParams();
  const [newComment, setNewComment] = useState("");

  const blog = useMemo(
    () => (Array.isArray(blogs) ? blogs.find((b) => b.id === id) : null),
    [blogs, id],
  );

  if (!Array.isArray(blogs) || !blogs.length) {
    return <div>Loading blog...</div>;
  }

  if (!blog) {
    return <div>Blog not found.</div>;
  }

  const canDelete = blog.user?.name && blog.user.name === user?.name;
  const comments = Array.isArray(blog.comments) ? blog.comments : [];
  const isLoggedIn = Boolean(user);
  const likes = Number.isFinite(blog.likes) ? blog.likes : 0;

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    const trimmed = newComment.trim();
    if (!trimmed) return;

    onAddComment(blog.id, trimmed);
    setNewComment("");
  };

  return (
    <div className="d-grid gap-3">
      <Card className="shadow-sm">
        <Card.Body className="d-grid gap-2">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <Card.Title className="mb-1">{blog.title}</Card.Title>
              <Card.Subtitle className="text-muted">
                added by {blog.user?.name ?? "Unknown user"}
              </Card.Subtitle>
            </div>
            {canDelete && (
              <Button variant="outline-danger" size="sm" onClick={() => onDelete(blog)}>
                Delete
              </Button>
            )}
          </div>
          <div>
            <a href={blog.url} target="_blank" rel="noreferrer">
              {blog.url}
            </a>
          </div>
          <div className="d-flex align-items-center gap-2">
            <Badge bg="secondary" className="text-uppercase">
              likes {likes}
            </Badge>
            <Button variant="primary" size="sm" id={blog.id} onClick={() => onLike(blog)}>
              Like
            </Button>
          </div>
        </Card.Body>
      </Card>

      <Card className="shadow-sm">
        <Card.Header className="bg-white">
          <Card.Title className="mb-0">Comments</Card.Title>
        </Card.Header>
        <Card.Body>
          {isLoggedIn ? (
            <Form onSubmit={handleCommentSubmit} className="d-flex gap-2 mb-3">
              <Form.Control
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts"
              />
              <Button type="submit" variant="primary">
                Add comment
              </Button>
            </Form>
          ) : (
            <div className="text-muted mb-2">Log in to add comments.</div>
          )}
          {comments.length ? (
            <ListGroup variant="flush">
              {comments.map((comment, idx) => (
                <ListGroup.Item key={`${blog.id}-comment-${idx}`}>{comment}</ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <div className="text-muted">No comments yet.</div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default BlogView;
