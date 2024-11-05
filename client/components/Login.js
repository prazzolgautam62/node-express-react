import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { _login } from '../services/auth';
import '../css/Login.css';
import { UserContext } from '../context';

const Login = () => {
  const [auth, dispatch] = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await _login({ email: email, password: password });
      if (res.status) {
        dispatch({ type: 'SET_USER', payload: res.data.user });
        dispatch({ type: 'SET_TOKEN', payload: res.data.token });

        navigate('/admin/dashboard');
      }
      else {
        setErrorMessage(res.message);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
    const timeoutId = setTimeout(() => {
      setErrorMessage('');
    }, 3000);
    return () => clearTimeout(timeoutId);
  };

  useEffect(() => {
    if(auth.token){
      navigate('/admin/dashboard');
    }
  },[])

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row className="w-100">
        <Col md={6} lg={4} className="mx-auto">
          <Card className="shadow-lg">
            <Card.Body>
              <h2 className="title text-center mb-4"><Link to="/">Node Express React</Link></h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail" className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 custom-btn"
                >
                  Login
                </Button>
                {errorMessage && <Alert className='mt-2 p-2' key={'warning'} variant={'warning'}>
                  { errorMessage }
                </Alert>}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
