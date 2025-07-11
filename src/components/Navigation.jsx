import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { auth } from '../app/firebase';
import './Navigation.css'; // Optional: if you have custom styles

export default function Navigation() {
  const { user } = useAuth();

  return (
    <Navbar expand="lg" className="custom-navbar shadow-sm py-3">
      <Container>
        <Navbar.Brand as={Link} to="/" className="nav-brand-text">
          <i className="bi bi-person-badge-fill me-2"></i>Sign-In
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto align-items-center">
            {user && (
              <>
                <Nav.Link as={Link} to="/" className="nav-link-custom">
                  Employee Data
                </Nav.Link>
                <Nav.Link as={Link} to="/add" className="nav-link-custom">
                  Add Employee
                </Nav.Link>
                <Button
                  variant="outline-light"
                  size="sm"
                  className="ms-3"
                  onClick={() => auth.signOut()}
                >
                 Logout
                </Button>
              </>
            )}

            {/* {!user && (
              <>
                <Nav.Link as={Link} to="/signin" className="nav-link-custom">
                  🔑 Sign In
                </Nav.Link>
                <Nav.Link as={Link} to="/signup" className="nav-link-custom">
                  📝 Sign Up
                </Nav.Link>
              </>
            )} */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
