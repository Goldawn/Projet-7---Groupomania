import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';


const CreateComment = (props) => {

    const [createComment, setCreateComment] = useState({
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
        setCreateComment((previousState) => ({
          ...previousState,
          [e.target.name]: e.target.value
        })
        )
    }

    const submitHandler = e => {
        e.preventDefault()
        console.log(createComment)

        const auth = JSON.parse(loadData("authToken"))
        const bearer = "Bearer "+auth.token

    fetch('http://localhost:9000/api/posts/2/tests/new', {
        method: 'POST' ,
        headers: { 
            "Content-Type": "application/json",
            "authorization": bearer
        },
        body: JSON.stringify(createComment)})

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

    const { title, content } = createComment

    return <Form onSubmit={submitHandler}>
        
        <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Comment title</Form.Label>
            <Form.Control type="text" name="title" value={title} placeholder="Comment title" onChange={changeHandler} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Comment content</Form.Label>
            <Form.Control type="textarea" name="content" value={content} placeholder="Comment content" onChange={changeHandler} />
        </Form.Group>

        <Button variant="primary" type="submit">
            Create
        </Button>
    </Form>

}


export default CreateComment;