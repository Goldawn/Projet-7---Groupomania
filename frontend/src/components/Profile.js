import { Component } from 'react';
import { Card, Button } from 'react-bootstrap';


class Profile extends Component {

    constructor(props) {
        super(props);

        this.state = {
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
    
        .then((res) => res.json())
        .then((json) => {
            this.setState({
                profileData: json,
                DataisLoaded: true
            });
        })
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
        console.log(auth.token)
        const bearer = "Bearer "+auth.token
        this.getData(bearer);
    }

    
    render() {

        const { DataisLoaded, profileData } = this.state;
        console.log(profileData)

        if (!DataisLoaded) return (
            <div className="App">No data</div>
        )

        return  (
            <div className="App">
                <h1>Profile</h1>
                <p className="App-intro">{profileData.username}</p>
                <p className="App-intro">{profileData.email}</p>
                <p className="App-intro">{profileData.bio}</p>

                {
                    profileData.posts.map((item) => { 
                            // debugger
                            return( 
                            <Card key={item.id} style={{ width: '80%' }}>
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
                }
            </div>
        )
    }
}
  
export default Profile;