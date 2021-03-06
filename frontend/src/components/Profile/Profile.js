import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link, useHistory } from "react-router-dom";
import loadData from '../../functions/loadData'
import avatarPlaceholder from '../../images/avatar-placeholder.png'

import "./Profile.css"

const Profile = (props) => {

    const [ profileData , setProfileData ] = useState({});

    const history = useHistory()

    // On récupère le token de l'utilisateur pui on le passe en paramètre de getData
    useEffect(() => {
        const auth = JSON.parse(loadData("authToken"))
        const bearer = "Bearer "+auth.token
        getData(bearer);
    }, [])

    // useEffect(() => {
    //     setDataIsLoaded(true)
    // }, [profileData])

    // On envoie la requête de récupération des données de l'utilisateur.
    // en cas de réponse favorable, le state est mis à jour, sinon l'utilisateur est redirigé sur la page de connection
    const getData = (bearer) => {

        fetch('http://localhost:9000/api/user/profile', {
          method: 'GET',
          headers: { 
              "Content-Type": "application/json",
              "authorization": bearer 
          }
        })
    
        .then((res) => res.json().then((json) => {
            if(!json) {
                history.push('/login')
            }
            else {                
                setProfileData(json)
            }
        }))
        
    }

    // On envoie la requête de suppression des données de l'utilisateur.
    // en cas de réponse favorable, on efface son token du localStorage, puis on le redirige vers la page de création de compte.
    const deleteProfile = (bearer) => {
        fetch(`http://localhost:9000/api/user/profile`, {
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
                localStorage.removeItem('authToken');
                history.push('/register')
            })
            }
        })
    }

    const handleDelete = () => {
        const auth = JSON.parse(loadData("authToken"))
        const bearer = "Bearer "+auth.token
        deleteProfile(bearer)
    }

    // on teste ici si le profil dispose d'une image de profil, s'il n'en a pas encoer ajouté, on définit une image par défaut.
    const getProfileData = (profilePic) => {
        if (profilePic === "") {
            profilePic = avatarPlaceholder;
        }
        return profilePic;
    }

    const profilePic = getProfileData(profileData.attachment);

    return  (

        <>
            <Card id="profile-card" className="dark">
                <Card.Body>
                    <div id="profile-header">
                        <div className="profile-pic-container">
                            <img src={profilePic}></img>
                        </div>
                        <Card.Title className="card-title profile-block">
                            {profileData.isAdmin && <span className="admin-tag">[Admin]</span>}
                            {profileData.username}
                            <p className="App-intro">{profileData.email}</p>
                        </Card.Title>
                    </div>
                    
                    <p className="App-intro">{profileData.bio}</p>
                </Card.Body>

                <Card.Body>
                    <div className="profile-buttons">
                        <Link className="post-button post-link" to={{pathname: "/profile/edit", state: {profileData: profileData}}}>Modifier le profil</Link>
                        <Button className="post-button red" onClick={() => handleDelete()}>Supprimer le profil</Button>
                    </div>
                </Card.Body>
            </Card>
        </>
    )

}
  
export default Profile;