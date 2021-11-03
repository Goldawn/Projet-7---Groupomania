import React from 'react';
import { Form, Button } from 'react-bootstrap';


class Register extends React.Component {

    render() {
        return <Form>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Username" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Label>Bio</Form.Label>
                    <Form.Control type="textarea" placeholder="Bio" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Valider
                </Button>
            </Form>
    }



}


export default Register;