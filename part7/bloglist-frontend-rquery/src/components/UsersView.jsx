import { Link } from "react-router-dom";
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const UsersView = ({ usersQuery }) => {
  if (usersQuery.isLoading) return <div>Loading users...</div>;
  if (usersQuery.isError) return <div>Error loading users</div>;

  return (
    <div>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Users
      </Typography>
      <TableContainer component={Paper} elevation={2}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersQuery.data?.map((user) => (
              <TableRow key={user.id} hover>
                <TableCell>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </TableCell>
                <TableCell align="right">{user.blogCount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UsersView;
