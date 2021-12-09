import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Card } from 'react-bootstrap';
import Post from '../Post/Post';

import "./PostList.css"


const PostList = (props) => {

    const [ posts, setPosts ] = useState([]);
    const [ postsExists, setPostsExists ] = useState();

    // on appelle la fonction de récupération de la liste des posts
    useEffect(() => {        
        callApiPost()
    },[])

    // on teste si la liste des posts est vide et on stocke la réponse dans lle state postsExists
    useEffect(() => {
        if (posts.length>0) {
            setPostsExists(true)
        }
    },[posts])

    // on définit une fonction qui appelle l'API et reçoit la liste des posts du plus récent au plus ancien
    const callApiPost = () => {
        fetch("http://localhost:9000/api/posts")
            .then((res) => res.json())
            .then((json) => setPosts(json))
    }

    return (
        <div id="all-posts">
            
            { !postsExists && 
            <Card  className="dark">
                <Card.Body>
                
                <div className='text-center'>
                    <Card.Text>Il 'ny a aucune publication à afficher</Card.Text>
                    <Card.Text>Soyez le premier à partager !</Card.Text>
                </div>
                </Card.Body>  
            </Card>}

            <div id="create-post-container">
                <Link className="post-link create-post" to={{pathname: "/post/new" }}>Créer un post</Link>
            </div>

            {
                posts.map((post, id) => {
                    return(
                        <>
                        <div>
                            <Post key={id} post={post} handleLikeMutation={() => callApiPost()}/>
                        </div>
                        </>
                    )
                })
                
            }
        </div>
    );

}
  
export default PostList;