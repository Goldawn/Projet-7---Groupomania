import { Component } from 'react';
import { Link } from "react-router-dom";
import { Card, Button } from 'react-bootstrap';
import Post from './Post';


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

            <Card style={{ width: '80%' }}>
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
                <div className = "Post">
                    <h1> Fetch data from an api in react </h1>  {
                        items.map((item) => {
                            // debugger
                            return(
                                <div>
                                    <Post item={item}/>
                                </div>
                        // item.Tests.map((comment) => {
                        //     return(
                        //         <div>
                        //             <p>{ comment.title }</p>
                        //             <p>{ comment.content }</p>
                        //         </div>
                        //     )
                        // })
                            )
                        })
                    }
                </div>
            );
    }
}
  
export default PostList;