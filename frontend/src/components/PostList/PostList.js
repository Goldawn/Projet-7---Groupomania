import { Component } from 'react';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Card, Button } from 'react-bootstrap';
import Post from '../Post/Post';

import "./PostList.css"


const PostList = (props) => {

    const [ posts, setPosts ] = useState([]);
    const [ postsExists, setPostsExists ] = useState();

    useEffect(() => {
        
        fetch("http://localhost:9000/api/posts")
            .then((res) => res.json())
            .then((json) => setPosts(json))
    },[])

    useEffect(() => {
        if (posts.length>0) {
            setPostsExists(true)
        }
    },[posts])



    return (
        <div id="all-posts">

            <div id="create-post-container">
                <Link className="post-link create-post" to={{pathname: "/post/new" }}>Créer un post</Link>
            </div>
            
            {
                posts.map((post, id) => {
                    return(
                        <>
                        <div>
                            <Post key={id} post={post}/>
                        </div>
                        { !postsExists && <div classNae="card-body dark">
                            <p>Soyez le premier à partager !</p>
                        </div>}
                        </>
                    )
                })
                
            }
        </div>
    );

}
  
export default PostList;