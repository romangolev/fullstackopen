import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 9,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div className="blog" style={blogStyle}>
      <Link to={`/blogs/${blog.id}`} style={{ textDecoration: "none" }}>
        <span>{blog.title}</span>
      </Link>
      <span> - </span>
      <span>{blog.author}</span>
    </div>
  );
};

export default Blog;
