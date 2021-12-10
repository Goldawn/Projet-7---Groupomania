import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import loadData from '../../functions/loadData'


const EditProfile = (props) => { 

  const [profileData, setProfileData] = useState({
    username: props.location.state.profileData.username,
    email: props.location.state.profileData.email,
    bio: props.location.state.profileData.bio
  })
  const [attachment, setAttachment] = useState();

  const history = useHistory()

  // on définit des nouveaux états de profileData au changement
  const changeHandler = e => {
    setProfileData((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value
    })
    )
  }

  // on créé un formData auquel on attache toutes les informations du profil utilisateur
  // cet objet est ensuite envoyé dans le corps de la requête d'édition des données du profil. 
  // Si la réponse est favorable, l'utilisateur est redirigé vers sa nouvelle page de profil
  const submitHandler = e => {
    e.preventDefault()

    const data = new FormData();
    data.append("username", profileData.username)
    data.append("email", profileData.email)
    data.append("bio", profileData.bio)
    data.append("file", attachment)

    const auth = JSON.parse(loadData("authToken"))
    const bearer = "Bearer "+auth.token

    fetch('http://localhost:9000/api/user/profile', {
      method: 'PUT',
      headers: { 
          "authorization": bearer
        },
      body: data })
      .then((res) => {
        if(res.status !== 200) {
          return(res)
        }
        else {
          res.json().then(data => {
            return(data)
          })
          history.push('/profile')
        }
      })
    }

    const { username, email, bio } = profileData;

      return (

        <Form id="form" onSubmit={submitHandler}>

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
            <Form.Control as="textarea" type="textarea" name='bio' value={bio} placeholder="Entre bio" onChange={changeHandler} />
          </Form.Group>

          <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Ajouter une photo de profil</Form.Label>
                <Form.Control type="file" name="attachment" onChange={ event => {
                   const attachment = event.target.files[0];
                   setAttachment(attachment);
                }}/>
          </Form.Group>
        
          <div id="submit-button">
            <Button className="post-button" type="submit">
              Enregistrer les modifications
            </Button>
          </div>

        </Form>
    )

}

export default EditProfile;

