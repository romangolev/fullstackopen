import Blog from "../components/Blog";
import { Paper, List, ListItem, Divider } from "@mui/material";

const BlogForm = ({ blogs }) => {
  return (
    <Paper elevation={2}>
      <List disablePadding>
        {blogs.map((blog, idx) => (
          <div key={blog.id}>
            <ListItem disablePadding>
              <Blog blog={blog} />
            </ListItem>
            {idx < blogs.length - 1 && <Divider />}
          </div>
        ))}
      </List>
    </Paper>
  );
};

export default BlogForm;
