import { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { Redirect } from 'react-router';

import "./Profile.css"

class Profile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            redirect: false,
            profileData: {},
            DataisLoaded: false
        };
    }

    getData(bearer) {

        fetch('http://localhost:9000/api/user/profile', {
          method: 'GET',
          headers: { 
              "Content-Type": "application/json",
              "authorization": bearer 
          }
        })
    
        .then((res) => res.json().then((json) => {
            if(!json) {
                console.log("token incorrect")
                this.setState({ redirect: true })
            }
            else {                
                this.setState({
                    profileData: json,
                    DataisLoaded: true
                });
            }      
        }))
    }

    loadData(key) {
        if(localStorage){
            if(key in localStorage) {
                return localStorage.getItem(key);
            }
        } else {
            alert("Web Storage is not supported");
        }
    }
    

    componentDidMount() {

        const auth = JSON.parse(this.loadData("authToken"))
        const bearer = "Bearer "+auth.token
        this.getData(bearer);
    }

    deleteProfile = (bearer) => {
        fetch(`http://localhost:9000/api/user/profile`, {
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

    handleDelete() {
        const auth = JSON.parse(this.loadData("authToken"))
        const bearer = "Bearer "+auth.token
        this.deleteProfile(bearer)
    }

    
    render() {

        console.log(this.state.profileData)

        const { redirect, DataisLoaded, profileData, postData } = this.state;

        if ( redirect ) {
            return <Redirect to='/login'/>;
        }
        else if (!DataisLoaded) {
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
                                <img src="https://cdn.iconscout.com/icon/free/png-256/react-1-282599.png"></img>
                            </div>
                            <Card.Title className="card-title">
                                {profileData.username}
                                <p className="App-intro">{profileData.email}</p>
                            </Card.Title>
                        </div>
                        
                        <p className="App-intro">{profileData.bio}</p>
                    </Card.Body>

                    <Card.Body>
                        <div className="profile-buttons">
                            <Link className="post-button post-link" to={{pathname: "/profile/edit", state: {profileData: profileData}}}>Modifier le profil</Link>
                            <Button className="post-button" onClick={() => this.handleDelete()}>Supprimer le profil</Button>
                        </div>
                    </Card.Body>
                                        
                </Card>

                {
                    this.state.profileData.posts.map((post) => {
                        return( 
                            <Card key={post.id} className="dark">
                                <Card.Body>
                                    <Card.Title>{ post.title } { post.id }</Card.Title>
                                </Card.Body>
                                <Card.Img variant="top" src="" />
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
                    this.state.profileData.comments.map((post) => {
                        return( 
                            <Card key={post.id} className="dark">
                                <Card.Body>
                                    <Card.Title>{ post.title } { post.id }</Card.Title>
                                </Card.Body>
                                <Card.Img variant="top" src="" />
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

            </div>
        )
    }
}
  
export default Profile;