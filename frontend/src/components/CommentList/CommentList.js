import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { Card, Form, Button } from 'react-bootstrap';
import Comment from '../Comment/Comment'
import Post from '../Post/Post'

import './CommentList.css'

const CommentList = (props) => {

    const history = useHistory();

    const [ commentData, setCommentData ]= useState([]);
    const [ postData, setPostData ]= useState([]);
    const [comment, setComment] = useState()

    useEffect(() => {

        const postId = props.location.state.post.id;
        const auth = JSON.parse(loadData("authToken"))
        const bearer = "Bearer "+auth.token

        fetch(`http://localhost:9000/api/posts/${postId}/comments/`, {
            method: 'GET',
            headers: { 
                "Content-Type": "application/json",
                "authorization": bearer
            }
        })
        .then((res) => res.json())
        .then((json) => setCommentData(json))
        console.log(commentData)
    },[])

    useEffect(() => {

        const postId = 1;
        const auth = JSON.parse(loadData("authToken"))
        const bearer = "Bearer "+auth.token

        fetch(`http://localhost:9000/api/posts/id/${postId}/`, {
            method: 'GET',
            headers: { 
                "Content-Type": "application/json",
                "authorization": bearer
            }
        })
        .then((res) => res.json())
        .then((json) => setPostData(json))
    }, [])

    useEffect(() => {
        console.log(postData)
        console.log(props)
    },[postData])

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
        setComment(e.target.value)
    }

    const submitHandler = e => {
        e.preventDefault()
        
        const auth = JSON.parse(loadData("authToken"))
        const bearer = "Bearer "+auth.token
        const body = { content: comment }

        const postId = props.location.state.post.id;

        fetch(`http://localhost:9000/api/posts/${postId}/comments/new`, {
            method: 'POST' ,
            headers: { 
                "Content-Type": "application/json",
                "authorization": bearer
            },
            body: JSON.stringify(body)})

            .then((res) => {
                if(res.status !== 200) {
                    console.log(res)
                }
                else {
                    res.json().then(data => {
                    console.log(data)
                    })
                    history.push(`/`)
                    // history.push(`/post/${postId}`)
                }
            })
    }

    const post = props.location.state.post ? props.location.state.post : postData;

    return (
        <>
        <Post post={post}/>

        <Form id="form" onSubmit={submitHandler}>
            <Card id="top-comment"className="dark card-body">
                <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Label>{commentData.length} Commentaire(s)</Form.Label>
                    <Form.Control as="textarea" type="textarea" name="content" placeholder="Rédiger un commentaire" onChange={changeHandler}/>
                </Form.Group>

                <div id="submit-button">
                    <Button className="post-button" type="submit">
                        Envoyer le commentaire
                    </Button>
                </div>

            </Card>
        </Form>


        <div id="all-comments">
            
            {
                commentData && commentData.map((comment, id) => {
                    return(
                        <>
                            <Comment key={id} comment={comment}/>
                        </>
                    )
                })
            }

        </div>
        </>
    )

}

export default CommentList;

