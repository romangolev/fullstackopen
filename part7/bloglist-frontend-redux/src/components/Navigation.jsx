import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

const Navigation = ({ user, onLogout }) => (
  <Navbar bg="dark" data-bs-theme="dark" expand="md" className="mb-4 shadow-sm">
    <Container>
      <Navbar.Brand as={Link} to="/">
        Bloglist
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navigation" />
      <Navbar.Collapse id="navigation" className="justify-content-between">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">
            Blogs
          </Nav.Link>
          <Nav.Link as={Link} to="/users">
            Users
          </Nav.Link>
        </Nav>
        {user && (
          <div className="d-flex align-items-center gap-3">
            <span className="text-light small mb-0">
              <strong>{user.name}</strong> logged in
            </span>
            <Button variant="outline-light" size="sm" onClick={onLogout}>
              Logout
            </Button>
          </div>
        )}
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default Navigation;
