import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";

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

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    const trimmed = newComment.trim();
    if (!trimmed) return;

    onAddComment(blog.id, trimmed);
    setNewComment("");
  };

  return (
    <div>
      <h2>{blog.title}</h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        likes {blog.likes}{" "}
        <button id={blog.id} onClick={() => onLike(blog)}>
          like
        </button>
      </div>
      <div>added by {blog.user?.name ?? "Unknown user"}</div>
      {canDelete && <button onClick={() => onDelete(blog)}>delete</button>}
      <h3>comments</h3>
      {isLoggedIn ? (
        <form onSubmit={handleCommentSubmit}>
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment"
          />
          <button type="submit">add comment</button>
        </form>
      ) : (
        <div>Log in to add comments.</div>
      )}
      {comments.length ? (
        <ul>
          {comments.map((comment, idx) => (
            <li key={`${blog.id}-comment-${idx}`}>{comment}</li>
          ))}
        </ul>
      ) : (
        <div>No comments yet.</div>
      )}
    </div>
  );
};

export default BlogView;
