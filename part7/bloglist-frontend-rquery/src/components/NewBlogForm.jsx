import { useState, useRef } from "react";
import Togglable from "./Togglable";
import { Paper, Typography, TextField, Button, Stack } from "@mui/material";

const NewBlogForm = ({ onCreate }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const formRef = useRef(null);

  const handleNewblog = async (event) => {
    event.preventDefault();
    onCreate({ title, author, url });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <Togglable
      buttonLabelShow="create new blog"
      buttonLabelHide="cancel"
      ref={formRef}
    >
      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          Create new
        </Typography>
        <form onSubmit={handleNewblog}>
          <Stack spacing={2}>
            <TextField
              label="title"
              type="text"
              name="title"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
              fullWidth
            />
            <TextField
              label="author"
              type="text"
              name="author"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
              fullWidth
            />
            <TextField
              label="url"
              type="text"
              name="url"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
              fullWidth
            />
            <Button type="submit" variant="contained">
              create
            </Button>
          </Stack>
        </form>
      </Paper>
    </Togglable>
  );
};

export default NewBlogForm;
