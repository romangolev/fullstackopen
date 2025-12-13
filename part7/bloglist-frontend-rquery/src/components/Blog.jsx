import { Link } from "react-router-dom";

const blogStyle = {
  paddingTop: 9,
  paddingLeft: 2,
  border: "solid",
  borderWidth: 1,
  marginBottom: 5,
};

const Blog = ({ blog }) => {
  return (
    <div className="blog" style={blogStyle}>
      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      <span> - </span>
      <span>{blog.author}</span>
    </div>
  );
};

export default Blog;
