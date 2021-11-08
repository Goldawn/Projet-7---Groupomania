function Comment() {

    fetch("http://localhost:9000/api/posts")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    items: json,
                    DataisLoaded: true
                });
            })


    return  <div>
        <h1>Titre du commentaire</h1>
        <p>Contenu du commentaire</p>
        <ul className="likes-bar">
            <li className="upvote">+</li>
            <li className="downvote">-</li>
        </ul>
    </div>
}
  
export default Comment;