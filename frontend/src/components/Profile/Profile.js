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
            console.log(json)
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

    handleClick() {
        const auth = JSON.parse(this.loadData("authToken"))
        const bearer = "Bearer "+auth.token
        this.deleteProfile(bearer)
    }

    
    render() {

        const { redirect, DataisLoaded, profileData } = this.state;

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

                <Card id="profile-card">
                    <Card.Body>
                        <Card.Title className="card-title">
                            {profileData.username}
                        </Card.Title>
                        <p className="App-intro">{profileData.email}</p>
                        <p className="App-intro">{profileData.bio}</p>
                    </Card.Body>

                    <Card.Body>
                        <div className="left-buttons">
                            <Link className="post-button post-link" to={{pathname: "/profile/edit", state: {profileData: profileData}}}>Edit profile</Link>
                            <Button className="post-button" onClick={() => this.handleClick()}>delete</Button>
                        </div>
                    </Card.Body>
                                        
                </Card>

                {/* {
                    profileData.posts.map((item) => { 
                            // debugger
                            return( 
                            <Card key={item.id}>
                            <Card.Body>
                                <Card.Title>{ item.title }{ item.id }</Card.Title>
                            </Card.Body>
                            <Card.Img variant="top" src="" />
                            <Card.Body>
                                <Card.Text>
                                { item.content }
                                </Card.Text>
                                <Button variant="primary">Add a comment</Button>
                            </Card.Body>
                        </Card>
                    )})
                } */}
            </div>
        )
    }
}
  
export default Profile;