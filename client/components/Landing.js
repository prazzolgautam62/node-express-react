import React, { useState, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import {Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import useAuth from '../hooks/use-auth';

const Landing = () => {

  const {auth} = useAuth();

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand as={Link} to="/admin/dashboard">Navbar Brand</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link disabled>
              Link
            </Nav.Link>
          </Nav>
          <Button as={Link} to="/login" variant="outline-primary">{auth.token ? 'Dashboard' : 'Login'}</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Landing;
