
import { Link, useLocation, useHistory } from "react-router-dom";
import { Card, Button } from 'react-bootstrap';
import Moment from 'react-moment';
import Comment from '../Comment/Comment';
import commentLogo from '../../images/comment.png'
import likeLogo from '../../images/like.png'
import editLogo from '../../images/edit.png'
import deleteLogo from '../../images/delete.png'
import avatarPlaceholder from '../../images/avatar-placeholder.png'

import './Post.css'

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
            return(res)
            }
            else {
            res.json().then(data => {
                history.push('/')
            })
            }
        })
    }

    const likePost = (postId, bearer) => {
        fetch(`http://localhost:9000/api/posts/${postId}/vote/like`, {
            method: 'POST',
            headers: { 
                "Content-Type": "application/json",
                "authorization": bearer
            }
        })
        .then((res) => {
            if(res.status !== 200) {
                return(res)
            }
            else {
            res.json().then(data => {
                props.handleLikeMutation()
            })
            }
        })
    }
    
    const handleDelete = (id) => {
        const auth = JSON.parse(loadData("authToken"))
        const bearer = "Bearer "+auth.token
        deletePost(id, bearer)
    }

    const handleLike = (id) => {
        const auth = JSON.parse(loadData("authToken"))
        const bearer = "Bearer "+auth.token
        likePost(id, bearer)
    }

    const renderIsAuthor = () => {
        const auth = JSON.parse(loadData("authToken")) 
        const tokenData = parseJwt(auth.token)

        if((props.post.userId === tokenData.userId) || (tokenData.isAdmin)) {
            return(
                <>
                <Link className="post-button post-link" to={{pathname: "/post/"+String(post.id)+"/edit", state: {post: post} }}>
                    <img className="button-logo" src={editLogo}></img>
                </Link>
                <Button className="post-button red" id={post.id} onClick={() => handleDelete(post.id)}>
                    <img className="button-logo" src={deleteLogo}></img>
                </Button>
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
                <Card.Body className='card-header'>
                    <div id="profile-header">
                        <div className="profile-pic-container medium-pic">
                            <img src={post.user.attachment ? post.user.attachment : avatarPlaceholder}></img>
                        </div>
                        <Card.Title>
                            {post.user.username}
                            <Moment locale="fr" fromNow>{post.createdAt}</Moment>
                        </Card.Title>
                    </div>
                    <Card.Title>
                        <Link to={{pathname: "/post/"+String(post.id)+"/", state: {post: post}}}>
                            {post.title } 
                        </Link>
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
                            <Button className="post-button" onClick={() => handleLike(post.id)}>
                                <img className="button-logo" src={likeLogo}></img>{post.likes.length}
                            </Button>
                            {!props.detail && <Link className="post-button post-link" to={{pathname: "/post/"+String(post.id)+"/", state: {post: post}}}>
                                <img className="button-logo bigger-logo" src={commentLogo}></img>{post.comments.length}
                            </Link> }
                        </div>
                        <div className="right-buttons">
                            {renderIsAuthor()}
                        </div>
                    </div>
                    
                </Card.Body>
            </Card>
            
            {props.detail && <>

                {post.comments.map( (comment) => {
                    return(                
                        <Comment key={comment.id}/>
                    )
                })}

            </>}

        </div>
        
        )

}

export default Post;