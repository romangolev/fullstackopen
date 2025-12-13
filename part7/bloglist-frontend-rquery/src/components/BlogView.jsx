import { useParams } from "react-router-dom";

const BlogView = ({ blogsQuery, user, onLike, onDelete }) => {
  const { id } = useParams();

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

  return (
    <div>
      <h2>{blog.title}</h2>
      <div>
        <a href={blog.url} target="_blank" rel="noreferrer">
          {blog.url}
        </a>
      </div>
      <div>
        likes {blog.likes}{" "}
        <button onClick={() => onLike(blog)}>like</button>
      </div>
      <div>added by {addedBy}</div>
      {canDelete && <button onClick={() => onDelete(blog)}>delete</button>}
    </div>
  );
};

export default BlogView;
