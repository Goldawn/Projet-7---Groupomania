import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link, useHistory } from "react-router-dom";

import avatarPlaceholder from '../../images/avatar-placeholder.png'

import "./Profile.css"

const Profile = (props) => {

    const [ profileData , setProfileData ] = useState({});
    const [ dataIsLoaded , setDataIsLoaded ] = useState({});

    const history = useHistory()

    useEffect(() => {
        const auth = JSON.parse(loadData("authToken"))
        const bearer = "Bearer "+auth.token
        getData(bearer);
    }, [])

    useEffect(() => {
        setDataIsLoaded(true)
    }, [profileData])


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

    const loadData = (key) => {
        if(localStorage){
            if(key in localStorage) {
                return localStorage.getItem(key);
            }
        } else {
            alert("Web Storage is not supported");
        }
    }

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

    const getProfileData = (profilePic) => {
        if (profilePic === "") {
            profilePic = avatarPlaceholder;
        }
        return profilePic;
    }

    const profilePic = getProfileData(profileData.attachment);

    if (!dataIsLoaded) {
        return (
        <div className="App">No data</div>
        )
    }

    return  (

        <div>

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
                        <Button className="post-button" onClick={() => handleDelete()}>Supprimer le profil</Button>
                    </div>
                </Card.Body>
                                    
            </Card>

            {/* {
                profileData.posts.map((post) => {
                    return( 
                        <Card key={post.id} className="dark">
                            <Card.Body>
                                <Card.Title>{ post.title } { post.id }</Card.Title>
                            </Card.Body>
                            <Card.Body>
                                <Card.Text>
                                { post.content }
                                </Card.Text>
                                <Button variant="primary">Add a comment</Button>
                            </Card.Body>
                        </Card>
                    )
                })

            }

            {
                profileData.comments.map((post) => {
                    return( 
                        <Card key={post.id} className="dark">
                            <Card.Body>
                                <Card.Title>{ post.title } { post.id }</Card.Title>
                            </Card.Body>
                            <Card.Body>
                                <Card.Text>
                                { post.content }
                                </Card.Text>
                                <Button variant="primary">Add a comment</Button>
                            </Card.Body>
                        </Card>
                    )
                })

            } */}

        </div>
    )

}
  
export default Profile;