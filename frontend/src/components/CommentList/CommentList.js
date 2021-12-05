import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { Card, Form, Button } from 'react-bootstrap';
import Comment from '../Comment/Comment'
import Post from '../Post/Post'

import './CommentList.css'

const CommentList = (props) => {

    const history = useHistory();

    const [postData, setPostData]= useState();
    const [commentData, setCommentData] = useState()
    const [newComment, setNewComment] = useState()
    const [reload, setReload] = useState(true);
    // const [dataIsLoaded, setDataIsLoaded] = useState(false)

    useEffect(() => {
        console.log(props.location.state)
        if (props.location.state) {
            setPostData(props.location.state.post)
        } else {
    
            const postId = Number(props.location.pathname.slice(6,7))
            console.log(postId)
            
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
            .then((jsonPost) => {
            console.log(jsonPost)
            setPostData(jsonPost)}
            )
            

            fetch(`http://localhost:9000/api/posts/${postId}/comments/`, {
                method: 'GET',
                headers: { 
                    "Content-Type": "application/json",
                    "authorization": bearer
                }
                })
                .then((res) => res.json())
                .then((jsonComment) => setCommentData(jsonComment))
            }
    },[])

    useEffect(() => {

        if(props.location.state) {
            if(props.location.state.post.comments.length>0) {
    
                const postId = Number(props.location.pathname.slice(6,7))
                
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
                    .then((json) => {
                        console.log(props.location)
                        setCommentData(json)
                    }
                )
            }
            else {
                setCommentData(props.location.state.post.comments)
            }         
        }
    },[postData])

    // useEffect(() => {
    //     console.log('commentData',commentData)
    //     setDataIsLoaded(true)
    // }, [commentData])


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
        setNewComment(e.target.value)
    }

    const submitHandler = e => {
        e.preventDefault()
        
        const auth = JSON.parse(loadData("authToken"))
        const bearer = "Bearer "+auth.token
        const body = { content: newComment }
        
        const postId = postData.id;
        
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
                    // history.push(`/`)
                    history.push(`/post/${postId}`)
                    setReload(!reload)
                }
            })
    }
    
    

    if(postData && commentData) {
        // console.log(postData, commentData)
        return (
            <>
            <Post post={postData}/>

            <Form id="form" onSubmit={submitHandler}>
                <Card id="top-comment"className="dark card-body">
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Label>{postData.comments.length} Commentaire(s)</Form.Label>
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
    return (
        <></>
    )

}

export default CommentList;

