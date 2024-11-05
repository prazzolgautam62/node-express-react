import React, { useState, useEffect, useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Card, InputGroup } from 'react-bootstrap';
import { _login, _register } from '../services/auth';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import '../css/Login.css';
import { UserContext } from '../context';
import { toast } from 'react-toastify';

const Register = () => {
    const [auth, dispatch] = useContext(UserContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await _register({ name: name, email: email, password: password, passwordConfirmation: passwordConfirmation });
            if (res.status) {
                dispatch({ type: 'SET_USER', payload: res.data.user });
                dispatch({ type: 'SET_TOKEN', payload: res.data.token });
                toast.success(res.message);
                navigate('/admin/dashboard');
            }
            else {
                toast.error(res.message);
                setErrorMessage(res.message);
            }
        } catch (error) {
            console.error("Failed !", error);
        }
        const timeoutId = setTimeout(() => {
            setErrorMessage('');
        }, 3000);
        return () => clearTimeout(timeoutId);
    };

    useEffect(() => {
        if (auth.token) {
            navigate('/admin/dashboard');
        }
    }, [])

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Row className="w-100">
                <Col md={6} lg={4} className="mx-auto">
                    <Card className="shadow-lg">
                        <Card.Body>
                            <h2 className="title text-center mb-4"><Link to="/">Node Express React</Link></h2>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formBasicName" className="mb-3">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </Form.Group>
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
                                    <InputGroup className="mb-3">
                                        <Form.Control
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Enter password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                        <InputGroup.Text onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </InputGroup.Text>
                                    </InputGroup>
                                </Form.Group>

                                <Form.Group controlId="formBasicPasswordConfirmation" className="mb-3">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <InputGroup className="mb-3">
                                        <Form.Control
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            placeholder="Enter password confirmation"
                                            value={passwordConfirmation}
                                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                                            required
                                        />
                                        <InputGroup.Text onClick={toggleConfirmPasswordVisibility} style={{ cursor: 'pointer' }}>
                                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                        </InputGroup.Text>
                                    </InputGroup>
                                </Form.Group>

                                <Button
                                    variant="primary"
                                    type="submit"
                                    className="w-100 custom-btn"
                                >
                                    Register
                                </Button>
                                <div className='text-center mt-2'>
                                    <NavLink to="/login">Login</NavLink>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Register;
