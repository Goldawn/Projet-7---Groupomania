import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';


const CreatePost = (props) => {

    const [createPost, setCreatePost] = useState({
        title: "",
        content:""
    })

    const history = useHistory()

    const loadData = (key) => {
        if(localStorage){
          if(key in localStorage) {
              return localStorage.getItem(key);
            }
          } else {
          alert("Web Storage is not supported");
        }
    }

    const changeHandler = e => {
        setCreatePost((previousState) => ({
          ...previousState,
          [e.target.name]: e.target.value
        })
        )
    }

    const submitHandler = e => {
        e.preventDefault()
        console.log(createPost)

        const auth = JSON.parse(loadData("authToken"))
        const bearer = "Bearer "+auth.token

    fetch('http://localhost:9000/api/posts/new', {
        method: 'POST' ,
        headers: { 
            "Content-Type": "application/json",
            "authorization": bearer
        },
        body: JSON.stringify(createPost)})

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

    const { title, content } = createPost

    return <Form onSubmit={submitHandler}>
        
        <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Post title</Form.Label>
            <Form.Control type="text" name="title" value={title} placeholder="Post title" onChange={changeHandler} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>post content</Form.Label>
            <Form.Control type="textarea" name="content" value={content} placeholder="Post content" onChange={changeHandler} />
        </Form.Group>

        <Button variant="primary" type="submit">
            Create
        </Button>
    </Form>

}


export default CreatePost;