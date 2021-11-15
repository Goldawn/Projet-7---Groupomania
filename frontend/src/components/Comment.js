import { Component } from 'react';
import { Link } from "react-router-dom";
import { Card, Button } from 'react-bootstrap';


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
                <Card key={comment.id} style={{ width: '400px', margin: 'auto' }}>
                    <Card.Body>
                        <Card.Title>{comment.title}</Card.Title>
                        <Card.Text>{comment.content}</Card.Text>
                        <Button variant="success">+</Button>
                        <Button variant="danger">-</Button>
                        <Link style={{margin: '10px'}} to={{pathname: "comment/"+String(comment.id)+"/edit", state: {comment: comment} }}>edit</Link>
                        <Button variant="danger" onClick={() => this.handleClick(comment.id, comment.postId)}>delete</Button>
                    </Card.Body>
                </Card>
            </div>  
        )
    }
}

export default Comment;