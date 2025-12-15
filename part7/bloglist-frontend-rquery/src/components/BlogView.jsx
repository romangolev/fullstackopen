import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Paper,
  Typography,
  Link,
  Button,
  Stack,
  Divider,
  TextField,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const BlogView = ({ blogsQuery, user, onLike, onDelete, onComment }) => {
  const { id } = useParams();
  const [comment, setComment] = useState("");

  if (blogsQuery.isLoading) return <div>Loading blog...</div>;
  if (blogsQuery.isError) return <div>Error loading blog</div>;

  const blog = blogsQuery.data?.find((b) => b.id === id);

  if (!blog) {
    return <div>Blog not found</div>;
  }

  const addedBy = blog.user?.name || blog.user?.username || "Unknown user";
  const blogUserId =
    typeof blog.user === "string" ? blog.user : blog.user?.id;
  const canDelete =
    user &&
    ((blogUserId && blogUserId === user.id) ||
      (typeof blog.user === "object" &&
        (blog.user.username === user.username ||
          blog.user.name === user.name)));

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    const trimmed = comment.trim();
    if (!trimmed) return;
    onComment(blog.id, trimmed);
    setComment("");
  };

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Stack spacing={2}>
        <Typography variant="h4" component="h1">
          {blog.title}
        </Typography>

        <Link href={blog.url} target="_blank" rel="noreferrer">
          {blog.url}
        </Link>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1}
          alignItems={{ sm: "center" }}
        >
          <Typography color="text.secondary">
            likes {blog.likes}
          </Typography>
          <Button variant="contained" size="small" onClick={() => onLike(blog)}>
            like
          </Button>
          {canDelete && (
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={() => onDelete(blog)}
            >
              delete
            </Button>
          )}
        </Stack>

        <Typography color="text.secondary">added by {addedBy}</Typography>

        <Divider />

        <Typography variant="h6" component="h2">
          Comments
        </Typography>

        {user && (
          <form onSubmit={handleCommentSubmit}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
              <TextField
                label="Add a comment"
                value={comment}
                onChange={({ target }) => setComment(target.value)}
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                disabled={!comment.trim()}
              >
                add comment
              </Button>
            </Stack>
          </form>
        )}

        {(blog.comments || []).length === 0 ? (
          <Typography color="text.secondary">No comments yet</Typography>
        ) : (
          <List dense>
            {(blog.comments || []).map((c, idx) => (
              <ListItem key={`${c}-${idx}`} disableGutters>
                <ListItemText primary={c} />
              </ListItem>
            ))}
          </List>
        )}
      </Stack>
    </Paper>
  );
};

export default BlogView;
