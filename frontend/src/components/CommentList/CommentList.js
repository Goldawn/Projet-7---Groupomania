import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { Card, Form, Button } from 'react-bootstrap';
import loadData from '../../functions/loadData'
import Comment from '../Comment/Comment'
import Post from '../Post/Post'

import './CommentList.css'

const CommentList = (props) => {

    const history = useHistory();

    const [postData, setPostData]= useState();
    const [commentData, setCommentData] = useState()
    const [newComment, setNewComment] = useState()

    // on définit une fonction qui envoie une requête de récupération d'un post sélectionné au backend
    // la réponse est ensuite assignée au state postData
    const callApiPost = (postId, bearer) => {

        fetch(`http://localhost:9000/api/posts/id/${postId}/`, {
            method: 'GET',
            headers: { 
                "Content-Type": "application/json",
                "authorization": bearer
            }
            })
            .then((res) => res.json())
            .then((jsonPost) => {
            setPostData(jsonPost)}
            )
    }

    // on teste le contenu du state des propriétés du composant
    // si les propriétés contiennent un objet post, alors on l'assigne au state postData
    // si elles sont vides, alors on appelle la fonction callApiPost
            //puis on appelle à nouveau l'api pour récupérer la liste des commentaires d'un post spécifique et les assigner au state CommentData
    useEffect(() => {
        if (props.location.state) {
            setPostData(props.location.state.post)
        } else {
    
            const paramsId = props.location.pathname
            const postId = (paramsId.split('/'))[2]
            
            const auth = JSON.parse(loadData("authToken"))
            const bearer = "Bearer "+auth.token
            
            callApiPost(postId, bearer)            

            fetch(`http://localhost:9000/api/posts/${postId}/comments/`, {
                method: 'GET',
                headers: { 
                    "Content-Type": "application/json",
                    "authorization": bearer
                }
                })
                .then((res) => res.json())
                .then((jsonComment) => setCommentData(jsonComment))
            }
    },[])

    // on teste ici le contenu des propriétés du composant
    // si un objet post existe, alors on récupère le nombre de commentaires attachés au post.
    // si aucun commentaire n'est trouvé, on définit un nouvel état des données du commentaire. 
    // si des commentaires existent, on fait une requête à l'API pour récupérer des données exhaustives sur les commentaires et on les assigne au state.
    useEffect(() => {

        if(props.location.state) {
            if(props.location.state.post.comments.length>0) {
    
                const paramsId = props.location.pathname
                const postId = (paramsId.split('/'))[2]
                
                const auth = JSON.parse(loadData("authToken"))
                const bearer = "Bearer "+auth.token
    
                fetch(`http://localhost:9000/api/posts/${postId}/comments/`, {
                    method: 'GET',
                    headers: { 
                        "Content-Type": "application/json",
                        "authorization": bearer
                    }
                    })
                    .then((res) => res.json())
                    .then((json) => {
                        setCommentData(json)
                    }
                )
            }
            else {
                setCommentData(props.location.state.post.comments)
            }         
        }
    },[postData])

    // on définit un nouveau state au changement
    const changeHandler = e => {
        setNewComment(e.target.value)
    }

    // on récupères le token dans le localStorage et l'objet body qui contient les informations du nouveau commentaire
    // L'objet est envoyé dans le corps de la requête de création du commentaire
    // en cas de réponse favorable, l'utilisateur est redirigé vers la page du post concerné
    const submitHandler = e => {
        e.preventDefault()
        
        const auth = JSON.parse(loadData("authToken"))
        const bearer = "Bearer "+auth.token
        const body = { content: newComment }
        
        const postId = postData.id;
        
        fetch(`http://localhost:9000/api/posts/${postId}/comments/new`, {
            method: 'POST' ,
            headers: { 
                "Content-Type": "application/json",
                "authorization": bearer
            },
            body: JSON.stringify(body)})

            .then((res) => {
                if(res.status !== 200) {
                }
                else {
                    res.json().then(data => {
                    })
                    history.push(`/post/${postId}`)
                }
            })
    }
    
    if(postData && commentData) {
        return (
            <>
            <Post post={postData} handleLikeMutation={() => callApiPost(postData.id)}/>

            <Form id="form" onSubmit={submitHandler}>
                <Card id="top-comment"className="dark card-body">
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Label>{postData.comments.length} Commentaire(s)</Form.Label>
                        <Form.Control as="textarea" type="textarea" name="content" placeholder="Rédiger un commentaire" onChange={changeHandler}/>
                    </Form.Group>

                    <div id="submit-button">
                        <Button className="post-button" type="submit">
                            Envoyer le commentaire
                        </Button>
                    </div>
                </Card>
            </Form>


            <div id="all-comments">
                
                {
                    commentData && commentData.map((comment, id) => {
                        return(
                            <>
                                <Comment key={id} comment={comment}/>
                            </>
                        )
                    })
                }

            </div>
            </>
        )
    }
    return (
        <>Rien a afficher</>
    )

}

export default CommentList;

