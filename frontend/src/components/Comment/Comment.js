import { Component } from 'react';
import { Link } from "react-router-dom";
import { Card, Button } from 'react-bootstrap';

import "./Comment.css"


class Comment extends Component {

    constructor(props) {
        super(props);
   
    }

    loadData = (key) => {
        if(localStorage){
          if(key in localStorage) {
              return localStorage.getItem(key);
            }
          } else {
          alert("Web Storage is not supported");
        }
    }

    componentDidMount() {
        console.log(this.props.comment)
    }

    deleteComment = (postId, testId, bearer) => {
        fetch(`http://localhost:9000/api/posts/${postId}/tests/${testId}`, {
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
                // return <Redirect to='/'/>;
            })
            }
        })
    }
    

    handleClick = (commentId, postId) => {
        const auth = JSON.parse(this.loadData("authToken"))
        const bearer = "Bearer "+auth.token
        this.deleteComment(postId, commentId, bearer)
    }

    render() {
        const comment = this.props.comment ? this.props.comment : this.props.location.state.comment;
        return(

            <div>
                <Card className="comment-container" key={comment.id}>
                    <Card.Body>
                        <p>{comment.userId}</p>
                        <Card.Title>{comment.title}</Card.Title>
                        <Card.Text>{comment.content}</Card.Text>

                        <div className="sub-post">
                            <div className="left-buttons">
                                <Button className="post-button">+</Button>
                                <Button className="post-button">-</Button>
                            </div> 

                            <div className="right-buttons">
                                <Link  className="post-button post-link" to={{pathname: "comment/"+String(comment.id)+"/edit", state: {comment: comment} }}>edit</Link>
                                <Button className="post-button" onClick={() => this.handleClick(comment.id, comment.postId)}>delete</Button>
                            </div>
                        </div>
                        
                    </Card.Body>
                </Card>
            </div>  
        )
    }
}

export default Comment;