
import { Link } from "react-router-dom";
import { Card, Button } from 'react-bootstrap';
import Comment from '../Comment/Comment';
import { useHistory } from 'react-router-dom';

import './Post.css'

export const DetailPost = ({ ...props }) => (   <Post detail={true} {...props} /> );

const Post = (props) => {

    const history = useHistory()

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


    console.log('test')
    console.log(props.post)
    console.log('test')
    // console.log(props.location.state.post)

    const item = props.post ? props.post : props.location.state.post;
    // const item = props.post ? props.post : myObject;

    // const myObject = {
    //     "id": 10,
    //     "title": "test",
    //     "content": "test",
    //     "attachment": "http://localhost:9000/images/Gal-Gadot-photoshoot-IEIQRZ-768x1152.jpg1638219941685.jpeg",
    //     "likesCounter": 0,
    //     "dislikesCounter": 0,
    //     "createdAt": "2021-11-29T13:33:04.000Z",
    //     "updatedAt": "2021-11-29T21:05:41.000Z",
    //     "userId": 7,
    //     "user": {
    //         "id": 7,
    //         "email": "test@test.com",
    //         "username": "Goldawn",
    //         "password": "$2b$05$Dr4XkDuLtWbQWmGU03z32em7OND63tOci8W.hzQODnOWQ0uE1WLuq",
    //         "attachment": "http://localhost:9000/images/245713586_560506835057582_1810524064439026955_n.jpg1638222408104.jpeg",
    //         "bio": "test",
    //         "isAdmin": false,
    //         "createdAt": "2021-11-29T13:25:13.000Z",
    //         "updatedAt": "2021-11-29T21:46:48.000Z"
    //     },
    //     "comments": [
    //         {
    //             "id": 5,
    //             "content": "test de commentaire",
    //             "attachment": null,
    //             "likesCounter": 0,
    //             "dislikesCounter": 0,
    //             "createdAt": "2021-11-29T20:16:59.000Z",
    //             "updatedAt": "2021-11-29T20:17:14.000Z",
    //             "userId": 7,
    //             "postId": 10
    //         },
    //         {
    //             "id": 6,
    //             "content": "autre",
    //             "attachment": null,
    //             "likesCounter": 0,
    //             "dislikesCounter": 0,
    //             "createdAt": "2021-11-29T20:27:10.000Z",
    //             "updatedAt": "2021-11-29T20:27:10.000Z",
    //             "userId": 7,
    //             "postId": 10
    //         },
    //         {
    //             "id": 7,
    //             "content": "encore",
    //             "attachment": null,
    //             "likesCounter": 0,
    //             "dislikesCounter": 0,
    //             "createdAt": "2021-11-29T20:27:15.000Z",
    //             "updatedAt": "2021-11-29T20:27:15.000Z",
    //             "userId": 7,
    //             "postId": 10
    //         }
    //     ]
    // }



    return(

        <div>
            <Card className="post-card dark" key={item.id}>
                <Card.Body>
                    <div id="profile-header">
                        <div className="profile-pic-container medium-pic">
                            <img src={item.user.attachment}></img>
                        </div>
                        <Card.Title>
                            {item.user.username}
                        </Card.Title>
                    </div>
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
                            {!props.detail && <Link className="post-button post-link" to={{pathname: "/post/"+String(item.id)+"/", state: {post: item}}}>comment</Link> }
                        </div>
                        <div className="right-buttons">
                            <Link className="post-button post-link" to={{pathname: "/post/"+String(item.id)+"/edit", state: {item: item} }}>edit</Link>
                            <Button className="post-button" id={item.id} onClick={() => handleDelete(item.id)}>delete</Button>
                        </div>
                    </div>
                    
                </Card.Body>
            </Card>
            
            {props.detail && <>

                {item.comments.map( (comment) => {
                    console.log(comment)
                    return(                
                        <Comment key={comment.id} comment={comment}/>
                    )
                })}

            </>}

        </div>
        
        )

}

export default Post;