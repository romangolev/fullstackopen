import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Card, Table } from "react-bootstrap";

const UsersView = () => {
  const users = useSelector((state) => state.users);

  if (!Array.isArray(users) || !users.length) {
    return null;
  }

  return (
    <Card className="shadow-sm">
      <Card.Header className="bg-white">
        <Card.Title className="mb-0 text-capitalize">users</Card.Title>
      </Card.Header>
      <Card.Body className="p-0">
        <Table hover responsive className="mb-0">
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
                  <Link to={`/users/${user.id}`} className="text-decoration-none">
                    {user.name}
                  </Link>
                </td>
                <td>{user.blogCount ?? user.blogs?.length ?? 0}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default UsersView;
