
// import { Form, Button } from 'react-bootstrap';
import { Link,Redirect } from "react-router-dom";
import { Card, Form, Button } from 'react-bootstrap';
import Comment from '../Comment/Comment';

import './Post.css'

export const DetailPost = ({ ...props }) => (   <Post detail={true} {...props} /> );

const Post = (props) => {

    const loadData = (key) => {
        if(localStorage){
          if(key in localStorage) {
              return localStorage.getItem(key);
            }
          } else {
          alert("Web Storage is not supported");
        }
    }  

    const deletePost = (postId, bearer) => {
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
            }
        })
    }
    

    const handleClick = (id) => {
        const auth = JSON.parse(loadData("authToken"))
        const bearer = "Bearer "+auth.token
        deletePost(id, bearer)
    }


    const item = props.post ? props.post : props.location.state.post;

    return(

        <div>
            <Card className="post-card dark" key={item.id}>
                <Card.Body>
                    <p>{item.user.username}</p>
                    <Card.Title>
                        <Link to={{pathname: "/post/"+String(item.id)+"/", state: {post: item}}}>{item.title }{' '+item.id }</Link>
                    </Card.Title>
                </Card.Body>
                <Card.Img variant="top" src="" />
                <Card.Body>

                    <div className="image-container">
                        <img src={item.attachment}></img>
                    </div>
                    
                    <Card.Text className="card-content">
                        { item.content }
                    </Card.Text>

                    <div className="sub-post">
                        <div className="left-buttons">
                            <Button className="post-button">+ {item.likes}</Button>
                            <Button className="post-button">- {item.dislikes}</Button>
                            {!props.detail && <Link className="post-button post-link" to={{pathname: "/post/#top-comment"+String(item.id)+"/", state: {item: item.id}}}>comment</Link> }
                        </div>
                        <div className="right-buttons">
                            {props.detail && <Link style={{margin: '10px'}} to={{pathname: "comments/new", state: {item: item}}}>write a comment</Link> }
                            <Link className="post-button post-link" to={{pathname: "/post/"+String(item.id)+"/edit", state: {item: item} }}>edit</Link>
                            <Button className="post-button" id={item.id} onClick={() => handleClick(item.id)}>delete</Button>
                        </div>
                    </div>
                    
                </Card.Body>
            </Card>
            
            {props.detail && <>

                {item.comments.map( (comment, id) => {
                    console.log(comment)
                    return(                
                        <Comment key={id} comment={comment}/>                    
                    )
                })}

            </>}

        </div>
        
        )

}

export default Post;