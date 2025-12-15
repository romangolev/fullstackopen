import { useState } from "react";
import loginService from "../services/login";
import blogService from "../services/blogs";
import { useNotify } from "../context/NotificationContext";
import { useUserDispatch } from "../context/UserContext";
import { Paper, Typography, TextField, Button, Stack } from "@mui/material";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const notify = useNotify();
  const userDispatch = useUserDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogsappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      userDispatch({ type: "LOGIN", payload: user });
      setUsername("");
      setPassword("");
    } catch (err) {
      notify({
        message: "wrong username or password",
        type: "error",
      });
      console.log(err);
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 3, maxWidth: 520 }}>
      <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
        Login
      </Typography>
      <form onSubmit={handleLogin}>
        <Stack spacing={2}>
          <TextField
            label="username"
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            autoComplete="username"
            fullWidth
          />
          <TextField
            label="password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            autoComplete="current-password"
            fullWidth
          />
          <Button type="submit" variant="contained">
            login
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};

export default LoginForm;
