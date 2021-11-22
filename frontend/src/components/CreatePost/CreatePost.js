import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';


const CreatePost = (props) => {

    const [createPost, setCreatePost] = useState({
        title: "",
        content:"",
    })
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

    const changeHandler = e => {
        console.log(e.target.value)
        setCreatePost((previousState) => ({
          ...previousState,
          [e.target.name]: e.target.value
        })
        )
    }

    const submitHandler = e => {
        e.preventDefault()
     
        console.log(createPost)
        console.log(attachment)

        // const wholePost = {...createPost, ...attachment};
        const wholePost = new FormData();
        console.log(wholePost)
        wholePost.append("title", title)
        console.log(wholePost)
        wholePost.append("content", content)
        console.log(wholePost)
        wholePost.append("attachment", attachment)
        console.log(wholePost)

        const auth = JSON.parse(loadData("authToken"))
        const bearer = "Bearer "+auth.token

    // fetch('http://localhost:9000/api/posts/new', {
    fetch('https://httpbin.org/anything', {
        method: 'POST' ,
        // headers: { 
        //     "Content-Type": "application/json",
        //     "authorization": bearer
        // },
        body: JSON.stringify(wholePost)})
        .then(res => console.log(res))
        .catch(err => console.log(err));

        // .then((res) => {
        //     if(res.status !== 200) {
        //         console.log(res)
        //     }
        //     else {
        //         res.json().then(data => {
        //           console.log(data)
        //         })
        //         history.push('/')
        //     }
        // })
    }

    const { title, content } = createPost

    return (

        <Form id="form" onSubmit={submitHandler}>
        
            <Form.Group className="mb-3" controlId="formGroupPostTitle">
                <Form.Label>Titre</Form.Label>
                <Form.Control type="text" name="title" value={title} placeholder="Commencer à écrire..." onChange={changeHandler} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupPostContent">
                <Form.Label>Message</Form.Label>
                <Form.Control as="textarea" type="textarea" name="content" value={content} placeholder="Commencer à écrire..." onChange={changeHandler} />
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
                    Enregistrer
                </Button>
            </div>
        </Form>
    )

}


export default CreatePost;