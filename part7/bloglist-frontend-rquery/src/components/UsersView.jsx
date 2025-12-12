import { Link } from "react-router-dom";

const UsersView = ({ usersQuery }) => {
  if (usersQuery.isLoading) return <div>Loading users...</div>;
  if (usersQuery.isError) return <div>Error loading users</div>;

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {usersQuery.data?.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersView;
