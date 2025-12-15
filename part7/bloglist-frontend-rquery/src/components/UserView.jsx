import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import userService from "../services/users";
import { Paper, Typography, List, ListItem, ListItemText } from "@mui/material";

const UserView = ({ usersQuery }) => {
  const { id } = useParams();

  const userBlogsQuery = useQuery({
    queryKey: ["userBlogs", id],
    queryFn: () => userService.getById(id),
    enabled: Boolean(id),
  });

  if (usersQuery.isLoading || userBlogsQuery.isLoading) {
    return <div>Loading user...</div>;
  }

  if (usersQuery.isError || userBlogsQuery.isError) {
    return <div>Error loading user data</div>;
  }

  const user = usersQuery.data?.find((u) => u.id === id);

  if (!user) {
    return <div>User not found</div>;
  }

  const blogs = userBlogsQuery.data || [];

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        {user.name}
      </Typography>
      <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
        Added blogs
      </Typography>
      {blogs.length > 0 ? (
        <List dense>
          {blogs.map((title, index) => (
            <ListItem key={`${title}-${index}`} disableGutters>
              <ListItemText primary={title} />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography color="text.secondary">No blogs yet</Typography>
      )}
    </Paper>
  );
};

export default UserView;
