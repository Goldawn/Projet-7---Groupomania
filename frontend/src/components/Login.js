import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';


const Login = (props) => {

  const [login, setLogin] = useState({
    email: "",
    password:""
  })
  const history = useHistory()

   const saveData = (key, value) => {
    if(localStorage){
        localStorage.setItem(key, value);
    }else {
        alert("Web Storage is not supported");
    }
  }

  const changeHandler = e => {
    setLogin((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value
    })
    )
  }

  const submitHandler = e => {
    e.preventDefault()
    console.log(login)

    fetch('http://localhost:9000/api/user/login', {
      method: 'POST' ,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(login)})

      .then((res) => {
        if(res.status !== 200) {
          console.log(res)
        }
        else {
          res.json().then(data => {
            saveData('authToken', JSON.stringify({ "userId":data.userId, "token":data.token}))
          })
          history.push('/')
        }
      })
    }

    const { email, password } = login

      return (
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name='email' value={email} placeholder="Enter email" onChange={changeHandler} />
        </Form.Group>
      
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name='password' value={password} placeholder="Password" onChange={changeHandler} />
        </Form.Group>
      
        <Button variant="primary" type="submit">
          Valider
        </Button>
        <Form.Group>
          <Form.Text className="text-muted">
            Vous n'avez pas encore de compte
            <Link to="/register">
              <p>Créer un compte</p>
            </Link>
          </Form.Text>
        </Form.Group>
      </Form>
    )

}

export default Login;

