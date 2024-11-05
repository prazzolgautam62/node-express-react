import React, { useContext } from 'react';
import {Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { UserContext } from '../context';

function NavBar() {
  const [auth, dispatch] = useContext(UserContext);

  const handleLogout = () => {
    localStorage.clear();
    dispatch({ type: "RESET_USER" });
    dispatch({ type: "RESET_TOKEN" });
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">Navbar Brand</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/admin/users">Users</Nav.Link>
            <Nav.Link>Link</Nav.Link>
            <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item>Action</NavDropdown.Item>
              <NavDropdown.Item>
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link disabled>
              Link
            </Nav.Link>
          </Nav>
          <Button onClick={handleLogout} variant="outline-danger">Log Out</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;