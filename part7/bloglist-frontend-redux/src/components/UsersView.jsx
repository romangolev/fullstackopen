import { useSelector } from "react-redux";

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
              <td>{user.name}</td>
              <td>{user.blogCount ?? user.blogs?.length ?? 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersView;
