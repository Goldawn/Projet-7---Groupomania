import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';


class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = { 
      email: '',
      password: ''
     }
  }

  saveData(key, value) {
    if(localStorage){
        localStorage.setItem(key, value);
    }else {
        alert("Web Storage is not supported");
    }
  }

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  submitHandler = e => {
    // let history = useHistory();
    e.preventDefault()
    console.log(this.state)

    fetch('http://localhost:9000/api/user/login', {
      method: 'POST' ,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state)})

      .then((res) => {
        if(res.status !== 200) {
          console.log(res)
        }
        else {
          res.json().then(data => {
            this.saveData('authToken', JSON.stringify({ "userId":data.userId, "token":data.token}))
          })
          // history.push('/')
        }
      })
    }

  render() {
      const { email, password } = this.state
      return (
      <Form onSubmit={this.submitHandler}>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name='email' value={email} placeholder="Enter email" onChange={this.changeHandler} />
        </Form.Group>
      
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name='password' value={password} placeholder="Password" onChange={this.changeHandler} />
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

}

export default Login;

