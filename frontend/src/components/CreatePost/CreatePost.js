import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';


const CreatePost = (props) => {

    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    const [attachment, setAttachment] = useState();

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

    const submitHandler = e => {
        e.preventDefault()
        const data = new FormData();
        data.append("title", title)
        data.append("content", content)
        data.append("file", attachment)
        
        const auth = JSON.parse(loadData("authToken"))
        const bearer = "Bearer "+auth.token

        fetch('http://localhost:9000/api/posts/new', {
            method: 'POST',
            headers: {
                "authorization": bearer
            },
            body: data})
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

    return (

        <Form id="form" onSubmit={submitHandler}>
        
            <Form.Group className="mb-3" controlId="formGroupPostTitle">
                <Form.Label>Titre</Form.Label>
                <Form.Control type="text" name="title" placeholder="Commencer à écrire..." onChange={event => { const { value } = event.target; setTitle(value)}} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupPostContent">
                <Form.Label>Message</Form.Label>
                <Form.Control as="textarea" type="textarea" name="content" placeholder="Commencer à écrire..." onChange={event => { const { value } = event.target; setContent(value)}} />
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
                    Enregistrer
                </Button>
            </div>
        </Form>
    )

}


export default CreatePost;