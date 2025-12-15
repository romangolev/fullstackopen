import { Link as RouterLink } from "react-router-dom";
import { ListItemButton, ListItemText, Typography, Stack } from "@mui/material";

const Blog = ({ blog }) => {
  return (
    <RouterLink
      to={`/blogs/${blog.id}`}
      style={{ textDecoration: "none", color: "inherit", width: "100%" }}
    >
      <ListItemButton className="blog" component="div" sx={{ width: "100%" }}>
        <ListItemText
          primary={
            <Stack direction="row" spacing={1} alignItems="baseline">
              <Typography component="span" variant="subtitle1">
                {blog.title}
              </Typography>
              <Typography
                component="span"
                variant="body2"
                color="text.secondary"
              >
                {blog.author}
              </Typography>
            </Stack>
          }
        />
      </ListItemButton>
    </RouterLink>
  );
};

export default Blog;
