import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import loadData from '../../functions/loadData'


const EditComment = (props) => { 

  const [commentData, setCommentData] = useState({
    content:props.location.state.comment.content
  })

  const history = useHistory()

  useEffect(() => {
  })
  
  // on définit des nouveaux états de profileData au changement
  const changeHandler = e => {
    setCommentData((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value
    })
    )
  }

  // on envoie les nouvelles données dans le corps de la requête d'édition du commentaire 
  // Si la réponse est favorable, l'utilisateur est redirigé vers sa nouvelle page du post commenté
  const submitHandler = e => {
    e.preventDefault()

    const auth = JSON.parse(loadData("authToken"))
    const bearer = "Bearer "+auth.token
    const postId = props.location.state.comment.postId
    const commentId = props.location.state.comment.id

    fetch(`http://localhost:9000/api/posts/${postId}/comments/${commentId}`, {
      method: 'PUT',
      headers: { 
          "Content-Type": "application/json",
          "authorization": bearer
        },
      body: JSON.stringify(commentData)})

      .then((res) => {
        if(res.status !== 200) {
        }
        else {
          res.json().then(data => {
          })
          history.push(`/post/${postId}`)
        }
      })
    }

    const { title, content } = commentData

      return (
        <Form id="form" onSubmit={submitHandler}>
        
          <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>post content</Form.Label>
              <Form.Control as="textarea" type="textarea" name="content" value={content} placeholder="Post content" onChange={changeHandler} />
          </Form.Group>

          <div id="submit-button">
            <Button className="post-button" type="submit">
              Enregistrer les modifications
            </Button>
          </div>
        </Form>
    )

}

export default EditComment;

