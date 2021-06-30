import { Button, Card, Form } from 'react-bootstrap';
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import Navigation from '../Navigation';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validated, setValidated] = useState(false);
    const history = useHistory();

    useEffect(() => {
        if(localStorage.getItem('user-info'))
        {
            history.push('/blogs');
        }
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.stopPropagation();
        }

        setValidated(true);

        const login = { email, password };

        fetch('http://127.0.0.1:8000/api/login', {
            method: 'POST',
            headers: { "content-type" : "application/json" },
            body: JSON.stringify(login),
        })
        .then(res => {
            return res.json();
        })
        .then(result => {
            localStorage.setItem("user-info", JSON.stringify(result));
            console.log(result);
            history.push('/blogs');
        });
    };

    return (
        <div className="login">
            <Navigation />

            <Card className="col-md-4 offset-md-4  mt-5">
                <Card.Body>
                    <Card.Title className="h1 text-center">Sign In</Card.Title>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control 
                                type="email" 
                                placeholder="Enter email" 
                                required 
                                value={email}
                                onChange={ (e) => setEmail(e.target.value) }
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid email.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Password" 
                                required 
                                value={password}
                                onChange={ (e) => setPassword(e.target.value) }
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid password.
                            </Form.Control.Feedback>
                        </Form.Group>


                        <Button variant="success" type="submit" block>
                            Login
                        </Button>
                        
                    </Form>
                    <hr />
                    <div className="text-center">
                        <Link to="/register" className="btn btn-primary">Create New Account</Link>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Login;