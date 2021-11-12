import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';


const EditProfile = (props) => { 

  const [profileData, setProfileData] = useState({
    username: props.location.state.profileData.username,
    email: props.location.state.profileData.email,
    bio: props.location.state.profileData.bio
  })

  const history = useHistory()

  useEffect(() => {
    console.log(props.location.state.profileData)  
  })

  const changeHandler = e => {
    setProfileData((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value
    })
    )
  }

  const loadData = (key) => {
    if(localStorage){
      if(key in localStorage) {
          return localStorage.getItem(key);
        }
      } else {
      alert("Web Storage is not supported");
    }
  }

  const submitHandler = e => {
    e.preventDefault()
    console.log(profileData)

    const auth = JSON.parse(loadData("authToken"))
    const bearer = "Bearer "+auth.token

    fetch('http://localhost:9000/api/user/profile', {
      method: 'PUT',
      headers: { 
          "Content-Type": "application/json",
          "authorization": bearer
        },
      body: JSON.stringify(profileData)})

      .then((res) => {
        if(res.status !== 200) {
          console.log(res)
        }
        else {
          res.json().then(data => {
            console.log(data)
          })
          history.push('/profile')
        }
      })
    }

    const { username, email, bio } = profileData;

      return (
      <Form onSubmit={submitHandler}>

        <Form.Group className="mb-3" controlId="formGroupText">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" name='username' value={username} placeholder="Enter username" onChange={changeHandler} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name='email' value={email} placeholder="Enter email" onChange={changeHandler} />
        </Form.Group>
      
        <Form.Group className="mb-3" controlId="formGroupTextArea">
          <Form.Label>Bio</Form.Label>
          <Form.Control type="textarea" name='bio' value={bio} placeholder="Entre bio" onChange={changeHandler} />
        </Form.Group>
      
        <Button variant="primary" type="submit">
          Save Changes
        </Button>

      </Form>
    )

}

export default EditProfile;

