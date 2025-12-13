import { Link } from "react-router-dom";

const Navigation = ({ user, onLogout }) => (
  <nav className="navigation">
    <div className="navigation__links">
      <Link to="/">blogs</Link>
      <Link to="/users">users</Link>
    </div>
    {user && (
      <div className="navigation__user">
        <span>{user.name} logged in</span>
        <button onClick={onLogout}>logout</button>
      </div>
    )}
  </nav>
);

export default Navigation;
