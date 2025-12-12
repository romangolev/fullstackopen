import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UsersView = () => {
  const users = useSelector((state) => state.users);

  if (!Array.isArray(users) || !users.length) {
    return null;
  }

  return (
    <div>
      <h2>users</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogCount ?? user.blogs?.length ?? 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersView;
