import { Component } from 'react';
import { Link } from "react-router-dom";
import { Card, Button } from 'react-bootstrap';

// function Post(item) {

//     return(
//         <Card key={item.id} style={{ width: '400px', margin: '10px auto' }}>
//             <Card.Body>
//                 <Card.Title>{ item.title }{' '+ item.id }</Card.Title>
//             </Card.Body>
//             <Card.Img variant="top" src="" />
//             <Card.Body>
//                 <Card.Text>
//                     { item.content }
//                 </Card.Text>
//                 <Button variant="primary">like</Button>
//                 <Button variant="primary">dislike</Button>
//                 <Link to={"post/"+String(item.id)}>comment</Link>
//             </Card.Body>
//         </Card>
//     )
// }
  
// export default Post;

class Post extends Component {

    constructor(props) {
        super(props);
   
    }

    render() {
        console.log(this.props.item)
        return(

            <Card key={this.props.item.id} style={{ width: '400px', margin: '10px auto' }}>
                <Card.Body>
                    <Card.Title>{this.props.item.title }{' '+ this.props.item.id }</Card.Title>
                </Card.Body>
                <Card.Img variant="top" src="" />
                <Card.Body>
                    <Card.Text>
                        { this.props.item.content }
                    </Card.Text>
                    <Button variant="primary">like</Button>
                    <Button variant="primary">dislike</Button>
                    <Link to={"post/"+String(this.props.item.id)}>comment</Link>
                </Card.Body>
            </Card>
         )
    }
}

export default Post;