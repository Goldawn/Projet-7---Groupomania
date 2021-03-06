import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import saveData from '../../functions/saveData'

import './Login.css'


const Login = (props) => {

  const [login, setLogin] = useState({
    email: props.location.state ? props.location.state.email : "",
    password: props.location.state ? props.location.state.pass : "",
  })
  const history = useHistory()

  // on définit des nouveaux états du login au changement
  const changeHandler = e => {
    setLogin((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value
    })
    )
  }

  // on envoie la requête de connection au backend avec les informations présentes dans le state.
  // en cas de répones favorable, on stocke le token dans le localStorage puis on redirige l'utilisateur à la racine de l'application.
  const submitHandler = e => {
    e.preventDefault()

    fetch('http://localhost:9000/api/user/login', {
      method: 'POST' ,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(login)})

      .then((res) => {
        if(res.status !== 200) {
          return(res)
        }
        else {
          res.json().then(data => {
            saveData('authToken', JSON.stringify({"token":data.token}))
          })
          history.push('/')
      }
    })
  }

    const { email, password } = login

      return (
      <>
      <div className="text-center text-white">
        <h2>Connexion</h2>
      </div>
      <Form id="form" onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name='email' value={email} placeholder="Enter email" onChange={changeHandler} />
        </Form.Group>
      
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name='password' value={password} placeholder="Password" onChange={changeHandler} />
        </Form.Group>
      
        <div id="submit-button">
          <Button className="post-button" type="submit">
            Valider
          </Button>
        </div>
        
        <Form.Group id="register-block">
          <Form.Text className="text-muted">
            <p>Vous n'avez pas encore de compte</p>
            <Link className="post-button post-link" to="/register">
              Créer un compte
            </Link>
          </Form.Text>
        </Form.Group>
      </Form>
      </>
    )

}

export default Login;

