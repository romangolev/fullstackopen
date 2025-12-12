import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import userService from "../services/users";

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
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      {blogs.length > 0 ? (
        <ul>
          {blogs.map((title, index) => (
            <li key={`${title}-${index}`}>{title}</li>
          ))}
        </ul>
      ) : (
        <div>No blogs yet</div>
      )}
    </div>
  );
};

export default UserView;
