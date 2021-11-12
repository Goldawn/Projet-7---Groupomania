import { Component } from 'react';
import { Link } from "react-router-dom";
import { Card, Button } from 'react-bootstrap';


class Comment extends Component {

    constructor(props) {
        super(props);
   
    }

    componentDidMount() {
        console.log(this.props.comment)
    }

    render() {
        const comment = this.props.comment ? this.props.comment : this.props.location.state.comment;
        return(

            <div>  
                <Card key={comment.id} style={{ width: '400px', margin: 'auto' }}>
                    <Card.Body>
                        <Card.Title>{comment.title}</Card.Title>
                        <Card.Text>{comment.content}</Card.Text>
                    </Card.Body>
                </Card>
            </div>
            
         )
    }
}

export default Comment;