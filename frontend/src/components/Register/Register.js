import React, { useState }from 'react';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";

import "./Register.css"

const Register = (props) => {

    const history = useHistory()
    
    const { register, formState: { errors }, handleSubmit } = useForm();

    const onSubmit = data => {
        console.log(data)

        fetch('http://localhost:9000/api/user/signup', {
            method: 'POST' ,
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(data)})

            .then((res) => {
                if(res.status !== 201) {
                    return(res)
                }
                else {
                    res.json().then(data => {
                        return(data)
                    })
                    history.push('/login', {email:data.email, pass:data.password})
                }
            })
    }

    return (

        <Form id="form" onSubmit={handleSubmit(onSubmit)}>

            <Form.Group className="mb-3" controlId="formGroupUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" name="username" placeholder="Nom d'utilisateur" {... register('username', {required: "Vous devez rentrer un nom d'utilisateur", minLength: 5, maxLength: 20})}/>
                {errors.username && <span class='form-message'>{errors.username.message}</span>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" name="email" placeholder="Enter email" {... register('email', {required: "Vous devez rentrer une adresse mail", pattern: {value: /\S+@\S+\.\S+/, message:"Veuillez saisir une adresse mail valide" } })}/>
                {errors.email && <span class='form-message'>{errors.email.message}</span>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" placeholder="Password" {... register('password', {required: "Vous devez rentrer un mot de passe", pattern: { value:/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, message:"Le mot de passe doit contenir au moins 8 caractères dont un chiffre" } })}/>
                {errors.password && <span class='form-message'>{errors.password.message}</span>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupBio">
                <Form.Label>Bio</Form.Label>
                <Form.Control as="textarea" type="textarea" name="bio" placeholder="Bio" {... register('bio', {required: false})}/>
            </Form.Group>

            <div id="submit-button">
                <Button className="post-button" type="submit">
                    Valider
                </Button>
            </div>
        </Form>

    )


}


export default Register;