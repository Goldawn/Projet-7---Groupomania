import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';


const DeletePost = (props) => { 

  const [postData, setPostData] = useState({
    title: props.location.state.item.title,
    content:props.location.state.item.content
  })

  const history = useHistory()

  useEffect(() => {
    console.log(props.location.state.item)
  })

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
    console.log(postData)

    const auth = JSON.parse(loadData("authToken"))
    const bearer = "Bearer "+auth.token
    const postId = props.location.state.item.id

    fetch(`http://localhost:9000/api/posts/${postId}`, {
      method: 'DELETE',
      headers: { 
          "Content-Type": "application/json",
          "authorization": bearer
        },
      body: JSON.stringify(postData)})

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
        <Form onSubmit={submitHandler}>
        
          <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Post title</Form.Label>
              <Form.Control type="text" name="title" value={title} placeholder="Post title" onChange={changeHandler} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>post content</Form.Label>
              <Form.Control type="textarea" name="content" value={content} placeholder="Post content" onChange={changeHandler} />
          </Form.Group>

          <Button variant="primary" type="submit">
              Save changes
          </Button>
      </Form>
    )

}

export default DeletePost;

