import { Component } from 'react';
import { Link } from "react-router-dom";
import { Card, Button } from 'react-bootstrap';
import Post from '../Post/Post';

import "./PostList.css"


class PostList extends Component {

    constructor(props) {
        super(props);
   
        this.state = {
            items: [],
            dataIsLoaded: false
        };
    }

    componentDidMount() {
        
        fetch("http://localhost:9000/api/posts")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    items: json,
                    dataIsLoaded: true
                });
            })
    }

    render() {

        const { dataIsLoaded, items } = this.state;
        console.log(this.state.items)
        if (!dataIsLoaded) return (

            <Card style={{ width: '600px' }}>
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                </Card.Body>
                <Card.Img variant="top" src="https://cdn.iconscout.com/icon/free/png-256/react-1-282599.png" />
                <Card.Body>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                    </Card.Text>
                    <Button variant="primary">like</Button>
                    <Button variant="primary">dislike</Button>
                    <Button variant="primary">comment</Button>
                </Card.Body>
            </Card>
        )

            return (
                <div id="all-posts">

                    <div id="create-post-container">
                        <Link className="post-link create-post" to={{pathname: "/post/new" }}>Créer un post</Link>
                    </div>
                    
                    {
                        items.map((item) => {
                            return(
                                <div>
                                    <Post item={item}/>
                                </div>
                            )
                        })
                    }
                </div>
            );
    }
}
  
export default PostList;