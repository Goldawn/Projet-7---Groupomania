import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';


const EditPost = (props) => { 

  console.log(props.location)

  const [postData, setPostData] = useState({
    title: props.location.state.post.title,
    content:props.location.state.post.content
  })
  const [attachment, setAttachment] = useState();

  const history = useHistory()

  const changeHandler = e => {
    setPostData((previousState) => ({
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
          console.log(res)
        }
        else {
          res.json().then(data => {
            console.log(data)
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
                console.log(attachment);
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

