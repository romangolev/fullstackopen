import { useState } from "react";
import { useDispatch } from "react-redux";
import { Card, Form, Button } from "react-bootstrap";
import { showNotification } from "../reducers/notificationSlice";
import { loginUser } from "../reducers/userSlice";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await dispatch(loginUser({ username, password }));
      setUsername("");
      setPassword("");
    } catch (err) {
      dispatch(
        showNotification({
          message: "wrong username or password",
          type: "error",
        }),
      );
      console.log(err);
    }
  };

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title className="mb-3">Login</Card.Title>
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3" controlId="login-username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={username}
              placeholder="Enter username"
              onChange={({ target }) => setUsername(target.value)}
              autoComplete="username"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="login-password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Enter password"
              onChange={({ target }) => setPassword(target.value)}
              autoComplete="current-password"
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button type="submit" variant="primary">
              Login
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default LoginForm;
