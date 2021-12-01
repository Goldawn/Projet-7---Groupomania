
import { Link, useLocation, useHistory } from "react-router-dom";
import { Card, Button } from 'react-bootstrap';
import Comment from '../Comment/Comment';

import './Post.css'

export const DetailPost = ({ ...props }) => (   <Post detail={true} {...props} /> );

const Post = (props) => {

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
                history.push('/')
            })
            }
        })
    }
    

    const handleDelete = (id) => {
        const auth = JSON.parse(loadData("authToken"))
        const bearer = "Bearer "+auth.token
        deletePost(id, bearer)
    }

    console.log(props)
    let post;
    if (props.post.length === 0) {
        post = location.state.post
    }
    else {
        post = props.post;
    }

    return(

        <div>
            <Card className="post-card dark" key={post.id}>
                <Card.Body>
                    <div id="profile-header">
                        <div className="profile-pic-container medium-pic">
                            <img src={post.user.attachment}></img>
                        </div>
                        <Card.Title>
                            {post.user.username}
                        </Card.Title>
                    </div>
                    <Card.Title>
                        <Link to={{pathname: "/post/"+String(post.id)+"/", state: {post: post}}}>{post.title }{' '+post.id }</Link>
                    </Card.Title>
                </Card.Body>
                <Card.Img variant="top" src="" />
                <Card.Body>

                    <div className="image-container">
                        <img src={post.attachment}></img>
                    </div>
                    
                    <Card.Text className="card-content">
                        { post.content }
                    </Card.Text>

                    <div className="sub-post">
                        <div className="left-buttons">
                            <Button className="post-button">+ {post.likes}</Button>
                            <Button className="post-button">- {post.dislikes}</Button>
                            {!props.detail && <Link className="post-button post-link" to={{pathname: "/post/"+String(post.id)+"/", state: {post: post}}}>comment</Link> }
                        </div>
                        <div className="right-buttons">
                            <Link className="post-button post-link" to={{pathname: "/post/"+String(post.id)+"/edit", state: {post: post} }}>edit</Link>
                            <Button className="post-button" id={post.id} onClick={() => handleDelete(post.id)}>delete</Button>
                        </div>
                    </div>
                    
                </Card.Body>
            </Card>
            
            {props.detail && <>

                {post.comments.map( (comment) => {
                    console.log(comment)
                    return(                
                        <Comment key={comment.id}/>
                    )
                })}

            </>}

        </div>
        
        )

}

export default Post;