import { Component } from 'react';
import { Link } from "react-router-dom";
import { Card, Button } from 'react-bootstrap';
import Comment from './Comment';

export const DetailPost = ({ ...props }) => (   <Post detail={true} {...props} /> );

class Post extends Component {

    constructor(props) {
        super(props);
   
    }

    componentDidMount() {
        console.log(this.props.item)
    }

    render() {
        const item = this.props.item ? this.props.item : this.props.location.state.item;
        return(

            <div>
                <Card key={item.id} style={{ width: '400px', margin: '20px auto 0' }}>
                    <Card.Body>
                        <Card.Title>{item.title }{' '+item.id }</Card.Title>
                    </Card.Body>
                    <Card.Img variant="top" src="" />
                    <Card.Body>
                        <Card.Text>
                            { item.content }
                        </Card.Text>
                        <Button variant="primary">like</Button>
                        <Button variant="primary">dislike</Button>
                        {!this.props.detail && <Link to={{pathname: "post/"+String(item.id), state: {item: item}}}>comment</Link> }
                    </Card.Body>
                </Card>
                
                {item.Tests.map( (comment) => {
                    console.log(comment)
                    return(
                        <Comment comment={comment}/>
                    )
                })}
            </div>
            
         )
    }
}

export default Post;