import { useState } from "react";
import loginService from "../services/login";
import blogService from "../services/blogs";
import { useNotify } from "../context/NotificationContext";
import { useUserDispatch } from "../context/UserContext";

const LoginForm = () => {
  const [username, setUsername] = useState([]);
  const [password, setPassword] = useState([]);
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
    <>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            username
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    </>
  );
};

export default LoginForm;
