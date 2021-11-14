import { Component } from 'react';
import { Link,Redirect } from "react-router-dom";
import { Card, Button } from 'react-bootstrap';
import Comment from './Comment';

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
            })
            //  <Redirect to='/'/>;
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
                <Card key={item.id} style={{ width: '400px', margin: '20px auto 0' }}>
                    <Card.Body>
                        <Card.Title>{item.title }{' '+item.id }</Card.Title>
                    </Card.Body>
                    <Card.Img variant="top" src="" />
                    <Card.Body>
                        <Card.Text>
                            { item.content }
                        </Card.Text>
                        <Button variant="success">+</Button>
                        <Button variant="danger">-</Button>
                        {!this.props.detail && <Link to={{pathname: "/post/"+String(item.id), state: {item: item}}}>comment</Link> }
                        <Link to={{pathname: "/post/"+String(item.id)+"/edit", state: {item: item} }}>edit</Link>
                        <Button variant="danger" id={item.id} onClick={() => this.handleClick(item.id)}>delete</Button>
                    </Card.Body>
                </Card>
                
                {item.Tests.map( (comment) => {
                    console.log(comment)
                    return(
                        <Comment comment={comment}/>
                    )
                })}
            </div>
            
         )
    }
}

export default Post;