import Blog from "../components/Blog";

const BlogForm = ({ blogs }) => {
  return (
    <>
      <div>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </>
  );
};

export default BlogForm;
