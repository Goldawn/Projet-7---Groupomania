function Comment() {
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