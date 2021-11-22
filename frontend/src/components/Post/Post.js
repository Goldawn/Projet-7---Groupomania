import { Component } from 'react';
import { Link,Redirect } from "react-router-dom";
import { Card, Button } from 'react-bootstrap';
import Comment from '../Comment/Comment';

import './Post.css'

export const DetailPost = ({ ...props }) => (   <Post detail={true} {...props} /> );

class Post extends Component {

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
        console.log(this.props.item)
    }

    

    deletePost = (postId, bearer) => {
        fetch(`http://localhost:9000/api/posts/${postId}`, {
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
    

    handleClick = (id) => {
        const auth = JSON.parse(this.loadData("authToken"))
        const bearer = "Bearer "+auth.token
        this.deletePost(id, bearer)
    }

    render() {
        const item = this.props.item ? this.props.item : this.props.location.state.item;
        return(

            <div>
                <Card className="post-card" key={item.id}>
                    <Card.Body>
                        <p>{item.user.username}</p>
                        <Card.Title>
                            <Link to={{pathname: "/post/"+String(item.id)+"/", state: {item: item}}}>{item.title }{' '+item.id }</Link>
                        </Card.Title>
                    </Card.Body>
                    <Card.Img variant="top" src="" />
                    <Card.Body>

                        <div className="image-container">
                        <img src="https://via.placeholder.com/300"></img>
                        </div>
                        
                        <Card.Text className="card-content">
                            { item.content }
                        </Card.Text>

                        <div className="sub-post">
                            <div className="left-buttons">
                                <Button className="post-button">+</Button>
                                <Button className="post-button">-</Button>
                                {!this.props.detail && <Link className="post-button post-link" to={{pathname: "/post/"+String(item.id)+"/", state: {item: item}}}>comment</Link> }
                            </div>                            
                            <div className="right-buttons">
                                {this.props.detail && <Link style={{margin: '10px'}} to={{pathname: "comment/new", state: {item: item}}}>write a comment</Link> }
                                <Link className="post-button post-link" to={{pathname: "/post/"+String(item.id)+"/edit", state: {item: item} }}>edit</Link>
                                <Button className="post-button" id={item.id} onClick={() => this.handleClick(item.id)}>delete</Button>
                            </div>
                        </div>
                        
                    </Card.Body>
                </Card>
                
                
                {item.Tests.map( (comment) => {
                    console.log(comment)
                    return(
                        this.props.detail && <Comment comment={comment}/>
                    )
                })}
            </div>
            
         )
    }
}

export default Post;