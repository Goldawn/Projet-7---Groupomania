import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import loadData from '../../functions/loadData'


const EditPost = (props) => { 


  const [postData, setPostData] = useState({
    title: props.location.state.post.title,
    content:props.location.state.post.content
  })
  const [attachment, setAttachment] = useState();

  const history = useHistory()

  // on définit des nouveaux états du login au changement
  const changeHandler = e => {
    setPostData((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value
    })
    )
  }


  // on créé un formData auquel on attache toutes les informations du post 
  // cet objet est ensuite envoyé dans le corps de la requête d'édition des données du post. 
  // Si la réponse est favorable, l'utilisateur est redirigé vers la page des posts.
  const submitHandler = e => {
    e.preventDefault()
    
    const data = new FormData();
    data.append("title", postData.title)
    data.append("content", postData.content)
    data.append("file", attachment)

    const auth = JSON.parse(loadData("authToken"))
    const bearer = "Bearer "+auth.token
    const postId = props.location.state.post.id

    fetch(`http://localhost:9000/api/posts/${postId}`, {
      method: 'PUT',
      headers: { 
          "authorization": bearer
      },
      body: data })

      .then((res) => {
        if(res.status !== 200) {
        }
        else {
          res.json().then(data => {
          })
          history.push('/')
        }
      })
    }

    const { title, content } = postData

    return (

      <Form id="form" onSubmit={submitHandler}>
      
        <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Titre</Form.Label>
            <Form.Control type="text" name="title" value={title} placeholder="Post title" onChange={changeHandler} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Message</Form.Label>
            <Form.Control type="textarea" name="content" value={content} placeholder="Post content" onChange={changeHandler} />
        </Form.Group>

        <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Attacher un fichier</Form.Label>
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

export default EditPost;

