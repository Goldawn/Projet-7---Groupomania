import React, { useEffect, useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import { Card, Button } from 'react-bootstrap';

import "./Comment.css"


const Comment = (props) => {

    const history = useHistory()
    // useEffect(() => {

    //     const postId = 1;
    //     // const postId = props.comment.postId;
    //     const auth = JSON.parse(loadData("authToken"))
    //     const bearer = "Bearer "+auth.token

    //     fetch(`http://localhost:9000/api/posts/${postId}/comments/`, {
    //         method: 'GET',
    //         headers: { 
    //             "Content-Type": "application/json",
    //             "authorization": bearer
    //         }
    //     })
    //     .then((res) => res.json())
    //     .then((json) => setCommentData(json))
    //     console.log(commentData)
    // },[])

    const loadData = (key) => {
        if(localStorage){
          if(key in localStorage) {
              return localStorage.getItem(key);
            }
          } else {
          alert("Web Storage is not supported");
        }
    }

    const deleteComment = (postId, testId, bearer) => {
        fetch(`http://localhost:9000/api/posts/${postId}/comments/${testId}`, {
            method: 'DELETE',
            headers: { 
                "Content-Type": "application/json",
                "authorization": bearer
            }
        })
        .then((res) => {
            if(res.status !== 200) {
            console.log(res)
            }
            else {
            res.json().then(data => {
                console.log(data)
            history.push(`/post/${postId}`)
            })
            }
        })
    }
    

    const handleClick = (commentId, postId) => {
        const auth = JSON.parse(loadData("authToken"))
        const bearer = "Bearer "+auth.token
        deleteComment(postId, commentId, bearer)
    }
    const comment = props.comment ? props.comment : props.location.state.comment;

    return(

        <div>
            <Card className="comment-container dark" key={props.comment.id}>
                <Card.Body>
                    <p>{props.comment.user.username}</p>
                    <Card.Title>{props.comment.title}</Card.Title>
                    <Card.Text>{props.comment.content}</Card.Text>

                    <div className="sub-post">
                        <div className="left-buttons">
                            <Button className="post-button">+</Button>
                            <Button className="post-button">-</Button>
                        </div>

                        <div className="right-buttons">
                            <Link  className="post-button post-link" to={{pathname: "comment/"+String(comment.id)+"/edit", state: {comment: comment} }}>edit</Link>
                            <Button className="post-button" onClick={() => handleClick(comment.id, comment.postId)}>delete</Button>
                        </div>
                    </div> 
                    
                </Card.Body>
            </Card>
        </div>  
    )
    
}

export default Comment;