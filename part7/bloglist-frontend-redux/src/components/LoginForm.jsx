import { useState } from "react";
import { useDispatch } from "react-redux";
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
