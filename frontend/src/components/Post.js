import { Component } from 'react';
import { Card, Button } from 'react-bootstrap';


class Post extends Component {

    constructor(props) {
        super(props);
   
        this.state = {
            items: [],
            DataisLoaded: false
        };
    }

    componentDidMount() {
        fetch("http://localhost:9000/api/posts")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    items: json,
                    DataisLoaded: true
                });
            })
    }

    render() {

        const { DataisLoaded, items } = this.state;
        if (!DataisLoaded) return (

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
                    <Button variant="primary">Add a comment</Button>
                </Card.Body>
            </Card>
        )

            return (
                <div className = "App">
                    <h1> Fetch data from an api in react </h1>  {
                        items.map((item) => { 
                            console.log(item)
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
                        </Card>,
                        item.Tests.map((comment) => {
                            return(
                                <div>
                                    <p>{ comment.title }</p>
                                    <p>{ comment.content }</p>
                                </div>
                            )
                        })
                        )})
                    }
                </div>
            );
    }
}
  
export default Post;