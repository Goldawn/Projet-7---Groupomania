import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';


const EditComment = (props) => { 

  const [commentData, setCommentData] = useState({
    title: props.location.state.comment.title,
    content:props.location.state.comment.content
  })

  const history = useHistory()

  useEffect(() => {
    console.log(props.location.state.comment)
  })

  const changeHandler = e => {
    setCommentData((previousState) => ({
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
    console.log(commentData)

    const auth = JSON.parse(loadData("authToken"))
    const bearer = "Bearer "+auth.token
    const postId = props.location.state.comment.postId
    const commentId = props.location.state.comment.id

    fetch(`http://localhost:9000/api/posts/${postId}/tests/${commentId}`, {
      method: 'PUT',
      headers: { 
          "Content-Type": "application/json",
          "authorization": bearer
        },
      body: JSON.stringify(commentData)})

      .then((res) => {
        if(res.status !== 200) {
          console.log(res)
        }
        else {
          res.json().then(data => {
            console.log(data)
          })
        //   history.push(`/post/${postId}/`)
          history.push("/")
        }
      })
    }

    const { title, content } = commentData

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

export default EditComment;

