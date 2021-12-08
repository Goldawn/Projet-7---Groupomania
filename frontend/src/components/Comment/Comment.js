import React, { useEffect, useState } from 'react';
import { Link, useLocation, useHistory } from "react-router-dom";
import { Card, Button } from 'react-bootstrap';
import Moment from 'react-moment';
import avatarPlaceholder from '../../images/avatar-placeholder.png'

import "./Comment.css"


const Comment = (props) => {

    const history = useHistory()
    const location = useLocation();

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
            history.push(`/`)
            })
            }
        })
    }
    
    const handleDelete = (commentId, postId) => {
        const auth = JSON.parse(loadData("authToken"))
        const bearer = "Bearer "+auth.token
        deleteComment(postId, commentId, bearer)
    }

    const renderIsAuthor = () => {
        const auth = JSON.parse(loadData("authToken")) 
        const tokenData = parseJwt(auth.token)

        if((props.comment.user.id === tokenData.userId) || (tokenData.isAdmin)){
            return(
                <>
                <Link  className="post-button post-link" to={{pathname: "/post/"+comment.postId+"/comment/"+String(comment.id)+"/edit", state: {comment: comment} }}>edit</Link>
                <Button className="post-button" onClick={() => handleDelete(comment.id, comment.postId)}>delete</Button>
                </>
            )
        }
    }

    const parseJwt = (token) => {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    }

    const comment = props.comment ? props.comment : props.location.state.comment;
    console.log(comment)
    return(

        <div>
            <Card className="comment-container dark" key={props.comment.id}>
                <Card.Body>

                    <div id="profile-header">
                        <div className="profile-pic-container small-pic">
                            <img src={props.comment.user.attachment ? props.comment.user.attachment : avatarPlaceholder}></img>
                        </div>
                        <Card.Title className="card-title">
                            {props.comment.user.username}
                            <Moment locale="fr" fromNow>{props.comment.createdAt}</Moment>
                        </Card.Title>
                    </div>

                    <Card.Text>{props.comment.content}</Card.Text>

                    <div className="sub-post">
                        <div className="left-buttons">
                        </div>

                        <div className="right-buttons">
                            {renderIsAuthor()}
                        </div>
                    </div> 
                    
                </Card.Body>
            </Card>
        </div>  
    )
    
}

export default Comment;