import { Link } from "react-router-dom";

const Navigation = ({ user, onLogout }) => {
  return (
    <nav className="nav-bar">
      <div className="nav-links">
        <Link to="/">blogs</Link>
        <Link to="/users">users</Link>
      </div>
      {user && (
        <div className="nav-user">
          <span>{user.name} logged in</span>
          <button type="button" onClick={onLogout}>
            logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
